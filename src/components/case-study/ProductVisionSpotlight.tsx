import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { SpotlightSection } from "@/types/case-study";
import { HighlightBlock } from "./HighlightBlock";
import { Heading } from "@/components/ui/Heading";
import { headingId } from "@/lib/heading-id";

/**
 * Loft's "Product Vision" — the dark instance of the shared
 * `HighlightBlock` shape (see that component for the bleed mechanics).
 *
 * Unlike every other section, Figma does NOT give this one a narrow label
 * column with indented content beside it — the title and statement both
 * sit flush at the row's left edge (x=0), stacked, and only the
 * Principles/Search Context row below is genuinely two columns. Confirmed
 * via get_metadata on node 92:4490: title x=0 w=484 (single line, wide —
 * not the ~140-190px label column other groups use), statement x=0 y=59
 * (24px below the title, not beside it), Principles/Context frames both
 * starting x=0/x=344 (a plain 312+32 two-column split, no label-column
 * offset).
 *
 * The photo is on the site's real shared 6-column grid (same
 * `repeat(6,minmax(0,1fr))` ColumnsSection/Subsection use), spanning
 * exactly 2 of the 6 columns — not an arbitrary fixed pixel width — with
 * the text block taking the other 4. CSS Grid's default
 * `align-items: stretch` makes the photo cell match the taller text
 * column's height automatically, no explicit height needed; the image
 * itself stays cropped to that height (object-cover, anchored top so the
 * subject's head isn't cut).
 */
export function ProductVisionSpotlight({ spotlight }: { spotlight: SpotlightSection }) {
  return (
    <HighlightBlock background="bg-ink" labelledBy={headingId(spotlight.title)}>
      <div className="page-grid gap-y-8">
        <div className="flex flex-col gap-8 md:col-span-4 md:gap-[134px]">
          <div className="flex flex-col gap-6">
            <Heading level={2} variant="h2" tone="surface" id={headingId(spotlight.title)}>
              {spotlight.title}
            </Heading>
            <p className="font-sans text-h3 text-surface">{spotlight.statement}</p>
          </div>

          {/* Figma order: Experience Principles sits left (closer to the
              title), Search Context to its right, closer to the photo. */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8">
            <div className="flex min-w-0 flex-col gap-4">
              <p className="font-sans text-h4 text-lightgrey">{spotlight.principlesLabel}</p>
              <ul className="flex flex-col gap-1 font-sans text-h3 text-surface">
                {spotlight.principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <p className="font-sans text-h4 text-lightgrey">{spotlight.searchContextLabel}</p>
              <div className="flex gap-8">
                {spotlight.searchContext.map((column) => (
                  <div key={column.label} className="flex min-w-0 flex-1 flex-col gap-2">
                    <Heading level={3} variant="h3" tone="surface">{column.label}</Heading>
                    <ul className="flex flex-col gap-1 font-sans text-nav text-surface">
                      {column.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-[529/793] w-full md:col-span-2 md:aspect-auto">
          <Image sizes="(min-width: 768px) 1000px, calc(100vw - 48px)"
            src={assetPath(spotlight.image.src)}
            alt={spotlight.image.alt}
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </HighlightBlock>
  );
}
