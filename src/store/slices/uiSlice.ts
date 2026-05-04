import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

interface ModalConfig {
  id: string;
  title?: string;
  content: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  onClose?: () => void;
}

interface ConfirmConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  resolve?: (value: boolean) => void;
}

interface UiState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  modals: ModalConfig[];
  confirmDialog: ConfirmConfig | null;
  globalLoading: boolean;
  pageTitle: string;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  modals: [],
  confirmDialog: null,
  globalLoading: false,
  pageTitle: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    setSidebarMobileOpen(state, action: PayloadAction<boolean>) {
      state.sidebarMobileOpen = action.payload;
    },
    openModal(state, action: PayloadAction<ModalConfig>) {
      state.modals.push(action.payload);
    },
    closeModal(state, action: PayloadAction<string>) {
      state.modals = state.modals.filter((m) => m.id !== action.payload);
    },
    closeAllModals(state) {
      state.modals = [];
    },
    setConfirmDialog(state, action: PayloadAction<ConfirmConfig | null>) {
      state.confirmDialog = action.payload;
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },
    setPageTitle(state, action: PayloadAction<string>) {
      state.pageTitle = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export type { ModalConfig, ConfirmConfig, UiState };
export default uiSlice.reducer;
