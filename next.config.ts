import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["localhost", "your-api.com"],
  },
};

export default nextConfig;
