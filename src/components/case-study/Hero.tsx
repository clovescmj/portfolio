import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

/**
 * The top banner shot. In Figma this grid row has left padding only (no
 * right), so it bleeds to the true right edge of the white shell — no
 * special classes needed here for that: the page (see work/[slug]/page)
 * already cancels the shared right inset for everything below it, and
 * this is simply the one block that doesn't add its own back.
 */
export function Hero({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="relative aspect-[4500/1716] w-full overflow-hidden bg-placeholder">
      <Image
        src={assetPath(image.src)}
        alt={image.alt}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
    </div>
  );
}
