import type { Permission, Role, User } from '@/types/auth';
import { ROLE_HIERARCHY, DEFAULT_ROLE_PERMISSIONS } from '@/types/permissions';

export function checkPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function checkAnyPermission(
  user: User | null,
  permissions: Permission[]
): boolean {
  if (!user) return false;
  return permissions.some((p) => user.permissions.includes(p));
}

export function checkAllPermissions(
  user: User | null,
  permissions: Permission[]
): boolean {
  if (!user) return false;
  return permissions.every((p) => user.permissions.includes(p));
}

export function checkRole(user: User | null, role: Role): boolean {
  if (!user) return false;
  return user.role === role;
}

export function checkMinRole(user: User | null, minRole: Role): boolean {
  if (!user) return false;
  return (ROLE_HIERARCHY[user.role] ?? 0) >= (ROLE_HIERARCHY[minRole] ?? 0);
}

export function getDefaultPermissions(role: Role): Permission[] {
  return DEFAULT_ROLE_PERMISSIONS[role] ?? [];
}

export function canAccessRoute(
  user: User | null,
  requiredPermissions?: Permission[],
  requiredRoles?: Role[]
): boolean {
  if (!user) return false;

  if (requiredRoles && requiredRoles.length > 0) {
    if (!requiredRoles.includes(user.role)) return false;
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    return requiredPermissions.some((p) => user.permissions.includes(p));
  }

  return true;
}
