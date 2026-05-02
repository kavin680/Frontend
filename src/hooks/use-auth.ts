'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector, authActions } from '@/store';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyMfaMutation,
} from '@/store/endpoints/authApi';
import { toast } from '@/lib/toast';
import type { LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData, MfaVerifyData } from '@/types/auth';

/**
 * Auth hook — login, logout, register, forgot/reset password, MFA with one call.
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout, register } = useAuth();
 *
 * await login({ email: 'user@example.com', password: 'pass' });
 * await forgotPassword({ email: 'user@example.com' });
 * logout();
 * ```
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [loginMutation, loginState] = useLoginMutation();
  const [registerMutation, registerState] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [forgotPasswordMutation, forgotPasswordState] = useForgotPasswordMutation();
  const [resetPasswordMutation, resetPasswordState] = useResetPasswordMutation();
  const [verifyMfaMutation, verifyMfaState] = useVerifyMfaMutation();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const result = await loginMutation(credentials).unwrap();
        dispatch(authActions.login({ user: result.data.user, tokens: result.data.tokens }));
        toast.success('Welcome back!', `Signed in as ${result.data.user.email}`);
        return result.data;
      } catch (err) {
        const message = (err as { data?: { message?: string } })?.data?.message ?? 'Login failed';
        toast.error('Login failed', message);
        throw err;
      }
    },
    [dispatch, loginMutation]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        const result = await registerMutation(data).unwrap();
        dispatch(authActions.login({ user: result.data.user, tokens: result.data.tokens }));
        toast.success('Account created!', 'Welcome aboard');
        return result.data;
      } catch (err) {
        const message = (err as { data?: { message?: string } })?.data?.message ?? 'Registration failed';
        toast.error('Registration failed', message);
        throw err;
      }
    },
    [dispatch, registerMutation]
  );

  const forgotPassword = useCallback(
    async (data: ForgotPasswordData) => {
      try {
        const result = await forgotPasswordMutation(data).unwrap();
        toast.success('Email sent', 'Check your inbox for the reset link');
        return result.data;
      } catch (err) {
        const message = (err as { data?: { message?: string } })?.data?.message ?? 'Failed to send reset email';
        toast.error('Error', message);
        throw err;
      }
    },
    [forgotPasswordMutation]
  );

  const resetPassword = useCallback(
    async (data: ResetPasswordData) => {
      try {
        const result = await resetPasswordMutation(data).unwrap();
        toast.success('Password reset', 'You can now sign in with your new password');
        return result.data;
      } catch (err) {
        const message = (err as { data?: { message?: string } })?.data?.message ?? 'Failed to reset password';
        toast.error('Error', message);
        throw err;
      }
    },
    [resetPasswordMutation]
  );

  const verifyMfa = useCallback(
    async (data: MfaVerifyData) => {
      try {
        const result = await verifyMfaMutation(data).unwrap();
        dispatch(authActions.login({ user: result.data.user, tokens: result.data.tokens }));
        toast.success('Verified', 'Two-factor authentication successful');
        return result.data;
      } catch (err) {
        const message = (err as { data?: { message?: string } })?.data?.message ?? 'Verification failed';
        toast.error('MFA failed', message);
        throw err;
      }
    },
    [dispatch, verifyMfaMutation]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Logout even if API call fails
    }
    dispatch(authActions.logout());
    toast.info('Signed out');
  }, [dispatch, logoutMutation]);

  const isLoading = loginState.isLoading || registerState.isLoading
    || forgotPasswordState.isLoading || resetPasswordState.isLoading
    || verifyMfaState.isLoading;

  return {
    ...auth,
    login,
    register,
    forgotPassword,
    resetPassword,
    verifyMfa,
    logout,
    isLoading,
    isLoginLoading: loginState.isLoading,
    isRegisterLoading: registerState.isLoading,
  };
}
