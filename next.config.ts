import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["localhost", "api.phone-tech.uz"],
  },
};

export default nextConfig;
