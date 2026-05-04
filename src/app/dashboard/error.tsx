'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl">Dashboard Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Something went wrong while loading this section. This error has been logged.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono bg-muted rounded px-2 py-1 inline-block">
              ID: {error.digest}
            </p>
          )}
          <div className="flex justify-center gap-3">
            <Button onClick={() => unstable_retry()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Retry
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
