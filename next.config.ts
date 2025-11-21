import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["d1nczod8gufv19.cloudfront.net"],
  },
};

export default nextConfig;
