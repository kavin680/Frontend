import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Tenant, TenantState } from '@/types/tenant';

const initialState: TenantState = {
  current: null,
  available: [],
  isLoading: false,
  error: null,
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<Tenant>) {
      state.current = action.payload;
    },
    setAvailable(state, action: PayloadAction<Tenant[]>) {
      state.available = action.payload;
    },
    switchTenant(state, action: PayloadAction<string>) {
      const tenant = state.available.find((t) => t.id === action.payload);
      if (tenant) {
        state.current = tenant;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateBranding(state, action: PayloadAction<Partial<Tenant>>) {
      if (state.current) {
        state.current = { ...state.current, ...action.payload };
      }
    },
    reset() {
      return initialState;
    },
  },
});

export const tenantActions = tenantSlice.actions;
export default tenantSlice.reducer;
