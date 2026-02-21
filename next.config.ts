import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Natively compress all text-based responses
  compress: true,

  images: {
    // Automatically serve next-gen AVIF and WebP images instead of bloated JPEGs/PNGs
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // Enable the bleeding-edge React Compiler for automatic memoization and massive performance gains
  reactCompiler: true,

  experimental: {
    // Next 15+ Advanced Tree-Shaking. This stops massive libraries from ballooning your bundle size.
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-slider",
      "sonner",
    ],
  },

  compiler: {
    // Strip out all `console.log` statements in production to keep client bundles microscopic
    // We exclude `error` so that error.tsx can still log real production crashes natively
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
