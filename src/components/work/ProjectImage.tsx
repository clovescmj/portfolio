import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { ProjectImage as ProjectImageData } from "@/types/project";

/**
 * "framed" mimics a browser-mockup presentation (gradient mat + drop
 * shadow) for real product screenshots. "plain" (default) is a simple
 * cropped image, square corners — used for everything else, including
 * the neutral placeholder shown when a project has no image yet.
 *
 * Every card's image area is a fixed 280px tall, regardless of the
 * card's width — a single, predictable rule rather than one that varies
 * per card size.
 */
const IMAGE_HEIGHT = "h-[280px]";
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
      // Padding only on top/sides (none at the bottom): the screenshot
      // bleeds past the mat and gets clipped by overflow-hidden, like a
      // peek of the interface rather than a fully matted photo.
      <div
        className={`${IMAGE_HEIGHT} w-full overflow-hidden bg-linear-to-b from-placeholder-deep to-placeholder-strong px-8 pt-8`}
      >
        <div className="relative aspect-[1440/1110] w-full shadow-card">
          <Image
            src={assetPath(image.src)}
            alt={image.alt}
            fill
            sizes={SIZES}
            priority={priority}
            className="object-cover"
          />
        </div>
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
