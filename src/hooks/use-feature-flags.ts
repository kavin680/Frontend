'use client';

import { useAppSelector } from '@/store';

/**
 * Feature flag hook — check if features are enabled.
 *
 * @example
 * ```tsx
 * const { isEnabled, getVariant } = useFeatureFlags();
 *
 * if (isEnabled('new-dashboard')) { ... }
 * const variant = getVariant('checkout-flow'); // 'A' | 'B'
 * ```
 */
export function useFeatureFlags() {
  const flags = useAppSelector((state) => state.featureFlag.flags);

  const isEnabled = (key: string): boolean => flags[key]?.enabled ?? false;
  const getVariant = (key: string): string | undefined => flags[key]?.variant;

  return { flags, isEnabled, getVariant };
}
