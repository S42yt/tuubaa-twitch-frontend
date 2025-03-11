import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/commands",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**' 
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
        pathname: '/**' 
      }
    ],
  },
};

export default nextConfig;