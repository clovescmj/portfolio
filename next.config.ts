import type { NextConfig } from "next";

// Served from a custom domain (cloves.work) at the root, via GitHub Pages —
// see public/CNAME. There's no Node server to run next/image's optimizer, so
// src/lib/image-loader.ts serves pre-generated smaller copies instead.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
