'use client';

import { useCallback } from 'react';
import { useNotificationStore } from '@/store/notification-store';
import type { NotificationSeverity } from '@/types/notification';

export function useToast() {
  const { addToast, removeToast, toasts } = useNotificationStore();

  const toast = useCallback(
    (options: {
      type?: NotificationSeverity;
      title: string;
      message?: string;
      duration?: number;
    }) => {
      addToast({
        type: options.type ?? 'info',
        title: options.title,
        message: options.message,
        duration: options.duration ?? 5000,
        dismissible: true,
      });
    },
    [addToast]
  );

  const success = useCallback(
    (title: string, message?: string) =>
      toast({ type: 'success', title, message }),
    [toast]
  );

  const error = useCallback(
    (title: string, message?: string) =>
      toast({ type: 'error', title, message }),
    [toast]
  );

  const warning = useCallback(
    (title: string, message?: string) =>
      toast({ type: 'warning', title, message }),
    [toast]
  );

  const info = useCallback(
    (title: string, message?: string) =>
      toast({ type: 'info', title, message }),
    [toast]
  );

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
    toasts,
  };
}
