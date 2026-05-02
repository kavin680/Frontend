'use client';

import type { ReactNode } from 'react';
import { useFeatureFlags } from '@/hooks/use-feature-flags';

interface FeatureFlagGateProps {
  flag: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureFlagGate({
  flag,
  children,
  fallback = null,
}: FeatureFlagGateProps) {
  const { isEnabled } = useFeatureFlags();

  if (!isEnabled(flag)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
