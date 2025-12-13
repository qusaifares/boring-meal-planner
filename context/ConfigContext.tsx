"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { AppConfigPlugin } from "../types/plugin";
import { ConfigurationInjector } from "../config/injector";
import { allPlugins } from "../config/plugins";

/**
 * Context value containing the active configuration and injector instance
 */
interface ConfigContextValue {
  config: AppConfigPlugin;
  injector: ConfigurationInjector;
}

/**
 * React Context for providing plugin configuration throughout the application
 */
const ConfigContext = createContext<ConfigContextValue | null>(null);

/**
 * Props for the ConfigProvider component
 */
interface ConfigProviderProps {
  children: ReactNode;
}

/**
 * ConfigProvider component that creates the Configuration Injector and
 * provides the active plugin configuration to all child components.
 *
 * This component should wrap the entire application at the root level.
 */
export function ConfigProvider({ children }: ConfigProviderProps) {
  // Create injector instance once on mount using useMemo
  const injector = useMemo(() => {
    return new ConfigurationInjector(allPlugins, "default");
  }, []);

  // Get the active plugin configuration
  // The injector handles SSR/client differences internally
  const config = useMemo(() => {
    return injector.getConfig();
  }, [injector]);

  // Provide both config and injector through context
  const value = useMemo(
    () => ({
      config,
      injector,
    }),
    [config, injector]
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

/**
 * Hook to access the active plugin configuration.
 * Must be used within a ConfigProvider.
 *
 * @returns The active plugin configuration
 * @throws Error if used outside of ConfigProvider
 */
export function useConfig(): AppConfigPlugin {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error(
      "useConfig must be used within ConfigProvider. " +
        "Please wrap your application with <ConfigProvider> at the root level."
    );
  }

  return context.config;
}

/**
 * Hook to access both the configuration and injector instance.
 * Useful for advanced use cases that need direct access to the injector.
 *
 * @returns The context value containing config and injector
 * @throws Error if used outside of ConfigProvider
 */
export function useConfigContext(): ConfigContextValue {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error(
      "useConfigContext must be used within ConfigProvider. " +
        "Please wrap your application with <ConfigProvider> at the root level."
    );
  }

  return context;
}
