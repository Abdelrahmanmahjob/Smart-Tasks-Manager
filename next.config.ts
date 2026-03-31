import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/settings",
        destination: "/dashboard/settings/profile",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel-storage.com", // عشان صور Vercel Blob تظهر
      },
    ],
  },
}

export default nextConfig
