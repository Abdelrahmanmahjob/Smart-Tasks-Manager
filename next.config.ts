import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // بيمنع مشاكل ملفات النظام
      }
    }
    return config
  },
}

export default nextConfig
