'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import type { Permission, Role } from '@/types/auth';

const roleHierarchy: Record<Role, number> = {
  super_admin: 6,
  admin: 5,
  manager: 4,
  member: 3,
  viewer: 2,
  guest: 1,
};

/**
 * Permission hook — check user permissions and roles.
 *
 * @example
 * ```tsx
 * const { hasPermission, hasRole, hasAnyPermission } = usePermissions();
 *
 * if (hasPermission('users:write')) { ... }
 * if (hasRole('admin')) { ... }
 * ```
 */
export function usePermissions() {
  const user = useAppSelector((state) => state.auth.user);

  const permissions = useMemo(() => new Set(user?.permissions ?? []), [user?.permissions]);

  const hasPermission = (permission: Permission): boolean => permissions.has(permission);

  const hasAnyPermission = (...perms: Permission[]): boolean =>
    perms.some((p) => permissions.has(p));

  const hasAllPermissions = (...perms: Permission[]): boolean =>
    perms.every((p) => permissions.has(p));

  const hasRole = (role: Role): boolean => {
    if (!user?.role) return false;
    return roleHierarchy[user.role] >= roleHierarchy[role];
  };

  return { hasPermission, hasAnyPermission, hasAllPermissions, hasRole, role: user?.role ?? null };
}
