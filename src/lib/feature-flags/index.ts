import type { FeatureFlag } from '@/types/common';

export function isFeatureEnabled(
  flags: Record<string, FeatureFlag>,
  key: string,
  defaultValue = false
): boolean {
  const flag = flags[key];
  return flag ? flag.enabled : defaultValue;
}

export function getFeatureVariant(
  flags: Record<string, FeatureFlag>,
  key: string
): string | undefined {
  return flags[key]?.variant;
}

export function filterByFeatureFlag<T extends { featureFlag?: string }>(
  items: T[],
  flags: Record<string, FeatureFlag>
): T[] {
  return items.filter((item) => {
    if (!item.featureFlag) return true;
    return isFeatureEnabled(flags, item.featureFlag);
  });
}
