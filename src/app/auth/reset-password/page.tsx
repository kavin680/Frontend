'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Skeleton } from '@/components/ui/skeleton';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your new password below"
    >
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Skeleton className="h-96 w-96" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
