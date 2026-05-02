export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  plan: TenantPlan;
  features: string[];
  settings: TenantSettings;
  createdAt: string;
  updatedAt: string;
}

export type TenantPlan = 'free' | 'starter' | 'professional' | 'enterprise' | 'custom';

export interface TenantSettings {
  locale: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  mfaRequired: boolean;
  sessionTimeout: number;
  passwordPolicy: PasswordPolicy;
  branding: TenantBranding;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number;
  preventReuse: number;
}

export interface TenantBranding {
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily?: string;
  customCss?: string;
  loginBackground?: string;
  appName?: string;
}

export interface TenantState {
  current: Tenant | null;
  available: Tenant[];
  isLoading: boolean;
  error: string | null;
}
