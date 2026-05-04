export const siteConfig = {
  name: 'Enterprise Platform',
  description: 'Enterprise-grade frontend foundation platform',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
  defaultLocale: 'en',
  supportedLocales: ['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'ar'],
  defaultTheme: 'system' as const,
  sessionTimeout: 30 * 60 * 1000,
  tokenRefreshThreshold: 5 * 60 * 1000,
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000,
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  },
};

export const routes = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    mfa: '/auth/mfa',
  },
  dashboard: {
    home: '/dashboard',
    analytics: '/dashboard/analytics',
    billing: '/dashboard/billing',
    settings: '/dashboard/settings',
    admin: '/dashboard/admin',
    notifications: '/dashboard/notifications',
    plugins: '/dashboard/plugins',
  },
  public: {
    home: '/',
    pricing: '/pricing',
    docs: '/docs',
  },
};

export const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/pricing',
  '/docs',
];

export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/mfa',
];
