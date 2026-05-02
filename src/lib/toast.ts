import type { NotificationSeverity } from '@/types/notification';

type ToastListener = (toast: ToastEvent) => void;

interface ToastEvent {
  id: string;
  type: NotificationSeverity;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
}

let listeners: ToastListener[] = [];

function emit(event: ToastEvent) {
  listeners.forEach((fn) => fn(event));
}

function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Global toast API — call from anywhere, no hooks required.
 *
 * @example
 * ```tsx
 * import { toast } from '@/lib/toast';
 *
 * toast.success('User created!');
 * toast.error('Something failed', 'Please try again');
 * toast.warning('Unsaved changes');
 * toast.info('New update available');
 * ```
 */
export const toast = {
  success(title: string, message?: string, duration = 5000) {
    emit({ id: generateId(), type: 'success', title, message, duration, dismissible: true });
  },
  error(title: string, message?: string, duration = 8000) {
    emit({ id: generateId(), type: 'error', title, message, duration, dismissible: true });
  },
  warning(title: string, message?: string, duration = 6000) {
    emit({ id: generateId(), type: 'warning', title, message, duration, dismissible: true });
  },
  info(title: string, message?: string, duration = 5000) {
    emit({ id: generateId(), type: 'info', title, message, duration, dismissible: true });
  },
  custom(options: Omit<ToastEvent, 'id'>) {
    emit({ ...options, id: generateId() });
  },
  /** @internal Used by ToastContainer to subscribe */
  _subscribe(fn: ToastListener) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};

export type { ToastEvent };
