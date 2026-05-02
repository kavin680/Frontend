'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { QueryProvider } from '@/components/shared/query-provider';
import { ToastContainer } from '@/components/shared/toast-container';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider>
          {children}
          <ToastContainer />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
