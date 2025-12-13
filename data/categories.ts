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

export type CategoryConfig = {
  label: string;
  inputType: "dropdown" | "checkbox" | "radio";
  maxSelections: number; // 1 for dropdown or radio-style checkbox; Infinity for multi-checkbox
};
