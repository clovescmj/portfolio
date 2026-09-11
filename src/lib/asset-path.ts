/**
 * Prefixes a `public/`-relative path with the configured basePath (see
 * next.config.ts). `<Link>` and page routes get this automatically from
 * Next.js; a plain string handed to `next/image`'s `src` does not, so any
 * static asset referenced that way needs to go through this.
 */
export function assetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}
