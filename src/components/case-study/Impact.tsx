import { Fragment } from "react";
import { gridPositionClass } from "@/lib/grid-position";
import type { FeatureBlock, LabeledList, StatsBlock } from "@/types/case-study";
import { StatsGrid } from "./StatsGrid";
import { Heading } from "@/components/ui/Heading";
import { headingId } from "@/lib/heading-id";

/**
 * Column position per list, two per row on desktop — same col3/col5
 * rhythm the original two-column version used.
 */
const LIST_POSITION_CLASSES = ["md:col-start-3", "md:col-start-5"];

/**
 * When every list is unlabeled (Contract's case: one list, meant to read
 * as a single numbered sequence split into two uneven columns for
 * layout), numbering runs continuously across all of them and mobile
 * flows them as one seamless list via `md:contents` — see the note on
 * that trick further down. When any list has a label ("Results",
 * "Process"), each list is its own visually distinct column with its own
 * heading, numbered from 1 independently, and mobile just stacks them
 * normally since the headings already read as breaks.
 */
function NumberedLists({ lists }: { lists: LabeledList[] }) {
  const continuous = lists.every((list) => !list.label);

  const columns = lists.map((list, i) => {
    const startAt = continuous ? lists.slice(0, i).reduce((sum, l) => sum + l.items.length, 0) : 0;

    return (
      <div
        key={list.label ?? i}
        className={`flex flex-col gap-3 md:col-span-2 md:row-start-2 ${gridPositionClass(LIST_POSITION_CLASSES, i, "impact list")}`}
      >
        {list.label && <Heading level={3} variant="h4">{list.label}</Heading>}
        <ol className="flex flex-col gap-2 font-sans text-body text-ink">
          {list.items.map((item, j) => (
            <li key={item} className="flex gap-2">
              <span className="font-medium">{startAt + j + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  });

  return continuous ? (
    // One continuous flow on mobile (same gap-2 between every item,
    // including across the column split) — `md:contents` drops this
    // wrapper from layout at md so the columns above go back to being
    // direct grid children, positioned by their own classes.
    <div className="flex flex-col gap-2 md:contents">{columns}</div>
  ) : (
    columns
  );
}

/**
 * Loft's shape: labeled sub-blocks ("Product", "Process"), each either a
 * stats grid or a plain topic grid (heading + one-sentence body, no
 * numbering) — unlike Contract's numbered results, these read as
 * dimensions of the outcome, not a ranked sequence.
 *
 * Each label ("Product"/"Process") sits in column 1 (spanning 2, at
 * text-h3/23px — Figma's real "Heading 3" style, not the 17px token
 * this project confusingly also calls text-h4), beside its own
 * content at column 3, same row — not stacked above it. Confirmed via
 * get_metadata/get_design_context on node 111:11952: both labels are
 * `col-[1/span_2]` at `text-[23px]`, their content `col-[3/...]` on the
 * same `row-N`. No explicit row numbers are needed here: every item below
 * specifies only its column, so CSS Grid's own auto-placement finds each
 * one's row — the label auto-flows into the first row with column 1 free,
 * and content pinned to column 3 (or 5) auto-flows into the first row
 * where THAT column is free, which is always the label's own row (until
 * it fills up, at which point a topic naturally wraps to the next row,
 * the same mechanism SolutionGroup's 2-per-row topics rely on).
 */
function ImpactGroups({ groups }: { groups: { label: string; stats?: StatsBlock; topics?: FeatureBlock[] }[] }) {
  return (
    <>
      {groups.map((group, g) => (
        <Fragment key={group.label}>
          {/* The 16px spacer row between "Product" and "Process" — same
              "two row-gaps either side of a real row" trick as the page's
              dividers, netting the 64px chapter gap confirmed via
              get_metadata (Product's content bottom to "Process" top). */}
          {g > 0 && <div aria-hidden className="md:col-span-6 md:h-4" />}
          {group.label ? (
            <Heading level={3} variant="h3" className="md:col-span-2 md:col-start-1">
              {group.label}
            </Heading>
          ) : (
            // No label: keeps the empty row the label would have taken, so
            // the topics below stay where the layout has always put them.
            <div aria-hidden className="md:col-span-2 md:col-start-1" />
          )}
          {/* Topics render BEFORE stats in DOM (even though `stats` is the
              first prop) when both are present — CSS Grid's sparse
              auto-placement cursor only moves forward through columns as
              items are placed, so a later item requesting an EARLIER
              column than one already placed in the same auto-placement
              pass gets pushed to the next row entirely instead of
              backfilling the gap. Topics sit at col3-4, stats at col5-6
              (further right), so topics must be placed first or the
              cursor already advanced past column 4 by the time the
              browser gets to them. Confirmed via getBoundingClientRect:
              swapping this order was the fix, not adding back row-start. */}
          {group.topics?.map((topic, i) => (
            <div key={topic.title} className={`flex flex-col gap-3 md:col-span-2 ${LIST_POSITION_CLASSES[i % 2]}`}>
              <Heading level={group.label ? 4 : 3} variant="h5">{topic.title}</Heading>
              {topic.body?.map((paragraph) => (
                <p key={paragraph} className="font-sans text-body text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          {/* Full 4-column width when stats are the only content in the row
              (Loft's "Product") — narrowed to 2 columns, beside the topic
              at col-start-3, when a group has both (Third-party Claims'
              single-paragraph result + its 40% stat, side by side). */}
          {group.stats && (
            <div
              className={
                group.topics?.length
                  ? "md:col-span-2 md:col-start-5"
                  : "md:col-span-4 md:col-start-3"
              }
            >
              <StatsGrid stats={group.stats} />
            </div>
          )}
        </Fragment>
      ))}
    </>
  );
}

export function Impact({
  intro,
  lists,
  groups,
}: {
  intro?: string;
  lists?: LabeledList[];
  groups?: { label: string; stats?: StatsBlock; topics?: FeatureBlock[] }[];
}) {
  if (lists && groups && process.env.NODE_ENV !== "production") {
    console.warn("Impact: both `lists` and `groups` are set — only one is meant to render at a time.");
  }
  return (
    <section
      aria-labelledby={headingId("Impact")}
      className="page-grid gap-y-3 md:gap-y-6 md:pr-content"
    >
      <Heading level={2} variant="h2" id={headingId("Impact")} className="md:col-span-1 md:col-start-1 md:row-start-1">
        Impact
      </Heading>

      {intro && <p className="font-sans text-nav text-ink md:col-span-2 md:col-start-3 md:row-start-1">{intro}</p>}

      {lists && <NumberedLists lists={lists} />}
      {groups && <ImpactGroups groups={groups} />}
    </section>
  );
}
