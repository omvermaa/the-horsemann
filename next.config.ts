import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.34'],
};

export default nextConfig;
