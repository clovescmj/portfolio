"use client";

import { SlideCarousel } from "@/components/ui/SlideCarousel";
import { headingId } from "@/lib/heading-id";

export interface Recommendation {
  quote: string;
  name: string;
  role: string;
}

const TITLE = "Recommendations";

/**
 * Quotes from people Clóves worked with, on the same carousel as the case
 * studies' images (see `SlideCarousel`). Several slides fit in view at once
 * here, so none are dimmed and the quote text sets each slide's height; the
 * name and role sit at the bottom of every slide, on one shared line.
 */
export function Recommendations({ items }: { items: Recommendation[] }) {
  return (
    <SlideCarousel
      title={TITLE}
      titleHeading={{ level: 2, variant: "h2", id: headingId(TITLE) }}
      labelledBy={headingId(TITLE)}
      slideClassName="w-[75vw] md:w-[264px]"
      gapClassName="gap-6 md:gap-12"
      fadeInactive={false}
      itemLabel="recommendation"
      items={items.map((item) => ({
        key: item.name,
        node: (
          <figure className="flex h-full flex-col justify-between gap-8">
            <blockquote className="font-sans text-body text-ink">
              <p>{`"${item.quote}"`}</p>
            </blockquote>
            <figcaption className="flex flex-col">
              <p className="font-sans text-body font-bold text-ink">{item.name}</p>
              <p className="font-sans text-caption text-ink">{item.role}</p>
            </figcaption>
          </figure>
        ),
      }))}
    />
  );
}
