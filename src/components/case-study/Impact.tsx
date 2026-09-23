import type { FeatureBlock, LabeledList, StatsBlock } from "@/types/case-study";
import { StatsGrid } from "./StatsGrid";

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
        className={`flex flex-col gap-3 md:col-span-2 md:row-start-2 ${LIST_POSITION_CLASSES[i] ?? ""}`}
      >
        {list.label && <h3 className="font-sans text-heading-3 text-ink">{list.label}</h3>}
        <ol className="flex flex-col gap-2 font-sans text-body text-ink">
          {list.items.map((item, j) => (
            <li key={item} className="flex gap-3">
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
 */
function ImpactGroups({ groups }: { groups: { label: string; stats?: StatsBlock; topics?: FeatureBlock[] }[] }) {
  return (
    <div className="flex flex-col gap-12 md:col-span-4 md:col-start-3 md:row-start-2">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-4">
          <h3 className="font-sans text-heading-3 text-ink">{group.label}</h3>
          {group.stats && <StatsGrid stats={group.stats} />}
          {group.topics && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8">
              {group.topics.map((topic) => (
                <div key={topic.title} className="flex flex-col gap-1">
                  <h4 className="font-sans text-nav font-medium text-ink">{topic.title}</h4>
                  {topic.body?.map((paragraph) => (
                    <p key={paragraph} className="font-sans text-body text-ink">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
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
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(6,minmax(0,1fr))] md:gap-x-8 md:gap-y-6 md:pr-content">
      <h2 className="font-sans text-heading-2 text-ink md:col-span-1 md:col-start-1 md:row-start-1">
        Impact
      </h2>

      {intro && <p className="font-sans text-nav text-ink md:col-span-2 md:col-start-3 md:row-start-1">{intro}</p>}

      {lists && <NumberedLists lists={lists} />}
      {groups && <ImpactGroups groups={groups} />}
    </section>
  );
}
