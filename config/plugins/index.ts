import { registerPlugin } from "../registry";
import { defaultPlugin } from "./default.plugin";
import { veggiePlugin } from "./veggie.plugin";
import { costcoKitchenPlugin } from './costco-kitchen.plugin';
import { recentStaplesPlugin } from "./recent-staples.plugin";

/**
 * Export all available plugins
 */
export { defaultPlugin } from "./default.plugin";
export { veggiePlugin } from "./veggie.plugin";
export { costcoKitchenPlugin } from './costco-kitchen.plugin';
export { recentStaplesPlugin } from './recent-staples.plugin';

/**
 * Array of all available plugins for easy iteration
 */
export const allPlugins = [defaultPlugin, costcoKitchenPlugin, recentStaplesPlugin];

/**
 * Register all plugins with the registry on module load.
 * This ensures plugins are available as soon as the module is imported.
 */
allPlugins.forEach((plugin) => {
  registerPlugin(plugin);
});
