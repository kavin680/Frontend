import {
  checkPermission,
  checkAnyPermission,
  checkAllPermissions,
  checkRole,
  checkMinRole,
  canAccessRoute,
} from '@/lib/permissions';
import type { User } from '@/types/auth';

const mockUser: User = {
  id: '1',
  email: 'admin@test.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  permissions: ['users:read', 'users:write', 'analytics:read', 'settings:read'],
  tenantId: 'tenant-1',
  mfaEnabled: false,
  emailVerified: true,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

describe('permissions', () => {
  describe('checkPermission', () => {
    it('returns true for granted permission', () => {
      expect(checkPermission(mockUser, 'users:read')).toBe(true);
    });

    it('returns false for missing permission', () => {
      expect(checkPermission(mockUser, 'billing:write')).toBe(false);
    });

    it('returns false for null user', () => {
      expect(checkPermission(null, 'users:read')).toBe(false);
    });
  });

  describe('checkAnyPermission', () => {
    it('returns true if any permission matches', () => {
      expect(
        checkAnyPermission(mockUser, ['billing:write', 'users:read'])
      ).toBe(true);
    });

    it('returns false if no permission matches', () => {
      expect(
        checkAnyPermission(mockUser, ['billing:write', 'billing:read'])
      ).toBe(false);
    });
  });

  describe('checkAllPermissions', () => {
    it('returns true if all permissions match', () => {
      expect(
        checkAllPermissions(mockUser, ['users:read', 'users:write'])
      ).toBe(true);
    });

    it('returns false if any permission is missing', () => {
      expect(
        checkAllPermissions(mockUser, ['users:read', 'billing:write'])
      ).toBe(false);
    });
  });

  describe('checkRole', () => {
    it('returns true for matching role', () => {
      expect(checkRole(mockUser, 'admin')).toBe(true);
    });

    it('returns false for non-matching role', () => {
      expect(checkRole(mockUser, 'super_admin')).toBe(false);
    });
  });

  describe('checkMinRole', () => {
    it('returns true for equal or higher role', () => {
      expect(checkMinRole(mockUser, 'manager')).toBe(true);
      expect(checkMinRole(mockUser, 'admin')).toBe(true);
    });

    it('returns false for higher required role', () => {
      expect(checkMinRole(mockUser, 'super_admin')).toBe(false);
    });
  });

  describe('canAccessRoute', () => {
    it('allows access with matching permissions', () => {
      expect(canAccessRoute(mockUser, ['users:read'])).toBe(true);
    });

    it('denies access with missing permissions', () => {
      expect(canAccessRoute(mockUser, ['billing:write'])).toBe(false);
    });

    it('allows access with matching role', () => {
      expect(canAccessRoute(mockUser, undefined, ['admin'])).toBe(true);
    });

    it('denies access with wrong role', () => {
      expect(canAccessRoute(mockUser, undefined, ['super_admin'])).toBe(false);
    });
  });
});
