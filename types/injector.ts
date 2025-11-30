import { AppConfigPlugin } from "./plugin";

/**
 * Tenant resolution strategies supported by the Configuration Injector.
 * Strategies are executed in priority order to determine which tenant
 * configuration to load.
 */
export type TenantResolutionStrategy = "url" | "subdomain" | "env" | "default";

/**
 * Configuration options for the Configuration Injector.
 * Defines available plugins, default tenant, and resolution strategy order.
 */
export interface InjectorConfig {
  plugins: AppConfigPlugin[];
  defaultTenantId: string;
  resolutionStrategies?: TenantResolutionStrategy[];
}
