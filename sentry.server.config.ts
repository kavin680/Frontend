import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,

  environment: process.env.NODE_ENV,

  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Sentry] Server event captured:', event.event_id);
    }
    return event;
  },
});
