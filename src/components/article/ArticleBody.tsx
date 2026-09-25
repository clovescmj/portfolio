import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { Article, ArticleBlock, ArticleSection } from "@/types/article";
import { ArticleNote } from "./ArticleNote";
import { Heading } from "@/components/ui/Heading";
import { headingId } from "@/lib/heading-id";

function Block({ block }: { block: ArticleBlock }) {
  if (block.kind === "paragraph") {
    return <p className="font-sans text-body text-ink">{block.text}</p>;
  }
  if (block.kind === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag className="flex flex-col gap-2 font-sans text-body text-ink">
        {block.items.map((item, i) => (
          <li key={item} className="flex gap-2">
            {block.ordered ? (
              <span className="font-medium">{i + 1}.</span>
            ) : (
              <span aria-hidden className="text-muted">
                •
              </span>
            )}
            <span>{item}</span>
          </li>
        ))}
      </Tag>
    );
  }
  return (
    <Image sizes="(min-width: 768px) 1000px, calc(100vw - 48px)"
      src={assetPath(block.src)}
      alt={block.alt}
      width={block.width}
      height={block.height}
      className="h-auto w-full"
    />
  );
}

/** A normal section: heading plus blocks, full width of the reading column. */
function Section({ section, id }: { section: ArticleSection; id: string | number }) {
  // Only a titled section is a <section>; an untitled run of blocks is just a div.
  const Root = section.heading ? "section" : "div";
  return (
    <Root
      key={id}
      aria-labelledby={section.heading ? headingId(section.heading) : undefined}
      className="flex flex-col gap-4 md:col-span-4 md:col-start-1"
    >
      {section.heading && (
        <Heading level={2} variant="h4" id={headingId(section.heading)}>
          {section.heading}
        </Heading>
      )}
      {section.blocks.map((block, j) => (
        <Block key={j} block={block} />
      ))}
    </Root>
  );
}

/** `sideImage`: text narrows to a 2-column side column, its image sits
 *  beside it spanning the remaining columns instead of running full
 *  width in normal flow — see the note on `ArticleSection.sideImage`.
 *  Text renders before the image in the DOM (even though the image sits
 *  to its right) so CSS Grid's sparse auto-placement lands both in the
 *  same row instead of pushing the later, righter item to a fresh row —
 *  the same fix as Impact.tsx's stats/topic ordering. */
function SideImageSection({ section, id }: { section: ArticleSection; id: string | number }) {
  const imageBlock = section.blocks.find((block) => block.kind === "image");
  const textBlocks = section.blocks.filter((block) => block.kind !== "image");
  return (
    <>
      <section
        key={`${id}-text`}
        aria-labelledby={section.heading ? headingId(section.heading) : undefined}
        className="flex flex-col gap-4 md:col-span-2 md:col-start-1"
      >
        {section.heading && (
          <Heading level={2} variant="h4" id={headingId(section.heading)}>
            {section.heading}
          </Heading>
        )}
        {textBlocks.map((block, j) => (
          <Block key={j} block={block} />
        ))}
      </section>
      {imageBlock && imageBlock.kind === "image" && (
        <div
          key={`${id}-image`}
          className="relative aspect-[var(--img-ratio)] md:aspect-auto md:col-span-4 md:col-start-3"
          style={{ "--img-ratio": `${imageBlock.width}/${imageBlock.height}` } as React.CSSProperties}
        >
          {/* `fill` sizes off this wrapper's own height — on desktop that
              comes from CSS Grid's default `align-items: stretch` (it
              matches the text column beside it, same row), but the grid
              collapses to one column on mobile, where the image is no
              longer any sibling's row-mate, so the wrapper would
              otherwise collapse to 0 height. `aspect-[var(--img-ratio)]`
              is the mobile fallback, fed by the CSS custom property since
              Tailwind can't generate a class for a width/height that's
              only known at runtime (only literal class strings in the
              source get compiled) — `md:aspect-auto` drops it again at
              the breakpoint where stretch takes over. This has to be a
              Tailwind class either way, not the aspect-ratio directly as
              an inline style: an inline style always beats `md:aspect-
              auto`'s specificity regardless of breakpoint, so that
              version never actually let stretch take over, confirmed via
              getBoundingClientRect before this fix. */}
          <Image sizes="(min-width: 768px) 1000px, calc(100vw - 48px)"
            src={assetPath(imageBlock.src)}
            alt={imageBlock.alt}
            fill
            className="h-full w-full object-cover object-left"
          />
        </div>
      )}
    </>
  );
}

/**
 * A single reading column in the site's 6-column grid (columns 1-4, per
 * Clóves' own Figma layout), with each top-level piece placed directly
 * as its own grid item — not nested inside one shared inner wrapper —
 * so a `sideImage` section can break that width and use columns 1-2/3-6
 * on its own row instead. Deliberately not the case-study system's
 * Figma-node-by-node grid: only the one layout Clóves actually asked
 * for (side image) is modeled, not a general-purpose positioning system.
 */
export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-6 md:gap-x-gutter md:gap-y-12">
      <header className="flex flex-col gap-4 md:col-span-4 md:col-start-1">
        <p className="font-sans text-caption text-muted">Article</p>
        <Heading level={1} variant="h1" className="break-words">{article.title}</Heading>
        <p className="font-sans text-caption text-ink">
          <span className="font-bold">{article.company}</span> | {article.role}
        </p>
        {article.lead && <p className="font-sans text-h3 text-ink italic">{article.lead}</p>}
      </header>

      <hr className="border-ink md:col-span-6" />

      {article.note && (
        <div className="md:col-span-4 md:col-start-1">
          <ArticleNote note={article.note} />
        </div>
      )}

      {article.tldr && (
        <div className="flex flex-col gap-3 bg-lightergrey p-6 md:col-span-4 md:col-start-1">
          <Heading level={2} variant="h4">TL;DR</Heading>
          <ul className="flex flex-col gap-1 font-sans text-body text-ink">
            {article.tldr.map((item) => (
              <li key={item.label} className="flex gap-2">
                <span aria-hidden className="text-muted">
                  •
                </span>
                <span>
                  <span className="font-bold">{item.label}:</span> {item.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {article.sections.map((section, i) =>
        section.sideImage ? (
          <SideImageSection key={section.heading ?? i} section={section} id={section.heading ?? i} />
        ) : (
          <Section key={section.heading ?? i} section={section} id={section.heading ?? i} />
        ),
      )}
    </div>
  );
}
