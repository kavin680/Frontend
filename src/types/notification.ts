export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  severity: NotificationSeverity;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export type NotificationType =
  | 'system'
  | 'security'
  | 'billing'
  | 'team'
  | 'audit'
  | 'plugin'
  | 'custom';

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: Record<NotificationType, boolean>;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  isLoading: boolean;
  error: string | null;
}

export interface ToastNotification {
  id: string;
  type: NotificationSeverity;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
}
