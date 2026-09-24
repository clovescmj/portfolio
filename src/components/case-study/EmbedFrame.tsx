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
export function EmbedFrame({
  src,
  title,
  device,
  bordered = true,
  fit = false,
}: {
  src: string;
  title: string;
  /** A device-shaped embed (Loft's Home Feed/Property Feedback phone
   *  prototypes): width auto (the grid column already sets it), height
   *  auto off that via Figma's own 312×630 reserved-slot ratio (confirmed
   *  directly by Clóves) — no border either, since the device skin
   *  (bezel, notch, home indicator) is already the visual edge.
   *
   *  Figma's own player wraps the device in `.prototype--viewerContainer`
   *  with `margin: calc(12px + var(--toolbar-height)) 48px` — found by
   *  Clóves via devtools, and measured directly at 48px left/right,
   *  60px top/bottom (so `--toolbar-height` is live at 48px even with
   *  `hide-ui=1`, not 0). That's inside Figma's cross-origin document, so
   *  it can't be overridden from here; instead the iframe is rendered
   *  oversized by exactly that fixed margin (96px/120px) and shifted
   *  up-left by the same amount, so the margin lands outside this box's
   *  overflow-hidden crop and only the device itself remains visible. */
  device?: boolean;
  /** Off for the Third-party Claims prototype: it already sits inside
   *  HighlightBlock's own tinted shell, so its own border read as a
   *  redundant extra outline around the whole embed. */
  bordered?: boolean;
  /** For a live Figma prototype embed, which already scales itself to
   *  fill its box via the URL's own `scaling=scale-down-width` — the
   *  ZOOM transform below is for the Contract drawer's plain HTML page,
   *  which has no such built-in scaling of its own. Stacking both here
   *  double-scaled the content and left it not actually filling its
   *  box. `fit` renders the iframe at a plain 100%/100%, no transform,
   *  so the parent's own `aspect-[]` (sized to the real Figma frame's
   *  ratio) is what the visible content actually hugs. */
  fit?: boolean;
}) {
  if (device) {
    return (
      <div className="relative aspect-[312/630] w-full overflow-hidden">
        <iframe
          src={assetPath(src)}
          title={title}
          loading="lazy"
          className="absolute border-0"
          style={{ width: "calc(100% + 96px)", height: "calc(100% + 120px)", left: "-48px", top: "-60px" }}
        />
      </div>
    );
  }

  return (
    // Fixed height on mobile (single-column stack, no sibling to match);
    // `md:h-full` on desktop instead, so this stretches to the grid row's
    // real height — the taller of this and its text sibling, via CSS
    // Grid's own default `align-items: stretch` on the parent `<section>`
    // — rather than a fixed px guess that can leave blank space under a
    // shorter iframe or clip a taller one.
    <div className={fit ? "h-full w-full" : "-mx-6 h-[616px] w-[calc(100%+48px)] md:mx-0 md:h-full md:w-full"}>
      <div
        className={`h-full w-full overflow-hidden ${fit ? "" : "rounded-[4px]"} ${bordered ? "border border-lightgrey" : ""}`}
      >
        {fit ? (
          <iframe src={assetPath(src)} title={title} loading="lazy" className="h-full w-full border-0" />
        ) : (
          <iframe
            src={assetPath(src)}
            title={title}
            loading="lazy"
            className="origin-top-left border-0"
            style={{ width: `${100 / ZOOM}%`, height: `${100 / ZOOM}%`, transform: `scale(${ZOOM})` }}
          />
        )}
      </div>
    </div>
  );
}
