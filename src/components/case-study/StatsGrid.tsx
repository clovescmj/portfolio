import type { StatsBlock } from "@/types/case-study";

/**
 * The "Big Number Block" pattern: pairs of stat items stacked in two
 * columns on a tinted background — Loft's Understanding "Usage Data"
 * numbers, Impact's "Product" results. Two columns of two (not one row of
 * four): each column is its own "Big Number Block" in the Figma file, so
 * row height syncs within a column, not across all four items. Each
 * item's caption is optional (a plain value+label pair, like Impact's
 * "Top 10 / Downloaded apps", doesn't always need one).
 */
export function StatsGrid({ stats }: { stats: StatsBlock }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 bg-lightergrey p-4 sm:grid-cols-2">
      {stats.items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <p className="font-sans text-h2 text-ink">{item.value}</p>
          <p className="font-sans text-h5 text-ink">{item.label}</p>
          {item.caption && <p className="font-sans text-caption text-ink">{item.caption}</p>}
        </div>
      ))}
    </div>
  );
}
