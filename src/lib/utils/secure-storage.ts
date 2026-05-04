const PREFIX = 'ep_';

export const secureStorage = {
  set(key: string, value: unknown): void {
    if (typeof window === 'undefined') return;
    try {
      const serialized = JSON.stringify(value);
      const encoded = btoa(serialized);
      localStorage.setItem(`${PREFIX}${key}`, encoded);
    } catch (error) {
      console.error('SecureStorage set error:', error);
    }
  },

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const encoded = localStorage.getItem(`${PREFIX}${key}`);
      if (!encoded) return null;
      const decoded = atob(encoded);
      return JSON.parse(decoded) as T;
    } catch {
      return null;
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(PREFIX)
    );
    keys.forEach((k) => localStorage.removeItem(k));
  },
};
