'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast as toastApi, type ToastEvent } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
  error: 'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100',
  info: 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<(ToastEvent & { exiting?: boolean })[]>([]);

  useEffect(() => {
    return toastApi._subscribe((event) => {
      setToasts((prev) => [...prev, event]);
    });
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    toasts.forEach((t) => {
      if (!t.exiting) {
        const timer = setTimeout(() => dismiss(t.id), t.duration ?? 5000);
        timers.push(timer);
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-lg border-l-4 p-4 shadow-lg',
              'transition-all duration-300 ease-out',
              t.exiting
                ? 'opacity-0 translate-x-full'
                : 'opacity-100 translate-x-0 animate-in slide-in-from-right-full',
              colors[t.type]
            )}
          >
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.message && <p className="text-sm mt-1 opacity-90">{t.message}</p>}
            </div>
            {t.dismissible !== false && (
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
