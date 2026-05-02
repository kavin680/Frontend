const env = {
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Enterprise Platform',
    environment: process.env.NODE_ENV ?? 'development',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? '30000'),
  },
  auth: {
    sessionSecret: process.env.AUTH_SECRET ?? '',
    jwtSecret: process.env.JWT_SECRET ?? '',
    mfaIssuer: process.env.NEXT_PUBLIC_MFA_ISSUER ?? 'Enterprise Platform',
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
    environment: process.env.SENTRY_ENVIRONMENT ?? 'development',
  },
  features: {
    enableMfa: process.env.NEXT_PUBLIC_ENABLE_MFA === 'true',
    enablePlugins: process.env.NEXT_PUBLIC_ENABLE_PLUGINS !== 'false',
    enableBilling: process.env.NEXT_PUBLIC_ENABLE_BILLING !== 'false',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false',
    enableWhiteLabel: process.env.NEXT_PUBLIC_ENABLE_WHITE_LABEL === 'true',
  },
} as const;

export default env;
