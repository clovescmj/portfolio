import { Heading, type HeadingLevel, type HeadingVariant } from "@/components/ui/Heading";
import type { SubItem } from "@/types/case-study";

/**
 * A list of titled sub-items (Problem's blocks, a topic's own items): each
 * `<li>` is a title plus its optional body paragraph and bullet list, with
 * the shared `gap-title` between the title and its own text. A real `<ul>`
 * with a plain flex `gap-8` between items, not margin-bottom on all but the
 * last — flex `gap` already never adds trailing space after the final one.
 * Shared by `ColumnsSection` and `Subsection` so the two didn't drift into
 * two different spacings for what's the same `SubItem` shape either way.
 */
export function SubItemList({
  items,
  level,
  variant,
}: {
  items: SubItem[];
  level: HeadingLevel;
  variant: HeadingVariant;
}) {
  return (
    <ul className="flex flex-col gap-8 font-sans text-body text-ink">
      {items.map((item) => (
        <li key={item.title} className="flex flex-col gap-title">
          <Heading level={level} variant={variant}>
            {item.title}
          </Heading>
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
        </li>
      ))}
    </ul>
  );
}
