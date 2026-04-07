import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
    imageSizes: [48, 96, 160, 256, 400],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней
    remotePatterns: [],
  },
};

export default nextConfig;
