'use client';

import { useCallback } from 'react';
import { useFeatureFlagStore } from '@/store/feature-flag-store';

export function useFeatureFlags() {
  const { flags, isEnabled, getVariant } = useFeatureFlagStore();

  const checkFlag = useCallback(
    (key: string, defaultValue = false): boolean => {
      if (key in flags) {
        return isEnabled(key);
      }
      return defaultValue;
    },
    [flags, isEnabled]
  );

  const checkVariant = useCallback(
    (key: string): string | undefined => {
      return getVariant(key);
    },
    [getVariant]
  );

  return {
    isEnabled: checkFlag,
    getVariant: checkVariant,
    flags,
  };
}
