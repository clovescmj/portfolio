import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { CaseStudyFlow, CaseStudyGroup } from "@/types/case-study";
import { Carousel } from "./Carousel";
import { EmbedFrame } from "./EmbedFrame";
import { FlowDiagram } from "./FlowDiagram";
import { StatsGrid } from "./StatsGrid";

/**
 * The site's shared grid, confirmed against Figma's own layout-grid overlay
 * (get_design_context reports `grid-cols-[repeat(6,minmax(0,1fr))]` on
 * every one of these rows): 6 EQUAL 140px columns with a 32px gutter over
 * the 1000px usable width (1056px row minus the 56px `pr-content` reserve),
 * not a differently-sized "label track + N content tracks" approximation.
 * A group's title takes 1 column (MVP, Release Plan, App Evolution — topics
 * then start at column 2) or 2 columns (Understanding, Business
 * Opportunities, My Role, Insights' subsections — topics start at column 3)
 * depending on Figma's own `col-[1/span_N]` on that title; see `wideLabel`.
 * Two topics per row either way, each spanning 2 columns. Tailwind only
 * generates CSS for class names it finds as literal text, so each index
 * looks its pair up here instead of building it with a template string.
 * Five rows deep — Loft's App Evolution needs all of them (intro row + one
 * row per feature: User Setup, Bottom Navigation, Home Feed, Property
 * Feedback).
 */
const TOPIC_POSITION_CLASSES = [
  "md:col-start-2 md:row-start-1",
  "md:col-start-4 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "md:col-start-4 md:row-start-2",
  "md:col-start-2 md:row-start-3",
  "md:col-start-4 md:row-start-3",
  "md:col-start-2 md:row-start-4",
  "md:col-start-4 md:row-start-4",
  "md:col-start-2 md:row-start-5",
  "md:col-start-4 md:row-start-5",
];

/** Same pairing, shifted one column right — for a 2-column (`wideLabel`) title. */
const WIDE_TOPIC_POSITION_CLASSES = [
  "md:col-start-3 md:row-start-1",
  "md:col-start-5 md:row-start-1",
  "md:col-start-3 md:row-start-2",
  "md:col-start-5 md:row-start-2",
  "md:col-start-3 md:row-start-3",
  "md:col-start-5 md:row-start-3",
  "md:col-start-3 md:row-start-4",
  "md:col-start-5 md:row-start-4",
  "md:col-start-3 md:row-start-5",
  "md:col-start-5 md:row-start-5",
];

/** `colLabel`'s own grid slot — column 1 (the group-title column), row-locked
 *  to its topic's row. Only the col-2 (even index) slots ever carry one. */
const COL_LABEL_POSITION_CLASSES = [
  "md:col-start-1 md:row-start-1",
  "",
  "md:col-start-1 md:row-start-2",
  "",
  "md:col-start-1 md:row-start-3",
  "",
  "md:col-start-1 md:row-start-4",
  "",
  "md:col-start-1 md:row-start-5",
  "",
];

type Topics = CaseStudyGroup["topics"];
type MiniGrid = NonNullable<CaseStudyGroup["miniGrid"]>;
type Flow = CaseStudyFlow & { afterTopic?: number; first?: boolean };

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
        <EmbedFrame src={embed.src} title={embed.title} />
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

/** Renders one topic's card — title/tag, body, list, stacked items, a
 *  link, stats, image, or embed slot — at the given grid position, plus
 *  its own `colLabel` in column 1 if it has one (Loft's App Evolution). */
