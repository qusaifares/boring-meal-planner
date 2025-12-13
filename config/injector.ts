import { AppConfigPlugin } from "../types/plugin";
import { TenantResolutionStrategy } from "../types/injector";
import { registerPlugin as registryRegisterPlugin } from "./registry";

/**
 * Configuration Injector implementing the Strategy pattern for tenant-based
 * configuration selection. Handles tenant resolution, plugin selection,
 * and provides fallback to default configuration.
 */
export class ConfigurationInjector {
  private registry: Map<string, AppConfigPlugin>;
  private defaultTenantId: string;
  private cachedTenantId: string | null = null;
  private resolutionStrategies: TenantResolutionStrategy[];

  /**
   * Creates a new ConfigurationInjector instance.
   *
   * @param plugins - Array of plugin configurations to register
   * @param defaultTenantId - Tenant ID to use as fallback when resolution fails
   * @param resolutionStrategies - Optional array of resolution strategies in priority order
   */
  constructor(
    plugins: AppConfigPlugin[],
    defaultTenantId: string,
    resolutionStrategies: TenantResolutionStrategy[] = ["url", "subdomain", "env", "default"]
  ) {
    this.registry = new Map<string, AppConfigPlugin>();
    this.defaultTenantId = defaultTenantId;
    this.resolutionStrategies = resolutionStrategies;

    // Register all provided plugins
    plugins.forEach((plugin) => {
      this.registry.set(plugin.tenantId, plugin);
      // Also register in global registry for consistency
      registryRegisterPlugin(plugin);
    });
  }

  /**
   * Gets the active configuration by resolving the tenant ID and returning
   * the corresponding plugin. Falls back to default tenant if resolution fails.
   * Applies default values for optional properties.
   *
   * @returns The active plugin configuration with defaults applied
   */
  getConfig(): AppConfigPlugin {
    const tenantId = this.resolveTenantId();
    const plugin = this.getPlugin(tenantId);

    if (!plugin) {
      // Fallback to default tenant
      const defaultPlugin = this.getPlugin(this.defaultTenantId);
      if (!defaultPlugin) {
        throw new Error(
          `Default plugin with tenant ID "${this.defaultTenantId}" not found in registry`
        );
      }
      return this.applyDefaults(defaultPlugin);
    }

    return this.applyDefaults(plugin);
  }

  /**
   * Registers a new plugin dynamically at runtime.
   *
   * @param plugin - The plugin configuration to register
   */
  registerPlugin(plugin: AppConfigPlugin): void {
    this.registry.set(plugin.tenantId, plugin);
    // Also register in global registry for consistency
    registryRegisterPlugin(plugin);
  }

  /**
   * Retrieves a plugin by tenant ID for direct lookup.
   *
   * @param tenantId - The unique identifier for the tenant
   * @returns The plugin configuration if found, undefined otherwise
   */
  getPlugin(tenantId: string): AppConfigPlugin | undefined {
    return this.registry.get(tenantId);
  }

  /**
   * Resolves the tenant ID using configured resolution strategies.
   * Executes strategies in priority order and caches the result.
   * 
   * Note: During SSR, browser-dependent strategies (url, subdomain) will return null,
   * causing fallback to environment or default strategies.
   *
   * @returns The resolved tenant ID
   */
  private resolveTenantId(): string {
    // Don't cache during SSR to allow re-evaluation on client
    const isSSR = typeof window === "undefined";
    
    // Return cached value if available and not in SSR
    if (!isSSR && this.cachedTenantId !== null) {
      return this.cachedTenantId;
    }

    // Execute resolution strategies in priority order
    for (const strategy of this.resolutionStrategies) {
      let tenantId: string | null = null;

      switch (strategy) {
        case "url":
          tenantId = this.getTenantFromUrl();
          break;
        case "subdomain":
          tenantId = this.getTenantFromSubdomain();
          break;
        case "env":
          tenantId = this.getTenantFromEnv();
          break;
        case "default":
          tenantId = this.defaultTenantId;
          break;
      }

      // If strategy returned a valid tenant ID, cache and return it (only on client)
      if (tenantId !== null) {
        if (!isSSR) {
          this.cachedTenantId = tenantId;
        }
        return tenantId;
      }
    }

    // Fallback to default tenant if all strategies fail
    if (!isSSR) {
      this.cachedTenantId = this.defaultTenantId;
    }
    return this.defaultTenantId;
  }

  /**
   * Extracts tenant ID from URL query parameters.
   * Looks for ?tenant=<tenantId> in the current URL.
   *
   * @returns The tenant ID if found, null otherwise
   */
  private getTenantFromUrl(): string | null {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const url = new URL(window.location.href);
      const tenantParam = url.searchParams.get("tenant");
      return tenantParam || null;
    } catch {
      return null;
    }
  }

  /**
   * Extracts tenant ID from subdomain.
   * For example, tenant1.example.com would return "tenant1".
   *
   * @returns The tenant ID if found, null otherwise
   */
  private getTenantFromSubdomain(): string | null {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");

      // If there are at least 3 parts (subdomain.domain.tld), extract subdomain
      if (parts.length >= 3) {
        return parts[0];
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Reads tenant ID from environment variables.
   * Looks for NEXT_PUBLIC_TENANT_ID environment variable.
   *
   * @returns The tenant ID if found, null otherwise
   */
  private getTenantFromEnv(): string | null {
    // Check for Next.js public environment variable
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    return tenantId || null;
  }

  /**
   * Applies default values for optional plugin properties.
   * Ensures branding and features have sensible defaults when not provided.
   *
   * @param plugin - The plugin configuration to apply defaults to
   * @returns The plugin with defaults applied
   */
  private applyDefaults(plugin: AppConfigPlugin): AppConfigPlugin {
    return {
      ...plugin,
      branding: {
        appTitle: "Meal Planner",
        appDescription: "Plan your meals efficiently",
        primaryColor: "#000000",
        accentColor: "#0070f3",
        ...plugin.branding,
      },
      features: {
        enableLocalStorage: false,
        storageKey: "meal-planner-state",
        enableMobileView: true,
        ...plugin.features,
      },
    };
  }
}

