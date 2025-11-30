import { Meal, MealCategory } from "./Meal";

/**
 * Branding configuration for tenant-specific UI customization
 */
export interface BrandingConfig {
  appTitle?: string;
  appDescription?: string;
  primaryColor?: string;
  accentColor?: string;
}

/**
 * Feature flags for tenant-specific behavior
 */
export interface FeatureConfig {
  enableLocalStorage?: boolean;
  storageKey?: string;
  enableMobileView?: boolean;
}

/**
 * Category configuration defining input behavior for meal categories
 */
export type CategoryConfig = {
  label: string;
  inputType: "dropdown" | "checkbox" | "radio";
  maxSelections: number;
};

/**
 * Core plugin interface that all tenant configurations must implement.
 * Encapsulates all tenant-specific data including meals, categories,
 * branding, and behavior settings.
 */
export interface AppConfigPlugin {
  // Metadata
  tenantId: string;
  tenantName: string;
  version: string;

  // Meal data
  mealLibrary: Meal[];

  // Category configuration
  categoryConfig: Record<MealCategory, CategoryConfig>;

  // UI/Branding (optional for extensibility)
  branding?: BrandingConfig;

  // Feature flags (optional for extensibility)
  features?: FeatureConfig;
}
