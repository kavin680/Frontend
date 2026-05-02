import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FeatureFlag } from '@/types/common';

interface FeatureFlagState {
  flags: Record<string, FeatureFlag>;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeatureFlagState = {
  flags: {},
  isLoading: false,
  error: null,
};

const featureFlagSlice = createSlice({
  name: 'featureFlag',
  initialState,
  reducers: {
    setFlags(state, action: PayloadAction<FeatureFlag[]>) {
      state.flags = action.payload.reduce(
        (acc, flag) => ({ ...acc, [flag.key]: flag }),
        {} as Record<string, FeatureFlag>
      );
    },
    updateFlag(state, action: PayloadAction<{ key: string; enabled: boolean }>) {
      const flag = state.flags[action.payload.key];
      if (flag) {
        flag.enabled = action.payload.enabled;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const featureFlagActions = featureFlagSlice.actions;
export default featureFlagSlice.reducer;
