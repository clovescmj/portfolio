import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { ProjectImage as ProjectImageData } from "@/types/project";

/**
 * "framed" sits a screenshot or mockup (its own device frame, own
 * background) on a soft gradient mat, always spanning the card's full
 * width at its own aspect ratio — for assets that already look finished
 * on their own and just need a bit of visual grounding on the page. If
 * that makes it taller than the mat, it's centered vertically and the
 * overflow is clipped evenly top/bottom rather than shrunk to fit.
 * "plain" (default) is a simple cropped, edge-to-edge image — used for
 * everything else, including the neutral placeholder shown when a
 * project has no image yet.
 *
 * Every card's image area is a fixed height — 144px on mobile, 280px at
 * the md breakpoint and up (per the Figma mobile frame) — regardless of
 * the card's width, a single predictable rule rather than one that
 * varies per card size.
 */
const IMAGE_HEIGHT = "h-[144px] md:h-[280px]";
const SIZES = "(min-width: 768px) 50vw, 100vw";

export function ProjectImage({
  image,
  priority = false,
}: {
  image?: ProjectImageData;
  /** Set for the card(s) visible above the fold, e.g. the first in the grid. */
  priority?: boolean;
}) {
  if (!image) {
    return <div className={`${IMAGE_HEIGHT} w-full bg-placeholder`} />;
  }

  if (image.treatment === "framed") {
    return (
      <div
        className={`${IMAGE_HEIGHT} flex w-full items-center justify-center overflow-hidden bg-linear-to-b from-placeholder-deep to-placeholder-strong p-8`}
      >
        <Image
          src={assetPath(image.src)}
          alt={image.alt}
          width={1920}
          height={1280}
          sizes={SIZES}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${IMAGE_HEIGHT} w-full overflow-hidden bg-placeholder`}>
      <Image
        src={assetPath(image.src)}
        alt={image.alt}
        fill
        sizes={SIZES}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
