'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tenant, TenantState } from '@/types/tenant';

interface TenantActions {
  setCurrent: (tenant: Tenant) => void;
  setAvailable: (tenants: Tenant[]) => void;
  switchTenant: (tenantId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateBranding: (branding: Partial<Tenant>) => void;
  reset: () => void;
}

const initialState: TenantState = {
  current: null,
  available: [],
  isLoading: false,
  error: null,
};

export const useTenantStore = create<TenantState & TenantActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrent: (tenant) => set({ current: tenant }),
      setAvailable: (tenants) => set({ available: tenants }),
      switchTenant: (tenantId) => {
        const tenant = get().available.find((t) => t.id === tenantId);
        if (tenant) {
          set({ current: tenant });
        }
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      updateBranding: (branding) =>
        set((state) => ({
          current: state.current ? { ...state.current, ...branding } : null,
        })),
      reset: () => set(initialState),
    }),
    {
      name: 'tenant-storage',
      partialize: (state) => ({
        current: state.current,
      }),
    }
  )
);
