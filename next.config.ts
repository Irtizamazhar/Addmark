import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Course URLs from the first version of the site → their new catalog pages
  async redirects() {
    return [
      ["mobile-app-development", "mobile-application-development-fundamentals"],
      ["digital-marketing", "complete-digital-marketing"],
      ["seo", "search-engine-optimization-seo"],
      ["social-media-marketing", "social-media-marketing-fundamentals"],
      ["google-meta-ads", "google-ads"],
    ].map(([from, to]) => ({ source: `/courses/${from}`, destination: `/courses/${to}`, permanent: true }));
  },
};

export default nextConfig;
