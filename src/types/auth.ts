export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: Role;
  permissions: Permission[];
  tenantId: string;
  mfaEnabled: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export type Role = 'super_admin' | 'admin' | 'manager' | 'member' | 'viewer' | 'guest';

export type Permission =
  | 'users:read' | 'users:write' | 'users:delete'
  | 'billing:read' | 'billing:write'
  | 'analytics:read' | 'analytics:export'
  | 'settings:read' | 'settings:write'
  | 'audit:read'
  | 'plugins:manage'
  | 'teams:read' | 'teams:write' | 'teams:delete'
  | 'roles:manage';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantName?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface MfaSetupData {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface MfaVerifyData {
  code: string;
  trustDevice?: boolean;
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location?: string;
  lastActive: string;
  current: boolean;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mfaPending: boolean;
  error: string | null;
}
