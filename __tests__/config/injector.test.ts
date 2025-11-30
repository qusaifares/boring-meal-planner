import { ConfigurationInjector } from "../../config/injector";
import { AppConfigPlugin } from "../../types/plugin";

describe("ConfigurationInjector", () => {
  // Create mock plugins for testing
  const defaultPlugin: AppConfigPlugin = {
    tenantId: "default",
    tenantName: "Default Tenant",
    version: "1.0.0",
    mealLibrary: [],
    categoryConfig: {
      breakfast: { label: "Breakfast", inputType: "dropdown", maxSelections: 1 },
      dinner: { label: "Dinner", inputType: "dropdown", maxSelections: 1 },
      fruit: { label: "Fruit", inputType: "checkbox", maxSelections: 3 },
      coffee: { label: "Coffee", inputType: "radio", maxSelections: 1 },
      shake: { label: "Shake", inputType: "radio", maxSelections: 1 },
      snack: { label: "Snack", inputType: "checkbox", maxSelections: 2 },
    },
  };

  const tenant1Plugin: AppConfigPlugin = {
    tenantId: "tenant1",
    tenantName: "Tenant 1",
    version: "1.0.0",
    mealLibrary: [],
    categoryConfig: {
      breakfast: { label: "Breakfast", inputType: "dropdown", maxSelections: 1 },
      dinner: { label: "Dinner", inputType: "dropdown", maxSelections: 1 },
      fruit: { label: "Fruit", inputType: "checkbox", maxSelections: 3 },
      coffee: { label: "Coffee", inputType: "radio", maxSelections: 1 },
      shake: { label: "Shake", inputType: "radio", maxSelections: 1 },
      snack: { label: "Snack", inputType: "checkbox", maxSelections: 2 },
    },
  };

  describe("constructor", () => {
    it("should initialize with provided plugins", () => {
      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      expect(injector.getPlugin("default")).toEqual(defaultPlugin);
      expect(injector.getPlugin("tenant1")).toEqual(tenant1Plugin);
    });

    it("should throw error if default plugin is not in registry", () => {
      const injector = new ConfigurationInjector([tenant1Plugin], "default");
      expect(() => injector.getConfig()).toThrow(
        'Default plugin with tenant ID "default" not found in registry'
      );
    });
  });

  describe("getConfig", () => {
    it("should return default plugin when no tenant resolution succeeds", () => {
      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      expect(config.tenantId).toBe("default");
    });

    it("should apply default values for missing branding properties", () => {
      const pluginWithoutBranding: AppConfigPlugin = {
        ...defaultPlugin,
        tenantId: "no-branding",
      };
      const injector = new ConfigurationInjector([pluginWithoutBranding], "no-branding");
      const config = injector.getConfig();
      
      expect(config.branding).toBeDefined();
      expect(config.branding?.appTitle).toBe("Meal Planner");
      expect(config.branding?.appDescription).toBe("Plan your meals efficiently");
    });

    it("should apply default values for missing features properties", () => {
      const pluginWithoutFeatures: AppConfigPlugin = {
        ...defaultPlugin,
        tenantId: "no-features",
      };
      const injector = new ConfigurationInjector([pluginWithoutFeatures], "no-features");
      const config = injector.getConfig();
      
      expect(config.features).toBeDefined();
      expect(config.features?.enableLocalStorage).toBe(false);
      expect(config.features?.storageKey).toBe("meal-planner-state");
      expect(config.features?.enableMobileView).toBe(true);
    });

    it("should preserve existing branding values when provided", () => {
      const pluginWithBranding: AppConfigPlugin = {
        ...defaultPlugin,
        tenantId: "with-branding",
        branding: {
          appTitle: "Custom Title",
        },
      };
      const injector = new ConfigurationInjector([pluginWithBranding], "with-branding");
      const config = injector.getConfig();
      
      expect(config.branding?.appTitle).toBe("Custom Title");
      expect(config.branding?.appDescription).toBe("Plan your meals efficiently"); // default
    });
  });

  describe("registerPlugin", () => {
    it("should register a new plugin dynamically", () => {
      const injector = new ConfigurationInjector([defaultPlugin], "default");
      
      const newPlugin: AppConfigPlugin = {
        tenantId: "new-tenant",
        tenantName: "New Tenant",
        version: "1.0.0",
        mealLibrary: [],
        categoryConfig: {
          breakfast: { label: "Breakfast", inputType: "dropdown", maxSelections: 1 },
          dinner: { label: "Dinner", inputType: "dropdown", maxSelections: 1 },
          fruit: { label: "Fruit", inputType: "checkbox", maxSelections: 3 },
          coffee: { label: "Coffee", inputType: "radio", maxSelections: 1 },
          shake: { label: "Shake", inputType: "radio", maxSelections: 1 },
          snack: { label: "Snack", inputType: "checkbox", maxSelections: 2 },
        },
      };
      
      injector.registerPlugin(newPlugin);
      expect(injector.getPlugin("new-tenant")).toEqual(newPlugin);
    });
  });

  describe("getPlugin", () => {
    it("should return plugin for existing tenant ID", () => {
      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const plugin = injector.getPlugin("tenant1");
      expect(plugin).toEqual(tenant1Plugin);
    });

    it("should return undefined for non-existent tenant ID", () => {
      const injector = new ConfigurationInjector([defaultPlugin], "default");
      const plugin = injector.getPlugin("non-existent");
      expect(plugin).toBeUndefined();
    });
  });

  describe("URL-based tenant resolution", () => {
    const originalWindow = global.window;

    afterEach(() => {
      // Restore original window object
      if (originalWindow) {
        global.window = originalWindow;
      }
    });

    it("should resolve tenant from URL query parameter", () => {
      // Mock window.location with tenant query parameter
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      global.window = {
        location: {
          href: "http://localhost:3000?tenant=tenant1",
        },
      } as Window & typeof globalThis;

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      expect(config.tenantId).toBe("tenant1");
      expect(config.tenantName).toBe("Tenant 1");
    });

    it("should resolve different tenant IDs from URL", () => {
      // Test with default tenant
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      global.window = {
        location: {
          href: "http://localhost:3000?tenant=default",
        },
      } as Window & typeof globalThis;

      const injector1 = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config1 = injector1.getConfig();
      
      expect(config1.tenantId).toBe("default");
      expect(config1.tenantName).toBe("Default Tenant");

      // Test with tenant1
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      global.window = {
        location: {
          href: "http://localhost:3000?tenant=tenant1",
        },
      } as Window & typeof globalThis;

      const injector2 = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config2 = injector2.getConfig();
      
      expect(config2.tenantId).toBe("tenant1");
      expect(config2.tenantName).toBe("Tenant 1");
    });

    it("should fallback to default when URL has invalid tenant ID", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      global.window = {
        location: {
          href: "http://localhost:3000?tenant=non-existent",
        },
      } as Window & typeof globalThis;

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      expect(config.tenantId).toBe("default");
    });

    it("should fallback to default when no tenant query parameter", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      global.window = {
        location: {
          href: "http://localhost:3000",
        },
      } as Window & typeof globalThis;

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      expect(config.tenantId).toBe("default");
    });

    it("should handle URL with multiple query parameters", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      global.window = {
        location: {
          href: "http://localhost:3000?foo=bar&tenant=tenant1&baz=qux",
        },
      } as Window & typeof globalThis;

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      expect(config.tenantId).toBe("tenant1");
    });
  });

  describe("Environment variable tenant resolution", () => {
    const originalEnv = process.env.NEXT_PUBLIC_TENANT_ID;

    afterEach(() => {
      // Restore original environment variable
      if (originalEnv !== undefined) {
        process.env.NEXT_PUBLIC_TENANT_ID = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_TENANT_ID;
      }
    });

    it("should resolve tenant from NEXT_PUBLIC_TENANT_ID environment variable", () => {
      // Set environment variable
      process.env.NEXT_PUBLIC_TENANT_ID = "tenant1";

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      expect(config.tenantId).toBe("tenant1");
      expect(config.tenantName).toBe("Tenant 1");
    });

    it("should resolve different tenant IDs from environment variable", () => {
      // Test with default tenant
      process.env.NEXT_PUBLIC_TENANT_ID = "default";

      const injector1 = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config1 = injector1.getConfig();
      
      expect(config1.tenantId).toBe("default");
      expect(config1.tenantName).toBe("Default Tenant");

      // Clear cache for new injector instance
      delete process.env.NEXT_PUBLIC_TENANT_ID;
      process.env.NEXT_PUBLIC_TENANT_ID = "tenant1";

      const injector2 = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config2 = injector2.getConfig();
      
      expect(config2.tenantId).toBe("tenant1");
      expect(config2.tenantName).toBe("Tenant 1");
    });

    it("should fallback to default when environment variable has invalid tenant ID", () => {
      process.env.NEXT_PUBLIC_TENANT_ID = "non-existent";

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      expect(config.tenantId).toBe("default");
    });

    it("should fallback to default when environment variable is not set", () => {
      delete process.env.NEXT_PUBLIC_TENANT_ID;

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      expect(config.tenantId).toBe("default");
    });

    it("should prioritize URL over environment variable", () => {
      // Set environment variable to tenant1
      process.env.NEXT_PUBLIC_TENANT_ID = "tenant1";

      // Mock window.location with different tenant
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).window;
      global.window = {
        location: {
          href: "http://localhost:3000?tenant=default",
        },
      } as Window & typeof globalThis;

      const injector = new ConfigurationInjector([defaultPlugin, tenant1Plugin], "default");
      const config = injector.getConfig();
      
      // URL should take priority
      expect(config.tenantId).toBe("default");
    });
  });
});
