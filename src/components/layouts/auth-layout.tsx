'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { useTenantStore } from '@/store/tenant-store';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  const { current: tenant } = useTenantStore();

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <h1 className="text-4xl font-bold mb-4">
            {tenant?.settings?.branding?.appName ?? 'Enterprise Platform'}
          </h1>
          <p className="text-lg opacity-90">
            Secure, scalable, and enterprise-ready. Build amazing products with
            our platform.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {tenant?.logo && (
            <Image
              src={tenant.logo}
              alt={tenant.name}
              width={160}
              height={40}
              className="h-10 w-auto mx-auto mb-8"
            />
          )}
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            {description && (
              <p className="text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
