import { AuthLayout } from '@/components/layouts/auth-layout';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata = { title: 'Create Account' };

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Start your free trial today"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
