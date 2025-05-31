import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "res.cloudinary.com"
    ],

  },
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  experimental: {
    serverComponentsExternalPackages: [],
  }
};

export default nextConfig;
