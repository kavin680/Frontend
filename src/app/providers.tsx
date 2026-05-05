'use client';

import type { ReactNode } from 'react';
import { StoreProvider } from '@/store/StoreProvider';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { QueryProvider } from '@/components/shared/query-provider';
import { ToastContainer } from '@/components/shared/toast-container';
import { ModalContainer } from '@/components/shared/modal-container';
import { CommandPalette } from '@/components/shared/command-palette';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <ToastContainer />
            <ModalContainer />
            <CommandPalette />
          </TooltipProvider>
        </QueryProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
