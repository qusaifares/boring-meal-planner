import { AppConfigPlugin } from "../types/plugin";

/**
 * In-memory plugin registry using Map for O(1) lookup performance.
 * Stores all registered tenant configurations indexed by tenant ID.
 */
const pluginRegistry = new Map<string, AppConfigPlugin>();

/**
 * Registers a plugin in the registry.
 * If a plugin with the same tenant ID already exists, it will be overwritten.
 *
 * @param plugin - The plugin configuration to register
 */
export function registerPlugin(plugin: AppConfigPlugin): void {
  pluginRegistry.set(plugin.tenantId, plugin);
}

/**
 * Retrieves a plugin from the registry by tenant ID.
 * Provides O(1) lookup performance.
 *
 * @param tenantId - The unique identifier for the tenant
 * @returns The plugin configuration if found, undefined otherwise
 */
export function getPlugin(tenantId: string): AppConfigPlugin | undefined {
  return pluginRegistry.get(tenantId);
}

/**
 * Retrieves all registered plugins from the registry.
 *
 * @returns An array of all registered plugin configurations
 */
export function getAllPlugins(): AppConfigPlugin[] {
  return Array.from(pluginRegistry.values());
}
