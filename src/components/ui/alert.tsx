'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type AlertVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  className?: string;
  action?: ReactNode;
}

const variantStyles: Record<AlertVariant, string> = {
  success: 'border-green-500/50 bg-green-50 text-green-900 dark:bg-green-950/50 dark:text-green-100',
  error: 'border-red-500/50 bg-red-50 text-red-900 dark:bg-red-950/50 dark:text-red-100',
  warning: 'border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-100',
  info: 'border-blue-500/50 bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100',
  default: 'border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-100',
};

const variantIcons: Record<AlertVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  default: Info,
};

/**
 * Alert component with inbuilt animations and dismiss support.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!">Operation completed.</Alert>
 * <Alert variant="error" dismissible>Something went wrong.</Alert>
 * <Alert variant="warning" title="Warning" action={<Button size="sm">Fix</Button>}>
 *   Your session is about to expire.
 * </Alert>
 * ```
 */
export function Alert({
  variant = 'default',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className,
  action,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const DefaultIcon = variantIcons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 rounded-lg border p-4',
        'animate-in fade-in-50 slide-in-from-top-2 duration-300',
        variantStyles[variant],
        className
      )}
    >
      <span className="shrink-0 mt-0.5">
        {icon ?? <DefaultIcon className="h-5 w-5" />}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold mb-1">{title}</p>}
        <div className="text-sm">{children}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {dismissible && (
        <button
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
