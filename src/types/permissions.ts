import type { Permission, Role } from './auth';

export interface RoleDefinition {
  name: Role;
  label: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
}

export interface PermissionCheck {
  permission: Permission;
  granted: boolean;
  reason?: string;
}

export interface AccessPolicy {
  roles: Role[];
  permissions: Permission[];
  requireAll?: boolean;
}

export const ROLE_HIERARCHY: Record<Role, number> = {
  super_admin: 100,
  admin: 80,
  manager: 60,
  member: 40,
  viewer: 20,
  guest: 10,
};

export const DEFAULT_ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    'users:read', 'users:write', 'users:delete',
    'billing:read', 'billing:write',
    'analytics:read', 'analytics:export',
    'settings:read', 'settings:write',
    'audit:read', 'plugins:manage',
    'teams:read', 'teams:write', 'teams:delete',
    'roles:manage',
  ],
  admin: [
    'users:read', 'users:write',
    'billing:read', 'billing:write',
    'analytics:read', 'analytics:export',
    'settings:read', 'settings:write',
    'audit:read', 'plugins:manage',
    'teams:read', 'teams:write',
  ],
  manager: [
    'users:read',
    'analytics:read', 'analytics:export',
    'settings:read',
    'teams:read', 'teams:write',
  ],
  member: [
    'users:read',
    'analytics:read',
    'teams:read',
  ],
  viewer: [
    'analytics:read',
  ],
  guest: [],
};
