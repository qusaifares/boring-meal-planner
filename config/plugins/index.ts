import { registerPlugin } from "../registry";
import { defaultPlugin } from "./default.plugin";
import { veggiePlugin } from "./veggie.plugin";

/**
 * Export all available plugins
 */
export { defaultPlugin } from "./default.plugin";
export { veggiePlugin } from "./veggie.plugin";

/**
 * Array of all available plugins for easy iteration
 */
export const allPlugins = [defaultPlugin, veggiePlugin];

/**
 * Register all plugins with the registry on module load.
 * This ensures plugins are available as soon as the module is imported.
 */
allPlugins.forEach((plugin) => {
  registerPlugin(plugin);
});
