import type { NavigationConfig } from '@/types/dashboard';

export const navigationConfig: NavigationConfig = {
  main: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/dashboard/analytics',
      permissions: ['analytics:read'],
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: 'CreditCard',
      path: '/dashboard/billing',
      permissions: ['billing:read'],
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      path: '/dashboard/notifications',
    },
    {
      id: 'plugins',
      label: 'Plugins',
      icon: 'Puzzle',
      path: '/dashboard/plugins',
      permissions: ['plugins:manage'],
    },
  ],
  secondary: [
    {
      id: 'admin',
      label: 'Admin',
      icon: 'Shield',
      path: '/dashboard/admin',
      permissions: ['users:read'],
      children: [
        {
          id: 'users',
          label: 'Users',
          icon: 'Users',
          path: '/dashboard/admin/users',
          permissions: ['users:read'],
        },
        {
          id: 'teams',
          label: 'Teams',
          icon: 'UsersRound',
          path: '/dashboard/admin/teams',
          permissions: ['teams:read'],
        },
        {
          id: 'roles',
          label: 'Roles & Permissions',
          icon: 'KeyRound',
          path: '/dashboard/admin/roles',
          permissions: ['roles:manage'],
        },
        {
          id: 'audit',
          label: 'Audit Log',
          icon: 'ScrollText',
          path: '/dashboard/admin/audit',
          permissions: ['audit:read'],
        },
      ],
    },
  ],
  footer: [
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      path: '/dashboard/settings',
      permissions: ['settings:read'],
    },
  ],
};
