import { AuthLayout } from '@/components/layouts/auth-layout';
import { MfaForm } from '@/components/auth/mfa-form';

export const metadata = { title: 'Two-Factor Authentication' };

export default function MfaPage() {
  return (
    <AuthLayout
      title="Verify your identity"
      description="Enter the code from your authenticator app"
    >
      <MfaForm />
    </AuthLayout>
  );
}
