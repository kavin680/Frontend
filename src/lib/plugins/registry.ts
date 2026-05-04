import type {
  PluginManifest,
  PluginRegistryEntry,
  PluginRoute,
  PluginWidget,
  PluginMenuItem,
} from '@/types/plugin';

class PluginRegistry {
  private plugins: Map<string, PluginRegistryEntry> = new Map();

  register(manifest: PluginManifest): void {
    if (this.plugins.has(manifest.id)) {
      console.warn(`Plugin ${manifest.id} is already registered`);
      return;
    }
    this.plugins.set(manifest.id, {
      id: manifest.id,
      manifest,
      instance: null,
    });
  }

  unregister(pluginId: string): void {
    this.plugins.delete(pluginId);
  }

  enable(pluginId: string, config: Record<string, unknown> = {}): void {
    const entry = this.plugins.get(pluginId);
    if (!entry) {
      console.warn(`Plugin ${pluginId} not found`);
      return;
    }
    entry.instance = {
      manifest: entry.manifest,
      enabled: true,
      config,
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  disable(pluginId: string): void {
    const entry = this.plugins.get(pluginId);
    if (!entry?.instance) return;
    entry.instance.enabled = false;
    entry.instance.updatedAt = new Date().toISOString();
  }

  getPlugin(pluginId: string): PluginRegistryEntry | undefined {
    return this.plugins.get(pluginId);
  }

  getEnabledPlugins(): PluginRegistryEntry[] {
    return Array.from(this.plugins.values()).filter(
      (p) => p.instance?.enabled
    );
  }

  getAllPlugins(): PluginRegistryEntry[] {
    return Array.from(this.plugins.values());
  }

  getRoutes(): PluginRoute[] {
    return this.getEnabledPlugins().flatMap(
      (p) => p.manifest.routes ?? []
    );
  }

  getWidgets(): PluginWidget[] {
    return this.getEnabledPlugins().flatMap(
      (p) => p.manifest.widgets ?? []
    );
  }

  getMenuItems(position: PluginMenuItem['position']): PluginMenuItem[] {
    return this.getEnabledPlugins()
      .flatMap((p) => p.manifest.menuItems ?? [])
      .filter((item) => item.position === position)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  configure(
    pluginId: string,
    config: Record<string, unknown>
  ): void {
    const entry = this.plugins.get(pluginId);
    if (!entry?.instance) return;
    entry.instance.config = { ...entry.instance.config, ...config };
    entry.instance.updatedAt = new Date().toISOString();
  }

  isEnabled(pluginId: string): boolean {
    return this.plugins.get(pluginId)?.instance?.enabled ?? false;
  }

  getConfig(pluginId: string): Record<string, unknown> {
    return this.plugins.get(pluginId)?.instance?.config ?? {};
  }
}

export const pluginRegistry = new PluginRegistry();
