import type { ComponentType } from 'react';
import type { Permission } from './auth';

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  icon?: string;
  category: PluginCategory;
  permissions: Permission[];
  routes?: PluginRoute[];
  widgets?: PluginWidget[];
  menuItems?: PluginMenuItem[];
  settings?: PluginSetting[];
  dependencies?: string[];
  featureFlags?: string[];
}

export type PluginCategory =
  | 'analytics'
  | 'billing'
  | 'crm'
  | 'notifications'
  | 'compliance'
  | 'ai-governance'
  | 'marketplace'
  | 'internal'
  | 'custom';

export interface PluginRoute {
  path: string;
  component: ComponentType;
  label: string;
  icon?: string;
  permissions?: Permission[];
}

export interface PluginWidget {
  id: string;
  component: ComponentType;
  title: string;
  description?: string;
  defaultSize: { width: number; height: number };
  permissions?: Permission[];
}

export interface PluginMenuItem {
  label: string;
  path: string;
  icon?: string;
  position: 'sidebar' | 'header' | 'settings';
  order?: number;
  permissions?: Permission[];
}

export interface PluginSetting {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'json';
  defaultValue: unknown;
  description?: string;
  options?: { label: string; value: string }[];
}

export interface PluginInstance {
  manifest: PluginManifest;
  enabled: boolean;
  config: Record<string, unknown>;
  installedAt: string;
  updatedAt: string;
}

export interface PluginRegistryEntry {
  id: string;
  manifest: PluginManifest;
  instance: PluginInstance | null;
}

export interface PluginState {
  plugins: PluginRegistryEntry[];
  isLoading: boolean;
  error: string | null;
}
