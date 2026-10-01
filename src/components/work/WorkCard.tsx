"use client";

import type { CSSProperties } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Heading } from "@/components/ui/Heading";
import type { WorkEntry } from "@/types/work";
import { ProjectImage } from "./ProjectImage";
import { ProjectMeta } from "./ProjectMeta";

/**
 * A single project card in the Work bento grid.
 *
 * Position and size come entirely from `entry.card.layout` (see
 * src/types/project.ts). At the md breakpoint and up, whether the
 * title/description sit side by side or stacked adapts on its own via a
 * CSS container query, based on how wide the card ends up once placed
 * on the grid, no per-card variant switch to maintain by hand. Below
 * md, they always stack: on a wide phone a card can still render past
 * the 420px container threshold, and a mobile card splitting into two
 * columns reads as a bug, not a size-driven layout choice, so the
 * container query itself is scoped to md: (`md:@min-[420px]:flex-row`)
 * rather than being unconditional. Title/body/meta font sizes are fixed
 * and the same on every card regardless of width, by design.
 */
export function WorkCard({
  entry,
  order,
  priority = false,
}: {
  entry: WorkEntry;
  order: number;
  priority?: boolean;
}) {
  const { card, kind } = entry;
  const href = `/work/${entry.slug}`;

  const style = {
    "--card-col-start": card.layout.colStart,
    "--card-col-span": card.layout.colSpan,
    "--card-gap-top": `${card.layout.gapTop ?? 0}px`,
    "--card-order": order,
  } as CSSProperties;

  return (
    <article
      className="work-card"
      style={style}
    >
      {/*
        Hover backdrop: padding + an equal negative margin cancel out for
        layout purposes (the card's footprint in the grid is unchanged),
        but the background-color only shows within the padded box — so
        hovering "reveals" a surface bleeding 16px past the card into the
        surrounding gutter, instead of pushing neighbors around. A border
        would only draw a ring, not a filled backdrop like this.
      */}
      <TransitionLink
        href={href}
        className="group @container -m-4 flex flex-col gap-4 p-4 transition-colors duration-400 ease-in-out hover:bg-placeholder"
      >
        {/* Articles have no thumbnail — they're shared as a written piece,
            not a set of designed screens, so a card image would either be
            blank or a stand-in that doesn't represent the content. */}
        {kind !== "article" && <ProjectImage image={card.image} priority={priority} />}

        {!card.layout.imageOnly && (
          <div className="flex flex-col gap-2 md:gap-4 md:@min-[420px]:flex-row md:@min-[420px]:gap-6">
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-sans text-caption text-muted">{kind === "article" ? "Article" : "Case study"}</p>
              {/* h3 is fluid (20-24px) now, so the card title just takes it
                  directly instead of carrying its own separate mobile
                  override — one less place the two could drift apart. */}
              <Heading level={2} variant="h3">
                {entry.title}
              </Heading>
            </div>
            <div className="flex flex-1 flex-col gap-2 md:gap-4">
              <p className="font-sans text-body text-ink">{card.description}</p>
              <ProjectMeta client={entry.client} tags={entry.tags} />
            </div>
          </div>
        )}
      </TransitionLink>
    </article>
  );
}
