import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.macenauer.net' : '',
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
