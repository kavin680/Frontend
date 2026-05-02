import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import env from '@/config/env';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.api.baseUrl,
    timeout: env.api.timeout,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.tokens?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      const tenantId = state.tenant.current?.id;
      if (tenantId) {
        headers.set('X-Tenant-ID', tenantId);
      }
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: [
    'User', 'Users', 'Tenant', 'Notifications',
    'Billing', 'Analytics', 'Settings', 'Plugins',
    'Roles', 'Teams', 'AuditLog', 'FeatureFlags',
  ],
  endpoints: () => ({}),
});
