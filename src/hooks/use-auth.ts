'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type {
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  MfaVerifyData,
  User,
  AuthTokens,
} from '@/types/auth';
import { routes } from '@/config/site';

export function useAuth() {
  const router = useRouter();
  const {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    mfaPending,
    error,
    login: storeLogin,
    logout: storeLogout,
    setLoading,
    setError,
    setMfaPending,
    updateUser,
  } = useAuthStore();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<{
          user: User;
          tokens: AuthTokens;
          mfaRequired?: boolean;
        }>(endpoints.auth.login, credentials);

        if (response.data.mfaRequired) {
          setMfaPending(true);
          router.push(routes.auth.mfa);
          return;
        }

        storeLogin(response.data.user, response.data.tokens);
        router.push(routes.dashboard.home);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Login failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, storeLogin, setLoading, setError, setMfaPending]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<{
          user: User;
          tokens: AuthTokens;
        }>(endpoints.auth.register, data);

        storeLogin(response.data.user, response.data.tokens);
        router.push(routes.dashboard.home);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Registration failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, storeLogin, setLoading, setError]
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post(endpoints.auth.logout);
    } catch {
      // Logout even if API call fails
    } finally {
      storeLogout();
      router.push(routes.auth.login);
    }
  }, [router, storeLogout]);

  const forgotPassword = useCallback(
    async (data: ForgotPasswordData) => {
      setLoading(true);
      setError(null);
      try {
        await apiClient.post(endpoints.auth.forgotPassword, data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Request failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const resetPassword = useCallback(
    async (data: ResetPasswordData) => {
      setLoading(true);
      setError(null);
      try {
        await apiClient.post(endpoints.auth.resetPassword, data);
        router.push(routes.auth.login);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Reset failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, setLoading, setError]
  );

  const verifyMfa = useCallback(
    async (data: MfaVerifyData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<{
          user: User;
          tokens: AuthTokens;
        }>(endpoints.auth.mfa.verify, data);

        storeLogin(response.data.user, response.data.tokens);
        router.push(routes.dashboard.home);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'MFA verification failed';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, storeLogin, setLoading, setError]
  );

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    mfaPending,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyMfa,
    updateUser,
  };
}
