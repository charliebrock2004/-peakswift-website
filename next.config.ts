import type { NextConfig } from "next";

/* This portfolio site has been replaced by the PeakSwift Studio site at
   https://peakswiftstudio.online. Every path is permanently redirected there
   so links and search ranking move to the one canonical site. */
const CANONICAL_ORIGIN = "https://peakswiftstudio.online";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/", destination: `${CANONICAL_ORIGIN}/`, permanent: true },
      { source: "/:path*", destination: `${CANONICAL_ORIGIN}/portfolio`, permanent: true },
    ];
  },
};

export default nextConfig;