function Topic({ topic, i, positionClass }: { topic: Topics[number]; i: number; positionClass: string }) {
  return (
    <>
      {topic.colLabel && (
        <div className={`hidden md:flex md:flex-col md:gap-1 ${COL_LABEL_POSITION_CLASSES[i] ?? ""}`}>
          <h4 className="font-sans text-title text-ink">{topic.colLabel}</h4>
          {topic.colLabelLink && (
            <a
              href={topic.colLabelLink.href}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-caption text-accent underline transition-colors duration-400 ease-in-out hover:text-ink hover:no-underline"
            >
              {topic.colLabelLink.label}
            </a>
          )}
        </div>
      )}
      <div
        // Index-prefixed: two topics can legitimately share a title
        // (see Loft's Key Findings, where that itself may be a content
        // slip worth double-checking — title alone isn't a safe key).
        key={`${i}-${topic.title ?? ""}`}
        className={`flex flex-col gap-3 md:col-span-2 ${positionClass} ${topic.tag ? "border-2 border-accent p-3" : ""}`}
      >
        {/* On mobile colLabel renders inline, same as a normal title, since there's no separate column-1 to place it in. */}
        {topic.colLabel && <h4 className="font-sans text-title text-ink md:hidden">{topic.colLabel}</h4>}
        {topic.tag && (
          <span className="w-fit bg-accent px-1.5 py-0.5 font-sans text-meta font-bold text-surface">
            {topic.tag}
          </span>
        )}
        {topic.title && <h4 className="font-sans text-heading-3 text-ink">{topic.title}</h4>}
        {(topic.body || topic.list || topic.items || topic.link) && (
        <div className="flex flex-col gap-2 font-sans text-body text-ink">
          {topic.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          {topic.list &&
            (topic.listTwoColumn ? (
              <div className="flex flex-col gap-2">
                {topic.listLabel && <p className="font-medium">{topic.listLabel}</p>}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {topic.list.map((item) => (
                    <div key={item} className="flex gap-2">
                      <span aria-hidden className="text-muted">
                        •
                      </span>
                      <span>{item}</span>
                    </div>
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
                    <ul className="flex flex-col gap-1">
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
            className={`flex flex-col gap-2 ${topic.title || topic.tag || topic.body || topic.list || topic.items || topic.link || topic.stats ? "mt-2" : ""} ${topic.image.background ? "bg-placeholder p-4" : ""}`}
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

        {topic.embed && (
          <EmbedSlot
            embed={topic.embed}
            topMargin={!!(topic.title || topic.tag || topic.body || topic.list || topic.items || topic.link || topic.stats)}
          />
        )}
      </div>
    </>
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
  wideLabel,
  contentOffset3,
  intro,
  topics,
  miniGrid,
  flows,
  links,
  embed,
  flushStacked,
  wideImage,
  wideEmbed,
  flushCaption,
}: {
  title: string;
  wideLabel?: boolean;
  /** Topics start at column 3 (leaving column 2 as a gap) even though the
   *  title itself only spans column 1 — Contract's "New process", confirmed
   *  via get_design_context (`col-[3/span_2]`/`col-[5/span_2]` beside a
   *  plain `col-1` title). Independent of `wideLabel`, which is about the
   *  title's own width, not where content starts. */
  contentOffset3?: boolean;
  intro?: string;
  topics: Topics;
  miniGrid?: MiniGrid;
  flows?: Flow[];
  links?: CaseStudyGroup["links"];
  embed?: CaseStudyGroup["embed"];
  flushStacked?: boolean;
  wideImage?: CaseStudyGroup["wideImage"];
  wideEmbed?: CaseStudyGroup["wideEmbed"];
  flushCaption?: string;
}) {
  if (flushStacked) {
    return (
      <section className="grid grid-cols-1 gap-y-10 md:grid-cols-[repeat(6,minmax(0,1fr))] md:gap-x-8 md:pr-content">
        <div className="flex flex-col gap-10 md:col-span-2 md:col-start-1">
          {topics.map((topic, i) => (
            <div key={`${i}-${topic.title ?? ""}`} className="flex flex-col gap-3">
              {topic.title && <h4 className="font-sans text-title text-ink">{topic.title}</h4>}
              <div className="flex flex-col gap-2 font-sans text-body text-ink">
                {topic.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {topic.list && (
                  <div className="flex flex-col gap-2">
                    {topic.listLabel && <p className="font-medium">{topic.listLabel}</p>}
                    <ul className="flex flex-col gap-2">
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
          <div className="md:col-span-4 md:col-start-3 md:row-start-1">
            <EmbedFrame src={wideEmbed.src} title={wideEmbed.title} />
          </div>
        ) : (
          wideImage && (
            <figure className="flex flex-col gap-2 md:col-span-4 md:col-start-3 md:row-start-1">
              {/* Figma crops this one to fill its column (object-cover), not
                  the image's own natural aspect ratio — confirmed via
                  get_metadata (the source image is wider than its frame and
                  offset negative-x, i.e. cropped, not letterboxed). */}
              <div className="relative aspect-[656/707.5] w-full overflow-hidden">
                <Image src={assetPath(wideImage.src)} alt={wideImage.alt} fill className="object-cover" />
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

  // Split the topic grid at each flow's `afterTopic` boundary, rendering
  // the flow full-width in between — Loft's App Evolution has two (after
  // User Setup, after Bottom Navigation's image).
  const allFlows = flows ?? [];
  const firstFlows = allFlows.filter((f) => f.first);
  const positionedFlows = allFlows.filter((f) => !f.first);
  const boundaries = [...new Set(positionedFlows.map((f) => f.afterTopic).filter((n): n is number => n !== undefined))].sort(
    (a, b) => a - b,
  );
  const segments: { topics: Topics; startIndex: number; flowsAfter: typeof positionedFlows }[] = [];
  let cursor = 0;
  for (const boundary of boundaries) {
    const end = boundary + 1;
    segments.push({
      topics: topics.slice(cursor, end),
      startIndex: cursor,
      flowsAfter: positionedFlows.filter((f) => f.afterTopic === boundary),
    });
    cursor = end;
  }
  if (cursor < topics.length || segments.length === 0) {
    segments.push({ topics: topics.slice(cursor), startIndex: cursor, flowsAfter: [] });
  }
  // Any flow with no afterTopic at all renders after everything, once.
  const trailingFlows = positionedFlows.filter((f) => f.afterTopic === undefined);

  return (
    <div className="flex flex-col gap-12">
      {firstFlows.map((flow) => (
        <FlowDiagram key={flow.src} flow={flow} />
      ))}

      {segments.map((segment, s) => (
        <div key={s} className="flex flex-col gap-12">
          <section className={`grid grid-cols-1 gap-y-10 ${gridColsClass} md:gap-x-8 md:pr-content`}>
            {s === 0 && (
              <h3
                className={`font-sans text-title text-ink max-md:-mb-7 md:col-start-1 md:row-start-1 ${wideLabel ? "md:col-span-2" : "md:col-span-1"}`}
              >
                {title}
              </h3>
            )}

            {s === 0 && intro && (
              <p className="font-sans text-nav text-ink md:col-span-3 md:col-start-2 md:row-start-1">{intro}</p>
            )}

            {segment.topics.map((topic, i) => (
              <Topic
                key={`${segment.startIndex + i}-${topic.title ?? ""}`}
                topic={topic}
                i={i}
                positionClass={(s === 0 ? topicPositions : basePositions)[i] ?? ""}
              />
            ))}

            {s === segments.length - 1 &&
              miniGrid?.map((row, r) => (
                <div key={r} className="flex flex-col gap-6 sm:flex-row sm:gap-8 md:col-span-6 md:col-start-1">
                  {row.map((column) => (
                    <div
                      key={column.title}
                      className={`flex flex-1 flex-col gap-2 ${column.tag ? "border-2 border-accent p-3" : ""}`}
                    >
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
                  ))}
                </div>
              ))}

            {s === segments.length - 1 && links && (
              <ul className="flex flex-col gap-2 md:col-span-4 md:col-start-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-heading-3 text-accent underline transition-colors duration-400 ease-in-out hover:text-ink hover:no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {s === 0 && embed && (
              <figure className="flex flex-col gap-3 md:col-span-3 md:col-start-4 md:row-start-1">
                <EmbedFrame src={embed.src} title={embed.title} />
                <figcaption className="font-sans text-caption text-muted">{embed.caption}</figcaption>
              </figure>
            )}
          </section>

          {segment.flowsAfter.map((flow) => (
            <FlowDiagram key={flow.src} flow={flow} />
          ))}
        </div>
      ))}

      {trailingFlows.map((flow) => (
        <FlowDiagram key={flow.src} flow={flow} />
      ))}
    </div>
  );
}

export function SolutionGroup({ group }: { group: CaseStudyGroup }) {
  return (
    <div className="flex flex-col gap-12">
      {group.topLabel && <h2 className="font-sans text-heading-2 text-ink -mb-6 md:-mb-4">{group.topLabel}</h2>}

      {/* Contract's "Contract and attachment template management": title only,
          rendered as the carousel's own header below — no col-1 label row of
          its own, nothing else in it. */}
      {!group.titleAboveCarousel && (
        <GroupBody
          title={group.title}
          wideLabel={group.wideLabel}
          contentOffset3={group.contentOffset3}
          intro={group.intro}
          topics={group.topics}
          miniGrid={group.miniGrid}
          flows={group.flows}
          links={group.links}
          embed={group.embed}
          flushStacked={group.flushStacked}
          wideImage={group.wideImage}
          wideEmbed={group.wideEmbed}
          flushCaption={group.flushCaption}
        />
      )}

      {/* Loft's "Insights" chapter: several more title+content blocks packed
          tightly (48px) under the same "Insights" topLabel above, not the
          page's normal 72px rhythm — see `subsections` on the type. */}
      {group.subsections?.map((subsection) => (
        <GroupBody
          key={subsection.title}
          title={subsection.title}
          wideLabel={group.wideLabel}
          topics={subsection.topics ?? []}
          miniGrid={subsection.miniGrid}
          flows={subsection.flows}
        />
      ))}

      {group.carousel && (
        <Carousel slides={group.carousel} title={group.titleAboveCarousel ? group.title : undefined} />
      )}
    </div>
  );
}
