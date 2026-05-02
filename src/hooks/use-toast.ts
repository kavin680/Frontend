'use client';

import { toast } from '@/lib/toast';

/**
 * Toast hook — convenience wrapper for the global toast API.
 *
 * For most cases, import `toast` directly from `@/lib/toast`.
 * This hook exists for React component convenience.
 *
 * @example
 * ```tsx
 * const { success, error } = useToast();
 * success('Saved!');
 * error('Something went wrong');
 * ```
 */
export function useToast() {
  return toast;
}
