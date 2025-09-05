import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['macenauer.net'],
  },
};

export default nextConfig;
