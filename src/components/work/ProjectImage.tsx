import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { ProjectImage as ProjectImageData } from "@/types/project";

/**
 * "framed" fills the frame edge-to-edge (no padding), cropping the
 * sides as needed but anchored to the top so nothing gets cropped from
 * the top of the shot. "plain" (default) is the same edge-to-edge crop
 * but anchored center — used for everything else, including the neutral
 * placeholder shown when a project has no image yet.
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
      <div className={`relative ${IMAGE_HEIGHT} w-full overflow-hidden bg-placeholder`}>
        <Image
          src={assetPath(image.src)}
          alt={image.alt}
          fill
          sizes={SIZES}
          priority={priority}
          className="object-cover object-top"
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
