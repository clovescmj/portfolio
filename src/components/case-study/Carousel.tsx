"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { CaseStudySlide } from "@/types/case-study";
import { SlideCarousel } from "@/components/ui/SlideCarousel";

/**
 * The case-study image carousel: one image plus its own caption per slide,
 * the active one at full opacity and every other at 30%. All the track,
 * snapping and arrow behavior lives in `SlideCarousel` (see the notes there),
 * shared with the About page's recommendations.
 */
export function Carousel({ slides, title }: { slides: CaseStudySlide[]; title?: string }) {
  return (
    <SlideCarousel
      title={title}
      slideClassName="w-[85vw] gap-2 md:w-[833px]"
      items={slides.map((slide) => ({
        key: slide.src,
        title: slide.title,
        node: (
          <>
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
          </>
        ),
      }))}
    />
  );
}
