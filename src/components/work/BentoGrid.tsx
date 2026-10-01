import type { WorkEntry } from "@/types/work";
import { WorkCard } from "./WorkCard";

/**
 * Two side-by-side stacks on desktop (see `ProjectLayout`). Below md the stack
 * wrappers are `display: contents`, so cards fall into one column and each
 * takes its position from its index in `entries` (`--card-order`).
 */
export function BentoGrid({ entries }: { entries: WorkEntry[] }) {
  return (
    <div className="flex flex-col gap-y-12 md:grid md:grid-cols-6 md:gap-x-gutter">
      {(["left", "right"] as const).map((column) => (
        <div
          key={column}
          className={`contents md:grid md:grid-cols-3 md:content-start md:gap-x-gutter ${column === "left" ? "md:col-start-1" : "md:col-start-4"} md:col-span-3`}
        >
          {entries.map((entry, index) =>
            entry.card.layout.column === column ? (
              <WorkCard key={entry.slug} entry={entry} order={index} priority={index === 0} />
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
}
