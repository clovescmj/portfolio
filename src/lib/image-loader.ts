import variants from "./image-variants.json";

const sizesBySrc = variants as Record<string, number[]>;

/**
 * next/image's optimizer can't run on a static export, so this stands in for it:
 * `scripts/generate-image-variants.mjs` writes `name-720.png`-style copies next to
 * wide sources, and this returns the smallest one that covers (within 5%) the width next/image
 * asks for (falling back to the original). Anything without variants, GIFs and SVGs
 * included, is returned untouched; the `?w=` only keeps next/image's dev check for
 * loaders that ignore width quiet.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = basePath && src.startsWith(basePath) ? src.slice(basePath.length) : src;
  const target = sizesBySrc[path]?.find((size) => size >= width * 0.95);
  if (!target) return `${src}?w=${width}`;
  return `${basePath}${path.replace(/(\.\w+)$/, `-${target}$1`)}`;
}
