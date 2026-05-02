import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { User, AuthTokens, LoginCredentials, RegisterData } from '@/types/auth';
import type { Tenant } from '@/types/tenant';
import type { BillingPlan, Subscription, Invoice } from '@/types/billing';
import type { Notification, NotificationPreferences } from '@/types/notification';
import type { PluginManifest } from '@/types/plugin';
import type { AuditEntry } from '@/types/common';
import type { QueryParams, PaginatedResponse } from '@/types/api';

export const authSdk = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<{ user: User; tokens: AuthTokens }>(endpoints.auth.login, credentials),
  register: (data: RegisterData) =>
    apiClient.post<{ user: User; tokens: AuthTokens }>(endpoints.auth.register, data),
  logout: () => apiClient.post(endpoints.auth.logout),
  refresh: (refreshToken: string) =>
    apiClient.post<{ tokens: AuthTokens }>(endpoints.auth.refresh, { refreshToken }),
  getProfile: () => apiClient.get<User>(endpoints.auth.profile),
  updateProfile: (data: Partial<User>) =>
    apiClient.patch<User>(endpoints.auth.profile, data),
};

export const tenantSdk = {
  getCurrent: () => apiClient.get<Tenant>(endpoints.tenants.current),
  list: () => apiClient.get<Tenant[]>(endpoints.tenants.list),
  update: (id: string, data: Partial<Tenant>) =>
    apiClient.patch<Tenant>(endpoints.tenants.update(id), data),
};

export const billingSdk = {
  getPlans: () => apiClient.get<BillingPlan[]>(endpoints.billing.plans),
  getSubscription: () => apiClient.get<Subscription>(endpoints.billing.subscription),
  getInvoices: (params?: QueryParams) =>
    apiClient.get<Invoice[]>(endpoints.billing.invoices, { params }),
};

export const notificationSdk = {
  list: (params?: QueryParams) =>
    apiClient.get<Notification[]>(endpoints.notifications.list, { params }),
  markAsRead: (id: string) =>
    apiClient.post(endpoints.notifications.read(id)),
  markAllAsRead: () =>
    apiClient.post(endpoints.notifications.readAll),
  getPreferences: () =>
    apiClient.get<NotificationPreferences>(endpoints.notifications.preferences),
  updatePreferences: (data: Partial<NotificationPreferences>) =>
    apiClient.patch<NotificationPreferences>(endpoints.notifications.preferences, data),
};

export const pluginSdk = {
  list: () => apiClient.get<PluginManifest[]>(endpoints.plugins.list),
  install: (id: string) => apiClient.post(endpoints.plugins.install(id)),
  uninstall: (id: string) => apiClient.post(endpoints.plugins.uninstall(id)),
  configure: (id: string, config: Record<string, unknown>) =>
    apiClient.patch(endpoints.plugins.configure(id), config),
};

export const auditSdk = {
  list: (params?: QueryParams) =>
    apiClient.get<PaginatedResponse<AuditEntry>>(endpoints.audit.list, { params }),
  get: (id: string) => apiClient.get<AuditEntry>(endpoints.audit.get(id)),
  export: (params?: QueryParams) =>
    apiClient.get<Blob>(endpoints.audit.export, {
      params,
      responseType: 'blob',
    }),
};

export const userSdk = {
  list: (params?: QueryParams) =>
    apiClient.get<PaginatedResponse<User>>(endpoints.users.list, { params }),
  get: (id: string) => apiClient.get<User>(endpoints.users.get(id)),
  create: (data: Partial<User>) => apiClient.post<User>(endpoints.users.create, data),
  update: (id: string, data: Partial<User>) =>
    apiClient.patch<User>(endpoints.users.update(id), data),
  delete: (id: string) => apiClient.delete(endpoints.users.delete(id)),
};
