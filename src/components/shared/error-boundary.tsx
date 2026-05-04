'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Reusable error boundary — wrap any section to catch rendering errors.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<p>Chart failed to load</p>}>
 *   <AnalyticsChart />
 * </ErrorBoundary>
 *
 * // Or with error callback
 * <ErrorBoundary onError={(err) => sentry.captureException(err)}>
 *   <UserProfile />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              This section encountered an error
            </p>
            <p className="text-xs text-red-600 dark:text-red-400">
              {this.state.error?.message}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={this.handleRetry}>
            <RefreshCw className="mr-2 h-3 w-3" /> Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
