import type { NextConfig } from "next";

// GitHub Pages serves this as a project page (github.com/clovescmj/portfolio ->
// clovescmj.github.io/portfolio/), so every asset/link needs that path prefix
// baked in — that's what basePath/assetPrefix do. There's no Node server to
// run next/image's optimizer either, hence `unoptimized`.
const repoName = "portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
  // `<Link>` and route navigation get basePath applied automatically, but a
  // plain string passed to `next/image`'s `src` doesn't (especially with
  // `unoptimized`, which drops the /_next/image wrapper that would normally
  // carry it) — src/lib/asset-path.ts reads this to prefix those manually.
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
  },
};

export default nextConfig;
