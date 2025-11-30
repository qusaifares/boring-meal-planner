/**
 * @deprecated This file is deprecated and will be removed in a future version.
 * 
 * Configuration now comes from the plugin system. See:
 * - config/plugins/default.plugin.ts for the default category configuration
 * - config/plugins/ for other tenant-specific plugins
 * - types/plugin.ts for the CategoryConfig type definition
 * 
 * To access category configuration in components, use the useConfig() hook:
 * ```typescript
 * import { useConfig } from '@/context/ConfigContext';
 * 
 * function MyComponent() {
 *   const config = useConfig();
 *   const categoryConfig = config.categoryConfig;
 *   // ...
 * }
 * ```
 * 
 * This file is kept temporarily for backward compatibility with existing tests
 * and utilities that have not yet been migrated to the plugin system.
 */

import { MealCategory } from "@/types/Meal";

export type CategoryConfig = {
  label: string;
  inputType: "dropdown" | "checkbox" | "radio";
  maxSelections: number; // 1 for dropdown or radio-style checkbox; Infinity for multi-checkbox
};

export const CATEGORY_CONFIG: Record<MealCategory, CategoryConfig> = {
  breakfast: {
    label: "Breakfast",
    inputType: "dropdown",
    maxSelections: 1,
  },

  dinner: {
    label: "Dinner",
    inputType: "dropdown",
    maxSelections: 1,
  },

  coffee: {
    label: "Coffee",
    inputType: "radio",
    maxSelections: 1, // only 1 coffee per day
  },

  fruit: {
    label: "Fruit",
    inputType: "checkbox",
    maxSelections: Infinity, // apple, banana (multi)
  },

  snack: {
    label: "Snacks",
    inputType: "checkbox",
    maxSelections: Infinity, // multiple snacks allowed
  },

  shake: {
    label: "Protein Shake",
    inputType: "radio",
    maxSelections: 1, // one shake per day
  },
};
