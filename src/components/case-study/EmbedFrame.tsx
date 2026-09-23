import { assetPath } from "@/lib/asset-path";

// Zooms the drawer's content out a bit so more of it is visible at once
// instead of filling the card edge-to-edge at 1:1. The iframe is sized
// in percent (not fixed px) so this stays responsive: scaling it down by
// ZOOM means its own box has to be 1/ZOOM of the container to still
// visually fill it after the transform.
const ZOOM = 0.8;

/**
 * No backdrop or padding around the iframe — plain, edge-to-edge, per
 * Clóves' direct instruction (a bg-placeholder card behind it read as an
 * unwanted extra frame, not something Figma itself shows here).
 *
 * In Figma this slot instead shows a static screenshot of the drawer;
 * per instruction, this is the one deliberate deviation from the file —
 * a live iframe of the actual HTML prototype instead of a picture of it.
 *
 * add-attachment.html's own drawer panel is already responsive
 * (`width: min(640px, 100%)`), so this needs no fixed sizing to fill its
 * column — just the zoom-out transform above.
 *
 * The border and rounded corners live on this wrapper, not the iframe: a
 * `transform: scale` shrinks everything about the element it's applied
 * to — border width and corner radius included — so putting either on
 * the scaled iframe itself would render it at ZOOM × its set size
 * instead of the real thing. This div is never transformed, so both
 * stay a true fixed size regardless of ZOOM, and it clips the oversized
 * (then scaled-down) iframe to size.
 */
export function EmbedFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="-mx-6 h-[616px] w-[calc(100%+48px)] md:mx-0 md:h-[720px] md:w-full">
      <div className="h-full w-full overflow-hidden rounded-[4px] border border-lightgrey">
        <iframe
          src={assetPath(src)}
          title={title}
          loading="lazy"
          className="origin-top-left border-0"
          style={{ width: `${100 / ZOOM}%`, height: `${100 / ZOOM}%`, transform: `scale(${ZOOM})` }}
        />
      </div>
    </div>
  );
}
