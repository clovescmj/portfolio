import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

/**
 * Desktop banner shape. "wide" matches a landscape screenshot (Contract's
 * laptop shot). "portrait" gives a shorter, closer-to-square box for a
 * source image taller than it is wide, a phone mockup say, so an
 * object-cover crop against a very wide box doesn't lose most of it.
 */
const DESKTOP_ASPECT_CLASSES = {
  wide: "md:aspect-[4500/1716]",
  portrait: "md:aspect-[4/3]",
};

/**
 * The top banner shot. In Figma this grid row has left padding only (no
 * right), so it bleeds to the true right edge of the white shell — no
 * special classes needed here for that: the page (see work/[slug]/page)
 * already cancels the shared right inset for everything below it, and
 * this is simply the one block that doesn't add its own back.
 *
 * The device-mockup exports (hero.png for every project) are transparent
 * cutouts, not opaque screenshots — Figma fills the frame behind them with
 * its "lighter grey" fill token (--color-lightergrey, #edebeb), confirmed
 * directly on that fill in Figma.
 */
export function Hero({
  image,
}: {
  image: { src: string; alt: string; desktopAspect?: keyof typeof DESKTOP_ASPECT_CLASSES };
}) {
  return (
    <div
      className={`relative -mx-6 aspect-[4/3] w-[calc(100%+48px)] overflow-hidden bg-lightergrey md:mx-0 md:w-full ${DESKTOP_ASPECT_CLASSES[image.desktopAspect ?? "wide"]}`}
    >
      <Image
        src={assetPath(image.src)}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 1000px, 100vw"
        priority
        className="object-cover"
      />
    </div>
  );
}
