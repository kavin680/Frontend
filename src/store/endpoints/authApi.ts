import { apiSlice } from '../api';
import type { ApiResponse } from '@/types/api';
import type { User, AuthTokens, LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData, MfaVerifyData } from '@/types/auth';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<{ user: User; tokens: AuthTokens }>, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<ApiResponse<{ user: User; tokens: AuthTokens }>, RegisterData>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<ApiResponse<{ message: string }>, ForgotPasswordData>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<{ message: string }>, ResetPasswordData>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyMfa: builder.mutation<ApiResponse<{ user: User; tokens: AuthTokens }>, MfaVerifyData>({
      query: (data) => ({
        url: '/auth/mfa/verify',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation<ApiResponse<AuthTokens>, { refreshToken: string }>({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyMfaMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;
