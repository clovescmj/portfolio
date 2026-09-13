"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { CaseStudySlide } from "@/types/case-study";
import { ArrowIcon } from "./ArrowIcon";

/**
 * A real sliding track (native horizontal scroll + scroll-snap), not a
 * swap-the-image carousel: every slide sits in one row, the active one at
 * full opacity and every other at 30%. Clicking an arrow scrolls only the
 * track itself (track.scrollTo, not scrollIntoView) so the page's own
 * vertical scroll never jumps — scrollIntoView bubbles up through every
 * scrollable ancestor, including the page, which is exactly the
 * repositioning this avoids. Centering the target slide this way still
 * clamps naturally at the ends: track.scrollTo clamps scrollLeft to
 * [0, scrollWidth - clientWidth] on its own, so the first slide ends up
 * flush left and the last flush right, matching the reference frame
 * (node 57:1994) the file's three "Carousel Specs" states show. The
 * arrow buttons also preventDefault on mousedown, so clicking one never
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
 * Bleeds on both sides — the page (see work/[slug]/page) already cancels
 * the shared inset for everything below it, so this needs no bleed
 * classes of its own. Its 40px/56px left/right insets are asymmetric and
 * live as margin on the resting first/last slide individually rather
 * than as container padding, so a slide merely peeking at an edge (not
 * yet the resting one) still bleeds all the way to the backdrop's true
 * edge instead of stopping short of it.
 */
export function Carousel({ slides }: { slides: CaseStudySlide[] }) {
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
    const target = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncIndexToScroll = () => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let smallestDistance = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const slideCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(slideCenter - trackCenter);
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

  return (
    <div className="flex flex-col gap-4 bg-placeholder pb-6 pt-6 md:gap-6 md:pb-10 md:pt-8">
      {hasMultiple && (
        <div className="flex justify-end gap-4 px-6 md:px-0 md:pr-content">
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

      <div
        ref={trackRef}
        className="scroll-area flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:gap-10 md:px-0"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className={`flex w-[85vw] shrink-0 snap-center flex-col gap-2 transition-opacity duration-500 ease-in-out md:w-[833px] ${
              i === index ? "opacity-100" : "opacity-30"
            } ${i === 0 ? "md:ml-10" : ""} ${i === slides.length - 1 ? "md:mr-content" : ""}`}
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
  );
}
