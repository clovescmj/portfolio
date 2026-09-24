import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { CaseStudyFlow, CaseStudyGroup } from "@/types/case-study";
import { Carousel } from "./Carousel";
import { EmbedFrame } from "./EmbedFrame";
import { PrototypeHighlight } from "./PrototypeHighlight";
import { FlowDiagram } from "./FlowDiagram";
import { StatsGrid } from "./StatsGrid";
import { gridPositionClass } from "@/lib/grid-position";

/**
 * The site's shared grid, confirmed against Figma's own layout-grid overlay
 * (get_design_context reports `grid-cols-[repeat(6,minmax(0,1fr))]` on
 * every one of these rows): 6 EQUAL 140px columns with a 32px gutter over
 * the 1000px usable width (1056px row minus the 56px `pr-content` reserve),
 * not a differently-sized "label track + N content tracks" approximation.
 * A group's title takes 1 column (Release Plan — topics then start at
 * column 2) or 2 columns (Understanding, Business Opportunities, My Role,
 * App Evolution, Insights' subsections — topics start at column 3)
 * depending on Figma's own `col-[1/span_N]` on that title; see `wideLabel`.
 * A single-column title can still leave column 2 empty and start content
 * at column 3 (MVP) — that's `contentOffset3`, independent of `wideLabel`.
 * Two topics per row either way, each spanning 2 columns. Tailwind only
 * generates CSS for class names it finds as literal text, so each index
 * looks its pair up here instead of building it with a template string.
 * Three rows deep covers every group/subsection's own topic grid post
 * hierarchy-refactor — the deepest is 2 rows (Understanding, Key Findings).
 * Loft's App Evolution features each get their own `GroupBody` call now
 * (via `subsections`), so they no longer need one shared, deeper grid.
 */
const TOPIC_POSITION_CLASSES = [
  "md:col-start-2 md:row-start-1",
  "md:col-start-4 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "md:col-start-4 md:row-start-2",
  "md:col-start-2 md:row-start-3",
  "md:col-start-4 md:row-start-3",
];

/** Same pairing, shifted one column right — for a 2-column (`wideLabel`) title. */
const WIDE_TOPIC_POSITION_CLASSES = [
  "md:col-start-3 md:row-start-1",
  "md:col-start-5 md:row-start-1",
  "md:col-start-3 md:row-start-2",
  "md:col-start-5 md:row-start-2",
  "md:col-start-3 md:row-start-3",
  "md:col-start-5 md:row-start-3",
];

/** `miniGridInline`'s first row, beside a 2-column title — Loft's
 *  "Research Process": Plan/Recruit/Document/Iterate at columns 3/4/5/6,
 *  confirmed via get_metadata (all four share `row-5` with the title). */
const MINI_GRID_INLINE_COL_CLASSES = ["md:col-start-3", "md:col-start-4", "md:col-start-5", "md:col-start-6"];

/** `miniGridCompact`'s 2-column pack at col3-4, one row per array row —
 *  Third-party Claims' "Interview Findings" 2x2 (Anguish/Frustration on
 *  row 1, Anxiety/Mistrust on row 2), confirmed via get_metadata on node
 *  145:17868. Only 2 columns per row is meaningful here (col5-6 is the
 *  quote beside it); a 3rd column would have nowhere to go. */
const MINI_GRID_COMPACT_COL_CLASSES = ["md:col-start-3", "md:col-start-4"];
const MINI_GRID_COMPACT_ROW_CLASSES = ["md:row-start-1", "md:row-start-2", "md:row-start-3"];

/** `flushStacked`'s wideImage/wideEmbed width — Contract's "Adding an
 *  attachment" measures 4 columns (656px, the `aspect-[656/707.5]` crop
 *  below is sized for that), but Third-party Claims' "Content Mapping"
 *  (a subsection, not a top-level childGroup) measures 3 columns (484px)
 *  on the same asset shape, confirmed via get_design_context
 *  (`col-[3/span_3]`, not `span_4`). Defaults to 4 so Contract's own
 *  measurement stays exact without passing anything. */
