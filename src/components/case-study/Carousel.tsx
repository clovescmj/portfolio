"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { CaseStudySlide } from "@/types/case-study";
import { ArrowIcon } from "./ArrowIcon";
import { HighlightBlock } from "./HighlightBlock";

/**
 * A real sliding track (native horizontal scroll + scroll-snap), not a
 * swap-the-image carousel: every slide sits in one row, the active one at
 * full opacity and every other at 30%. Clicking an arrow scrolls only the
 * track itself (track.scrollTo, not scrollIntoView) so the page's own
 * vertical scroll never jumps — scrollIntoView bubbles up through every
 * scrollable ancestor, including the page, which is exactly the
 * repositioning this avoids. Centering the target slide this way still
 * clamps naturally at the ends: track.scrollTo clamps scrollLeft to
 * [0, scrollWidth - clientWidth] on its own, so the first/last slide
 * never over-scrolls past where they rest. The arrow buttons also
 * preventDefault on mousedown, so clicking one never
 * focuses it — a focused element that isn't fully visible gets its own
 * native browser scroll-into-view, which caused the exact same jump
 * scrollIntoView did, just from focus instead of this code.
 *
 * Index sync listens for `scrollend`, not every `scroll` tick: a smooth
 * scroll fires scroll events continuously while it's still travelling,
 * and recomputing "closest slide" from wherever it happens to be
 * mid-animation made the active index (and so the disabled arrow) flip
 * back and forth until the animation settled — a visible flicker. Only
 * recomputing once the scroll actually stops (arrow-triggered or a
 * manual swipe, either way) avoids that.
 *
 * Renders on the shared `HighlightBlock` shell (same one Loft's Product
 * Vision spotlight uses, tinted `bg-placeholder` here) — see that
 * component for the full-bleed mechanics. The track itself spans the
 * block's full true-edge-to-true-edge width (escaping the inherited
 * content inset with `md:-mx-content`, same trick the block uses one
 * level up) rather than sitting inside it — `overflow-x-auto` clips to
 * whatever box it's on, so if the track itself were the padded, inset
 * box, a slide mid-scroll (not yet resting) would get clipped right at
 * that padding edge instead of being visible all the way out to the
 * block's real edge while it peeks in.
 *
 * Every slide (not just the first) rests with its LEFT edge at that same
 * 56px content inset, aligned with the title above it — `snap-start` on
 * every slide, not `snap-center`: a centered resting slide only happens
 * to land on the title's edge when the surrounding content width works
 * out exactly right, which a middle slide in a 3-up carousel doesn't.
 * Two things make `scrollLeft: 0` (and every other slide's own start
 * point) actually resolve to that 56px inset instead of the track's raw
 * true edge:
 *  - The track's own `pl-content`/`pr-content` PADDING (not a per-slide
 *    margin) gives the FIRST slide real breathing room before it, which
 *    `scroll-snap-align: start` already includes (padding is part of the
 *    scrollable content box) — this is what makes `scrollLeft: 0`, the
 *    natural un-scrollable-past boundary, land past the padding instead
 *    of flush at the box's raw edge.
 *  - `scroll-padding-left` handles every OTHER slide, whose own "start"
 *    point is reachable (not boundary-clamped) — it shifts where a
 *    non-clamped snap target resolves to, so a middle slide's `start`
 *    also lands 56px in rather than flush with wherever it happens to
 *    sit in the track's own content flow. It can't do this alone for the
 *    first slide, though: it only pushes a snap target AWAY from the
 *    scroll boundary, it can't invent breathing room before position 0
 *    itself — that first slide needs the real padding above.
 * A per-slide margin was an earlier, simpler-looking approach that
 * turned out to have a real bug: `scroll-snap-align` measures a box's
 * MARGIN edge, not its border edge, so that margin shifted where the
 * browser considered the slide's own snap point to be, landing it short
 * of — or past — where it visually looked flush. Padding and
 * `scroll-padding` don't have that failure mode.
 */
// Matches --spacing-content (globals.css) — the same 56px inset every
// slide rests at, left-aligned with the title above the track.
const CONTENT_INSET = 56;

export function Carousel({ slides, title }: { slides: CaseStudySlide[]; title?: string }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasMultiple = slides.length > 1;

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    setIndex(clamped);
    const track = trackRef.current;
    const slide = slideRefs.current[clamped];
    if (!track || !slide) return;
    // getBoundingClientRect-based, not slide.offsetLeft: offsetLeft is
    // relative to the nearest POSITIONED ancestor, which isn't
    // necessarily the track itself (HighlightBlock's own outer wrapper
    // is `relative`, sitting between them), so it doesn't reliably mean
    // "this slide's position within the track's scrollable content."
    const slideLeftInTrack = slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const target = slideLeftInTrack - CONTENT_INSET;
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncIndexToScroll = () => {
      // The resting position for whichever slide is active is
      // `scrollLeft + CONTENT_INSET` (its start-aligned rest point, not
      // its center — see the note on `goTo`), so find whichever slide's
      // actual left edge is closest to that, the same way `goTo` computes
      // a slide's own position.
      const trackLeft = track.getBoundingClientRect().left;
      const restingLeft = track.scrollLeft + CONTENT_INSET;
      let closest = 0;
      let smallestDistance = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const slideLeftInTrack = el.getBoundingClientRect().left - trackLeft + track.scrollLeft;
        const distance = Math.abs(slideLeftInTrack - restingLeft);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closest = i;
        }
      });
      setIndex(closest);
    };

    track.addEventListener("scrollend", syncIndexToScroll);
    return () => track.removeEventListener("scrollend", syncIndexToScroll);
  }, []);

  // A slide's own `title` overrides this while it's active — Contract's
  // carousel covers two distinct flows (contract vs. attachment template
  // management) in one track, so the header names whichever is on screen.
  const activeTitle = slides[index]?.title ?? title;

  return (
    <HighlightBlock background="bg-placeholder">
      <div className="flex flex-col gap-4 md:gap-6">
        {(activeTitle || hasMultiple) && (
          <div className="flex items-center justify-between gap-4">
            {activeTitle ? (
              <p
                key={activeTitle}
                className="font-sans text-h3 text-ink animate-[fade-in_400ms_ease-in-out]"
              >
                {activeTitle}
              </p>
            ) : (
              <span />
            )}
            {hasMultiple && (
              <div className="flex gap-4">
                <button
                  type="button"
                  aria-label="Previous image"
                  disabled={index === 0}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => goTo(index - 1)}
                  className="cursor-pointer text-ink transition-[color,opacity] duration-400 ease-in-out hover:text-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-30"
                >
                  <ArrowIcon direction="left" size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  disabled={index === slides.length - 1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => goTo(index + 1)}
                  className="cursor-pointer text-ink transition-[color,opacity] duration-400 ease-in-out hover:text-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-30"
                >
                  <ArrowIcon direction="right" size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        <div
          ref={trackRef}
          className="scroll-area -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:-mx-content md:gap-10 md:px-content md:[scroll-padding-left:var(--spacing-content)]"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className={`flex w-[85vw] shrink-0 snap-start flex-col gap-2 transition-opacity duration-500 ease-in-out md:w-[833px] ${
                i === index ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="relative aspect-[833/642] w-full overflow-hidden bg-placeholder">
                <Image
                  src={assetPath(slide.src)}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 768px) 833px, 85vw"
                  className="object-cover"
                />
              </div>
              <p className="font-sans text-caption text-muted">{slide.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </HighlightBlock>
  );
}
