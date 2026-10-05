import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The preview browser loads the dev server as 127.0.0.1. Without this,
  // Next blocks the client scripts and the menu never becomes interactive.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      {
        source: "/website-health-check",
        destination: "/free-online-review",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
