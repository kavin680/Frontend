'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import tenantReducer from './slices/tenantSlice';
import notificationReducer from './slices/notificationSlice';
import featureFlagReducer from './slices/featureFlagSlice';
import uiReducer from './slices/uiSlice';
import { apiSlice } from './api';

const rootReducer = combineReducers({
  auth: authReducer,
  tenant: tenantReducer,
  notification: notificationReducer,
  featureFlag: featureFlagReducer,
  ui: uiReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

function loadPersistedState(): Partial<RootState> | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const authRaw = localStorage.getItem('redux-auth');
    const tenantRaw = localStorage.getItem('redux-tenant');
    const flagsRaw = localStorage.getItem('redux-feature-flags');

    const preloaded: Record<string, unknown> = {};
    if (authRaw) {
      const parsed = JSON.parse(authRaw);
      preloaded.auth = parsed;
    }
    if (tenantRaw) {
      const parsed = JSON.parse(tenantRaw);
      preloaded.tenant = parsed;
    }
    if (flagsRaw) {
      const parsed = JSON.parse(flagsRaw);
      preloaded.featureFlag = parsed;
    }
    return Object.keys(preloaded).length > 0
      ? (preloaded as Partial<RootState>)
      : undefined;
  } catch {
    return undefined;
  }
}

function persistState(state: RootState) {
  if (typeof window === 'undefined') return;
  try {
    const authData = {
      user: state.auth.user,
      tokens: state.auth.tokens,
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: false,
      mfaPending: false,
      error: null,
    };
    localStorage.setItem('redux-auth', JSON.stringify(authData));

    const tenantData = {
      current: state.tenant.current,
      available: state.tenant.available,
      isLoading: false,
      error: null,
    };
    localStorage.setItem('redux-tenant', JSON.stringify(tenantData));

    localStorage.setItem('redux-feature-flags', JSON.stringify(state.featureFlag));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function makeStore() {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadPersistedState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['ui/openModal', 'ui/setConfirmDialog'],
          ignoredPaths: ['ui.modals', 'ui.confirmDialog'],
        },
      }).concat(apiSlice.middleware),
  });

  store.subscribe(() => {
    persistState(store.getState());
  });

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
