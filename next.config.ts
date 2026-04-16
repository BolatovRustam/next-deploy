import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.povar.ru"
      }
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
