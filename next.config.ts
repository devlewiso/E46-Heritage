import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: Cloudflare Workers sirve ./out como assets (sin servidor).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
