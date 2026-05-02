'use client';

import { useCallback, useMemo } from 'react';
import { useAuthStore } from '@/store/auth-store';
import type { Permission, Role } from '@/types/auth';
import { ROLE_HIERARCHY } from '@/types/permissions';

export function usePermissions() {
  const { user } = useAuthStore();

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!user) return false;
      return user.permissions.includes(permission);
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions: Permission[]): boolean => {
      if (!user) return false;
      return permissions.some((p) => user.permissions.includes(p));
    },
    [user]
  );

  const hasAllPermissions = useCallback(
    (permissions: Permission[]): boolean => {
      if (!user) return false;
      return permissions.every((p) => user.permissions.includes(p));
    },
    [user]
  );

  const hasRole = useCallback(
    (role: Role): boolean => {
      if (!user) return false;
      return user.role === role;
    },
    [user]
  );

  const hasMinRole = useCallback(
    (minRole: Role): boolean => {
      if (!user) return false;
      return (ROLE_HIERARCHY[user.role] ?? 0) >= (ROLE_HIERARCHY[minRole] ?? 0);
    },
    [user]
  );

  const isAdmin = useMemo(
    () => hasMinRole('admin'),
    [hasMinRole]
  );

  const isSuperAdmin = useMemo(
    () => hasRole('super_admin'),
    [hasRole]
  );

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasMinRole,
    isAdmin,
    isSuperAdmin,
    role: user?.role ?? null,
    permissions: user?.permissions ?? [],
  };
}
