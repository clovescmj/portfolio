import type { NextConfig } from "next";

// Served from a custom domain (cloves.work) at the root, via GitHub Pages —
// see public/CNAME. There's no Node server to run next/image's optimizer,
// hence `unoptimized`.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
