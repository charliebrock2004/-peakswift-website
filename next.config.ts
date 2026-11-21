import type { NextConfig } from "next";

/* This portfolio site has been replaced by the PeakSwift Studio site at
   https://peakswiftstudio.online. Every path is permanently redirected there
   so links and search ranking move to the one canonical site. This project
   also answers for www.peakswiftstudio.online, so the path is kept: a www
   link to any page must land on that page, not on the portfolio. Only this
   old site's own image folders, which do not exist there, go to /portfolio. */
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
      { source: "/:dir(brand|work)/:path*", destination: `${CANONICAL_ORIGIN}/portfolio`, permanent: true },
      { source: "/:path*", destination: `${CANONICAL_ORIGIN}/:path*`, permanent: true },
    ];
  },
};

export default nextConfig;
