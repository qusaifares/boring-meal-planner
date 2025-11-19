import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig = {
  // Required for Next.js 16 when you override webpack()
  turbopack: {},

  // Forces Webpack instead of Turbopack
  webpack(config) {
    return config;
  },
} satisfies NextConfig;

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
