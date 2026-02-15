import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }
    ],
  },
  basePath: '/newcozycurated', // Replace with your actual repo name if different
  assetPrefix: '/newcozycurated/', // Replace with your actual repo name if different
};

export default nextConfig;
