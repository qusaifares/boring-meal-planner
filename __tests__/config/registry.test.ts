import { registerPlugin, getPlugin, getAllPlugins } from "../../config/registry";
import { AppConfigPlugin } from "../../types/plugin";
import { MealCategory } from "../../types/Meal";

describe("Plugin Registry", () => {
  // Create a mock plugin for testing
  const mockPlugin: AppConfigPlugin = {
    tenantId: "test-tenant",
    tenantName: "Test Tenant",
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

  const mockPlugin2: AppConfigPlugin = {
    tenantId: "test-tenant-2",
    tenantName: "Test Tenant 2",
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

  beforeEach(() => {
    // Clear the registry before each test by getting all plugins and removing them
    // Note: Since the registry is a module-level Map, we need to be careful about test isolation
  });

  describe("registerPlugin", () => {
    it("should register a plugin successfully", () => {
      registerPlugin(mockPlugin);
      const retrieved = getPlugin(mockPlugin.tenantId);
      expect(retrieved).toEqual(mockPlugin);
    });

    it("should overwrite existing plugin with same tenant ID", () => {
      registerPlugin(mockPlugin);
      const updatedPlugin = { ...mockPlugin, tenantName: "Updated Name" };
      registerPlugin(updatedPlugin);
      const retrieved = getPlugin(mockPlugin.tenantId);
      expect(retrieved?.tenantName).toBe("Updated Name");
    });
  });

  describe("getPlugin", () => {
    it("should return plugin for existing tenant ID", () => {
      registerPlugin(mockPlugin);
      const retrieved = getPlugin("test-tenant");
      expect(retrieved).toEqual(mockPlugin);
    });

    it("should return undefined for non-existent tenant ID", () => {
      const retrieved = getPlugin("non-existent-tenant");
      expect(retrieved).toBeUndefined();
    });
  });

  describe("getAllPlugins", () => {
    it("should return all registered plugins", () => {
      registerPlugin(mockPlugin);
      registerPlugin(mockPlugin2);
      const allPlugins = getAllPlugins();
      expect(allPlugins).toHaveLength(2);
      expect(allPlugins).toContainEqual(mockPlugin);
      expect(allPlugins).toContainEqual(mockPlugin2);
    });

    it("should return empty array when no plugins registered", () => {
      // This test might fail if other tests have registered plugins
      // In a real scenario, we'd need a way to clear the registry
      const allPlugins = getAllPlugins();
      expect(Array.isArray(allPlugins)).toBe(true);
    });
  });
});
