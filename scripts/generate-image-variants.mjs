// Writes smaller copies (`name-720.png`, `name-1440.png`) next to wide PNG/WebP
// sources, plus src/lib/image-variants.json for src/lib/image-loader.ts.
// Only downscales; sources narrower than the target get no variant.
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "fs";
import { join, extname } from "path";

const ROOT = "public/images";
const TARGETS = [720, 1440];
const manifest = {};

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

for (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".webp"].includes(ext) || /-\d+\.(png|webp)$/.test(file)) continue;
  const { width } = await sharp(file).metadata();
  const sizes = [];
  for (const target of TARGETS) {
    // Skip a variant unless the source is at least 25% wider, so the copy is a real saving.
    if (width < target * 1.25) continue;
    const out = file.replace(new RegExp(`\\${ext}$`), `-${target}${ext}`);
    const pipeline = sharp(file).resize({ width: target, kernel: "lanczos3" });
    await (ext === ".png"
      ? pipeline.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true })
      : pipeline.webp({ quality: 90, effort: 6 })
    ).toFile(out);
    sizes.push(target);
  }
  if (sizes.length) manifest["/" + file.replace(/^public\//, "")] = sizes;
}
writeFileSync("src/lib/image-variants.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(manifest);