const WIDE_SPAN_CLASSES = { 3: "md:col-span-3", 4: "md:col-span-4" } as const;

type Topics = CaseStudyGroup["topics"];
type MiniGrid = NonNullable<CaseStudyGroup["miniGrid"]>;

/** One miniGrid column's content — title, optional tag/border, body or list. */
function MiniGridColumn({ column, className }: { column: MiniGrid[number][number]; className: string }) {
  return (
    <div className={`flex flex-col gap-2 ${column.tag ? "border-2 border-accent p-3" : ""} ${className}`}>
      {column.tag && (
        <span className="w-fit bg-accent px-1.5 py-0.5 font-sans text-meta font-bold text-surface">
          {column.tag}
        </span>
      )}
      <h4 className="font-sans text-heading-3 text-ink">{column.title}</h4>
      {column.body && <p className="font-sans text-body text-ink">{column.body}</p>}
      {column.list && (
        <ul className="flex flex-col gap-2 font-sans text-body text-ink">
          {column.list.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-muted">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * A reserved slot for a live prototype: the real thing once `embed.src`
 * is handed off, a same-sized placeholder with the caption already in
 * place until then — never a fabricated src.
 */
function EmbedSlot({ embed, topMargin }: { embed: NonNullable<Topics[number]["embed"]>; topMargin: boolean }) {
  const marginClass = topMargin ? "mt-2" : "";
  if (embed.src) {
    return (
      <figure className={`flex flex-col gap-2 ${marginClass}`}>
        <EmbedFrame src={embed.src} title={embed.title} device={embed.device} />
        <figcaption className="font-sans text-caption text-muted">{embed.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure className={`flex flex-col gap-2 ${marginClass}`}>
      <div className="flex aspect-[311/630] w-full items-center justify-center bg-placeholder p-6 text-center">
        <p className="font-sans text-caption text-muted">Prototype embed pending</p>
      </div>
      <figcaption className="font-sans text-caption text-muted">{embed.caption}</figcaption>
    </figure>
  );
}

/** Body/list/stacked-items/link/stats/image/embed — everything below a
 *  topic's own title, shared by `Topic` (the normal grid-cell layout) and
 *  `flushStacked`'s single flush-left column, so a field like `stats` or
 *  `image` works the same in either place instead of only being handled
 *  in one of the two topic renderers. */
function TopicContent({ topic }: { topic: Topics[number] }) {
  const hasLeadContent = !!(topic.title || topic.tag || topic.body || topic.list || topic.items || topic.link || topic.stats);
  return (
    <>
      {(topic.body || topic.list || topic.items || topic.link) && (
        <div className="flex flex-col gap-2 font-sans text-body text-ink">
          {topic.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          {topic.list &&
            (topic.listTwoColumn ? (
              <div className="flex flex-col gap-2">
                {topic.listLabel && <p className="font-medium">{topic.listLabel}</p>}
                {/* Two independent columns (not a grid) so a wrapped item
                    only pushes down items below it in its OWN column —
                    a shared grid row would size both cells to the taller
                    one, leaving a gap under the shorter neighbor. */}
                <div className="flex gap-x-6">
                  {[0, 1].map((col) => (
                    <ul key={col} className="flex flex-1 flex-col gap-2">
                      {topic.list!
                        .filter((_, idx) => idx % 2 === col)
                        .map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden className="text-muted">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                    </ul>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {topic.listLabel && <p className="font-medium">{topic.listLabel}</p>}
                <ul className={`flex flex-col gap-2 ${topic.listBoxed ? "bg-lightergrey p-4" : ""}`}>
                  {topic.list.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-muted">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {topic.items && (
            <div className="flex flex-col gap-4">
              {topic.items.map((item) => (
                <div key={item.title} className="flex flex-col gap-1">
                  <h5 className="font-sans text-nav font-medium text-ink">{item.title}</h5>
                  {item.body && <p>{item.body}</p>}
                  {item.list && (
                    <ul className="flex flex-col gap-2">
                      {item.list.map((entry) => (
                        <li key={entry} className="flex gap-2">
                          <span aria-hidden className="text-muted">
                            •
                          </span>
                          <span>{entry}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {topic.link && (
            <a
              href={topic.link.href}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-caption text-accent underline transition-colors duration-400 ease-in-out hover:text-ink hover:no-underline"
            >
              {topic.link.label}
            </a>
          )}
        </div>
      )}

      {topic.stats && <StatsGrid stats={topic.stats} />}

      {topic.image && (
        <figure
          className={`flex flex-col gap-2 ${hasLeadContent ? "mt-2" : ""} ${topic.image.background ? "bg-placeholder p-4" : ""}`}
        >
          <Image
            src={assetPath(topic.image.src)}
            alt={topic.image.alt}
            width={topic.image.width}
            height={topic.image.height}
            className="h-auto w-full"
          />
          {topic.image.caption && (
            <figcaption className="font-sans text-caption text-muted">{topic.image.caption}</figcaption>
          )}
        </figure>
      )}

      {topic.embed && <EmbedSlot embed={topic.embed} topMargin={hasLeadContent} />}
    </>
  );
}

/** Renders one topic's card — title/tag, body, list, stacked items, a
 *  link, stats, image, or embed slot — at the given grid position. */
function Topic({ topic, i, positionClass }: { topic: Topics[number]; i: number; positionClass: string }) {
  return (
    <div
      // Index-prefixed: two topics can legitimately share a title
      // (see Loft's Key Findings, where that itself may be a content
      // slip worth double-checking — title alone isn't a safe key).
      key={`${i}-${topic.title ?? ""}`}
      className={`flex flex-col gap-3 md:col-span-2 ${positionClass} ${topic.tag ? "relative -m-[14px] border-2 border-accent bg-accent/[0.07] p-3" : ""}`}
    >
        {topic.tag && (
          <span className="absolute -top-[11px] right-3 w-fit bg-accent px-1.5 py-0.5 font-sans text-meta font-bold text-surface">
            {topic.tag}
          </span>
        )}
        {topic.title && <h4 className="font-sans text-heading-3 text-ink">{topic.title}</h4>}
        <TopicContent topic={topic} />
      </div>
  );
}

/**
 * One title + topics + miniGrid + flows + links + embed block — the full
 * body of a group, reused as-is for a group's own content and for each of
 * its `subsections` (Loft's "Insights" chapter packs four of these —
 * Interview & Usability Test, Research Process, Key Findings, A/B Test —
 * tightly under one shared `topLabel`).
 */
function GroupBody({
  title,
  titleLink,
  wideLabel,
  narrowLabel,
  contentOffset3,
  intro,
  topics,
  miniGrid,
  miniGridInline,
  miniGridCompact,
  imageColumns,
  flows,
  links,
  embed,
  flushStacked,
  wideImage,
  wideEmbed,
  wideImageSpan,
  flushCaption,
  quote,
}: {
  title: string;
  /** A link under the title, e.g. "View prototype" — Loft's App Evolution "User Setup". */
  titleLink?: { label: string; href: string };
  wideLabel?: boolean;
  /** Keep the title at the narrow 1-column width even when `wideLabel` is
   *  set on the parent group — see the note on `subsections[].narrowLabel`. */
  narrowLabel?: boolean;
  /** Topics start at column 3 (leaving column 2 as a gap) even though the
   *  title itself only spans column 1 — Contract's "New process", confirmed
   *  via get_design_context (`col-[3/span_2]`/`col-[5/span_2]` beside a
   *  plain `col-1` title). Independent of `wideLabel`, which is about the
   *  title's own width, not where content starts. */
  contentOffset3?: boolean;
  intro?: string;
  topics: Topics;
  miniGrid?: MiniGrid;
  /** See the note on `subsections[].miniGridInline` in the type. */
  miniGridInline?: boolean;
  /** See the note on `subsections[].miniGridCompact` in the type. */
  miniGridCompact?: boolean;
  imageColumns?: CaseStudyGroup["imageColumns"];
  flows?: CaseStudyFlow[];
  links?: CaseStudyGroup["links"];
  embed?: CaseStudyGroup["embed"];
  flushStacked?: boolean;
  wideImage?: CaseStudyGroup["wideImage"];
  wideEmbed?: CaseStudyGroup["wideEmbed"];
  /** See the note on `WIDE_SPAN_CLASSES`. Defaults to 4 (Contract's own measurement). */
  wideImageSpan?: 3 | 4;
  flushCaption?: string;
  quote?: { text: string; attribution: string };
}) {
  if (flushStacked) {
    return (
      <section className="grid grid-cols-1 gap-y-10 md:grid-cols-[repeat(6,minmax(0,1fr))] md:gap-x-8 md:pr-content">
        <div className="flex flex-col gap-10 md:col-span-2 md:col-start-1">
          {topics.map((topic, i) => (
            <div key={`${i}-${topic.title ?? ""}`} className="flex flex-col gap-3">
              {topic.title && <h4 className="font-sans text-title text-ink">{topic.title}</h4>}
              <TopicContent topic={topic} />
            </div>
          ))}

          {/* Pushed to the bottom of this column via the flex column's
              own extra space, not attached under the image — confirmed
              via get_design_context (`justify-end` in the text column, a
              sibling of the two topic blocks above, not of the image). */}
          {flushCaption && (
            <p className="mt-auto font-sans text-caption text-muted">{flushCaption}</p>
          )}
        </div>

        {wideEmbed ? (
          <div className={`${WIDE_SPAN_CLASSES[wideImageSpan ?? 4]} md:col-start-3 md:row-start-1`}>
            <EmbedFrame src={wideEmbed.src} title={wideEmbed.title} />
          </div>
        ) : (
          wideImage && (
            <figure
              className={`flex flex-col gap-2 ${WIDE_SPAN_CLASSES[wideImageSpan ?? 4]} md:col-start-3 md:row-start-1`}
            >
              {/* Figma crops this one to fill its column (object-cover), not
                  the image's own natural aspect ratio — confirmed via
                  get_metadata (the source image is wider than its frame and
                  offset negative-x, i.e. cropped, not letterboxed). */}
              <div className="px-14">
                <div className="relative aspect-[656/707.5] w-full overflow-hidden">
                  <Image src={assetPath(wideImage.src)} alt={wideImage.alt} fill className="object-cover" />
                </div>
              </div>
            </figure>
          )
        )}
      </section>
    );
  }
  // Always the same true 6-equal-column grid — see the note on
  // TOPIC_POSITION_CLASSES above. Never a differently-sized first
  // ("auto"/clamp/fixed-px) label track: that's what let a long title like
  // "Business Opportunities" blow the row's layout out.
  const gridColsClass = "md:grid-cols-[repeat(6,minmax(0,1fr))]";
  const basePositions = wideLabel || contentOffset3 ? WIDE_TOPIC_POSITION_CLASSES : TOPIC_POSITION_CLASSES;
  const topicPositions = intro ? basePositions.slice(2) : basePositions;
  // Skip the grid section entirely when it would render nothing but the
  // empty label column, the flows-only case (Third-party Claims'
  // Customer Journey subsection: no title, no topics, just a diagram) —
  // same reasoning as SolutionGroup's own skip for an empty main
  // GroupBody call. Left unskipped, it's a zero-height flex child that
  // still costs a full `gap-12` before the flows figure right after it.
  const hasSectionContent = Boolean(
    title || titleLink || topics.length > 0 || miniGrid || quote || imageColumns || links || embed,
  );

  return (
    <div className="flex flex-col gap-12">
      {hasSectionContent && (
        <section className={`grid grid-cols-1 gap-y-10 ${gridColsClass} md:gap-x-8 md:pr-content`}>
        <div
          className={`flex flex-col gap-1 max-md:-mb-7 md:col-start-1 md:row-start-1 ${wideLabel && !narrowLabel ? "md:col-span-2" : "md:col-span-1"}`}
        >
          {title && <h3 className="font-sans text-title text-ink">{title}</h3>}
          {titleLink && (
            <a
              href={titleLink.href}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-caption text-accent underline transition-colors duration-400 ease-in-out hover:text-ink hover:no-underline"
            >
              {titleLink.label}
            </a>
          )}
        </div>

        {intro && (
          <p className="font-sans text-nav text-ink md:col-span-3 md:col-start-2 md:row-start-1">{intro}</p>
        )}

        {topics.map((topic, i) => (
          <Topic
            key={`${i}-${topic.title ?? ""}`}
            topic={topic}
            i={i}
            positionClass={gridPositionClass(topicPositions, i, "topics")}
          />
        ))}

        {miniGrid?.map((row, r) =>
          miniGridCompact ? (
            // Packed into col3-4, one array row per grid row, so a
            // `quote` can sit beside it at col5-6 — same `display:
            // contents` trick `miniGridInline` uses, just 2 columns wide
            // and row-aware instead of 4-across in row 1 only.
            <div key={r} className="contents">
              {row.map((column, c) => (
                <MiniGridColumn
                  key={column.title}
                  column={column}
                  className={`${gridPositionClass(MINI_GRID_COMPACT_ROW_CLASSES, r, "miniGridCompact row")} ${gridPositionClass(MINI_GRID_COMPACT_COL_CLASSES, c, "miniGridCompact col")}`}
                />
              ))}
            </div>
          ) : miniGridInline && r === 0 ? (
            // Beside the title, same row — "Research Process": the
            // wrapper is `display: contents` so each column becomes a
            // direct child of the section's own grid instead of a
            // nested flex row, letting it sit at col-start-1's row.
            <div key={r} className="contents">
              {row.map((column, c) => (
                <MiniGridColumn
                  key={column.title}
                  column={column}
                  className={`md:row-start-1 ${gridPositionClass(MINI_GRID_INLINE_COL_CLASSES, c, "miniGridInline")}`}
                />
              ))}
            </div>
          ) : (
            <div key={r} className="flex flex-col gap-6 sm:flex-row sm:gap-8 md:col-span-6 md:col-start-1">
              {row.map((column) => (
                <MiniGridColumn key={column.title} column={column} className="flex-1" />
              ))}
            </div>
          ),
        )}

        {quote && (
          <figure
            className={
              miniGridCompact
                ? "relative isolate flex flex-col gap-3 md:col-span-2 md:col-start-5 md:row-start-1 md:row-span-2"
                : "relative isolate flex flex-col gap-3 md:col-span-4 md:col-start-3"
            }
          >
            {/* Absolutely positioned so it floats above-left of the text
                instead of taking up its own row in the flex flow —
                matches Figma's own technique on node 148:19368
                (`top-[-13.79px] left-[-15px]`, absolute, not a margin
                push or a normal-flow sibling). Sits behind the text
                (-z-10 vs the text's own relative z-0 stacking context). */}
            <div className="absolute -top-3.5 -left-[15px] -z-10">
              <Image aria-hidden src={assetPath("/images/about/quote.svg")} alt="" width={45} height={39}/>
            </div>
            <p className="relative font-sans text-title text-ink">{quote.text}</p>
            <figcaption className="relative font-sans text-caption text-muted">
              <span aria-hidden>— </span>
              {quote.attribution}
            </figcaption>
          </figure>
        )}

        {imageColumns && (
          <div className="flex flex-col gap-8 sm:flex-row md:col-span-6 md:col-start-1">
            {imageColumns.map((column, c) => (
              <div key={c} className="flex flex-1 flex-col gap-8">
                {column.map((img) => (
                  <figure key={img.src} className="flex w-full flex-col gap-2">
                    <div className={img.background ? "w-full bg-placeholder pt-6 px-6" : "w-full"}>
                      {img.crop ? (
                        <div className="relative aspect-[436/270] w-full overflow-hidden">
                          <Image src={assetPath(img.src)} alt={img.alt} fill className="object-cover" />
                        </div>
                      ) : (
                        <Image
                          src={assetPath(img.src)}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          className="h-auto w-full"
                        />
                      )}
                    </div>
                    {img.caption && (
                      <figcaption className="font-sans text-caption text-muted">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        )}

        {links && (
          <ul className="flex flex-col gap-2 md:col-span-4 md:col-start-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-body text-accent underline underline-offset-2 transition-colors duration-400 ease-in-out hover:text-ink hover:no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {embed && (
          <figure className="flex flex-col gap-3 md:col-span-3 md:col-start-4 md:row-start-1">
            <EmbedFrame src={embed.src} title={embed.title} />
            <figcaption className="font-sans text-caption text-muted">{embed.caption}</figcaption>
          </figure>
        )}
        </section>
      )}

      {flows?.map((flow) => <FlowDiagram key={flow.src} flow={flow} />)}
    </div>
  );
}

export function SolutionGroup({ group }: { group: CaseStudyGroup }) {
  // The child↔child ("filha") rhythm: 64px at the 1440px desktop width,
  // scaling down proportionally (not a hard breakpoint jump) to a 36px
  // floor — same `clamp()` approach as the page's own 72px mãe↔mãe rhythm
  // in work/[slug]/page.tsx, and the matching duplicate there for a
  // section's own `childGroups`. 4.444vw is 64/1440*100, so this still
  // lands exactly on 64px at that width.
  return (
    <div className="flex flex-col gap-[clamp(36px,4.444vw,64px)]">
      {group.topLabel && <h2 className="font-sans text-heading-2 text-ink -mb-6 md:-mb-10">{group.topLabel}</h2>}

      {group.highlightEmbed && <PrototypeHighlight title={group.title} embed={group.highlightEmbed} />}

      {/* Skip the main GroupBody call entirely when it would render nothing,
          Third-party Claims' "Understanding", whose topLabel and
          subsections carry the whole group, with no title/topics/flows of
          its own. Rendering it anyway leaves a zero-height flex child that
          still costs a full gap on each side (the h2's own -mb-10 only
          cancels the FIRST of those two), nearly doubling the visible space
          before the first subsection. Solution, by contrast, DOES have
          content here (its own `flows`), so it still needs to render. */}
      {(group.title ||
        group.topics.length > 0 ||
        group.flows?.length ||
        group.miniGrid ||
        group.imageColumns ||
        group.embed ||
        group.wideImage ||
        group.wideEmbed ||
        group.links?.length) &&
        !group.titleAboveCarousel &&
        !group.highlightEmbed && (
        <GroupBody
          title={group.title}
          wideLabel={group.wideLabel}
          contentOffset3={group.contentOffset3}
          intro={group.intro}
          topics={group.topics}
          miniGrid={group.miniGrid}
          imageColumns={group.imageColumns}
          flows={group.flows}
          links={group.links}
          embed={group.embed}
          flushStacked={group.flushStacked}
          wideImage={group.wideImage}
          wideEmbed={group.wideEmbed}
          wideImageSpan={group.wideImageSpan}
          flushCaption={group.flushCaption}
        />
      )}

      {/* Loft's "Insights" chapter: several more title+content blocks packed
          tightly (64px, confirmed via get_metadata — the tallest column's
          bottom edge to the next chapter's title, consistently, at every
          boundary in node 97:13056) under the same "Insights" topLabel
          above, not the page's normal 72px rhythm — see `subsections` on
          the type. */}
      {group.subsections?.map((subsection) =>
        subsection.highlightEmbed ? (
          <PrototypeHighlight
            key={subsection.title}
            title={subsection.title}
            embed={subsection.highlightEmbed}
          />
        ) : (
          <GroupBody
            key={subsection.title}
            title={subsection.title}
            titleLink={subsection.link}
            wideLabel={group.wideLabel}
            narrowLabel={subsection.narrowLabel}
            contentOffset3={subsection.contentOffset3}
            topics={subsection.topics ?? []}
            miniGrid={subsection.miniGrid}
            miniGridInline={subsection.miniGridInline}
            miniGridCompact={subsection.miniGridCompact}
            flows={subsection.flows}
            quote={subsection.quote}
            flushStacked={subsection.flushStacked}
            wideImage={subsection.wideImage}
            wideEmbed={subsection.wideEmbed}
            wideImageSpan={subsection.wideImageSpan}
            flushCaption={subsection.flushCaption}
          />
        ),
      )}

      {group.carousel && (
        <Carousel slides={group.carousel} title={group.titleAboveCarousel ? group.title : undefined} />
      )}
    </div>
  );
}
