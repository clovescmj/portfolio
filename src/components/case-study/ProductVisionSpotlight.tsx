import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { CaseStudySpotlight } from "@/types/case-study";

/**
 * The one dark, full-bleed block among this site's case-study components —
 * Loft's "Product Vision". Bleeds to the true right edge like the Hero and
 * Carousel (the page already establishes the left inset via `pl-content`
 * and cancels the shared right one for everything below it, so this needs
 * no left padding of its own on desktop — only `pr-content` on the inner
 * content, same as LabeledRow/SolutionGroup, so text doesn't hug the true
 * edge the dark fill reaches). Mobile still needs its own bleed past the
 * page's 24px gutter, same trick Hero/Carousel use there.
 *
 * Unlike every other section, Figma does NOT give this one a narrow label
 * column with indented content beside it — the title and statement both
 * sit flush at the row's left edge (x=0), stacked, and only the
 * Principles/Search Context row below is genuinely two columns. Confirmed
 * via get_metadata on node 92:4490: title x=0 w=484 (single line, wide —
 * not the ~140-190px label column other groups use), statement x=0 y=59
 * (24px below the title, not beside it), Principles/Context frames both
 * starting x=0/x=344 (a plain 312+32 two-column split, no label-column
 * offset). The photo spans the full block height (y=0 h=450), so it's a
 * sibling of the whole text stack via flex `items-stretch`, not pinned to
 * just the lower row.
 */
export function ProductVisionSpotlight({ spotlight }: { spotlight: CaseStudySpotlight }) {
  return (
    <div className="-mx-6 flex w-[calc(100%+48px)] flex-col bg-ink px-6 py-10 md:mx-0 md:w-full md:px-0 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-8 md:pr-content">
        <div className="flex flex-col gap-8 md:flex-1 md:gap-[134px]">
          <div className="flex flex-col gap-6 md:max-w-[656px]">
            <h2 className="font-sans text-heading-2 text-surface">{spotlight.title}</h2>
            <p className="font-sans text-heading-3 text-surface">{spotlight.statement}</p>
          </div>

          {/* Figma order: Experience Principles sits left (closer to the
              title), Search Context to its right, closer to the photo. */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[312px_312px] md:gap-x-8">
            <div className="flex flex-col gap-4">
              <p className="font-sans text-nav text-lightgrey">{spotlight.principlesLabel}</p>
              <ul className="flex flex-col gap-2 font-sans text-heading-3 text-surface">
                {spotlight.principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-sans text-nav text-lightgrey">{spotlight.searchContextLabel}</p>
              <div className="flex gap-8">
                {spotlight.searchContext.map((column) => (
                  <div key={column.label} className="flex flex-1 flex-col gap-2">
                    <h3 className="font-sans text-heading-3 text-surface">{column.label}</h3>
                    <ul className="flex flex-col gap-1 font-sans text-body text-surface">
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

        <div className="relative aspect-[529/793] w-full shrink-0 md:aspect-auto md:w-[317px]">
          <Image src={assetPath(spotlight.image.src)} alt={spotlight.image.alt} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
