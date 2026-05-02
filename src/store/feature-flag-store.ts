'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FeatureFlag } from '@/types/common';

interface FeatureFlagState {
  flags: Record<string, FeatureFlag>;
  isLoading: boolean;
  error: string | null;
}

interface FeatureFlagActions {
  setFlags: (flags: FeatureFlag[]) => void;
  updateFlag: (key: string, enabled: boolean) => void;
  isEnabled: (key: string) => boolean;
  getVariant: (key: string) => string | undefined;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: FeatureFlagState = {
  flags: {},
  isLoading: false,
  error: null,
};

export const useFeatureFlagStore = create<
  FeatureFlagState & FeatureFlagActions
>()(
  persist(
    (set, get) => ({
      ...initialState,
      setFlags: (flags) =>
        set({
          flags: flags.reduce(
            (acc, flag) => ({ ...acc, [flag.key]: flag }),
            {} as Record<string, FeatureFlag>
          ),
        }),
      updateFlag: (key, enabled) =>
        set((state) => ({
          flags: {
            ...state.flags,
            [key]: { ...state.flags[key], enabled },
          },
        })),
      isEnabled: (key) => get().flags[key]?.enabled ?? false,
      getVariant: (key) => get().flags[key]?.variant,
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set(initialState),
    }),
    {
      name: 'feature-flags-storage',
    }
  )
);
