import type { AuthTokens } from '@/types/auth';

const TOKEN_STORAGE_KEY = 'auth-storage';

export class TokenManager {
  static getTokens(): AuthTokens | null {
    if (typeof window === 'undefined') return null;
    try {
      const storage = JSON.parse(
        localStorage.getItem(TOKEN_STORAGE_KEY) ?? '{}'
      );
      return storage?.state?.tokens ?? null;
    } catch {
      return null;
    }
  }

  static isTokenExpired(expiresIn: number, issuedAt: number): boolean {
    const expirationTime = issuedAt + expiresIn * 1000;
    const bufferTime = 5 * 60 * 1000;
    return Date.now() >= expirationTime - bufferTime;
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  static getAccessToken(): string | null {
    const tokens = this.getTokens();
    return tokens?.accessToken ?? null;
  }

  static getRefreshToken(): string | null {
    const tokens = this.getTokens();
    return tokens?.refreshToken ?? null;
  }
}
