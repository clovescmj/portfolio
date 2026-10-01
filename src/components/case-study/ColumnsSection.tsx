import type { ColumnsSection as ColumnsSectionData, LabeledColumn } from "@/types/case-study";
import { StatsGrid } from "./StatsGrid";
import { SubItemList } from "./SubItemList";
import { SubsectionView } from "./Subsection";
import { Grid6 } from "@/components/ui/Grid6";
import { Heading } from "@/components/ui/Heading";
import { headingId } from "@/lib/heading-id";

/**
 * One body column (col 3-4 or col 5-6). When NEITHER column in the pair has
 * its own heading (Problem: both are flat `items` blocks), this renders as
 * one plain cell, auto-placed in the same row as the label — identical to
 * a single-row section, no grid tricks needed.
 *
 * When EITHER column has a `heading`/`paragraphs` lead-in (My Role: one
 * column has "Main responsibilities", the other doesn't), both columns
 * split into two real grid rows instead — row 1 for the heading (present
 * or not), row 2 for the body. A column with no heading of its own simply
 * places nothing in row 1, so row 1's height is set by whichever sibling
 * DOES have one, and row 2 — every column's body — starts at the same Y
 * regardless. That's the grid algorithm doing the alignment, not a
 * duplicated invisible heading standing in for one.
 */
function Column({
  column,
  colStart,
  splitRows,
}: {
  column: LabeledColumn;
  colStart: 3 | 5;
  splitRows: boolean;
}) {
  const colClass = colStart === 3 ? "md:col-start-3" : "md:col-start-5";
  const hasOwnHeadingBlock = Boolean(column.heading || column.paragraphs);
  // A plain list right under `heading` (no stats/items between them) is
  // still part of that same title block, so it shares its gap-title
  // instead of the bigger inter-block rhythm below — "My Role"'s "Main
  // responsibilities" list, not a trailing list after a separate block.
  // Only merges in when NOT split into two grid rows: split mode needs
  // every column's list in row 2, aligned with its siblings', regardless
  // of which column has a heading.
  const listJoinsHeading = !splitRows && Boolean(column.list) && !column.stats && !column.items && hasOwnHeadingBlock;

  const headingBlock = hasOwnHeadingBlock && (
    <div className={`flex flex-col gap-title md:col-span-2 ${splitRows ? `md:row-start-1 ${colClass}` : ""}`}>
      {column.heading && <Heading level={3} variant="h4">{column.heading}</Heading>}
      {column.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {listJoinsHeading && (
        <ul className="flex flex-col gap-1">
          {column.list!.map((item) => (
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

  const bodyBlock = (
    <div
      className={`flex flex-col gap-6 font-sans text-body text-ink md:col-span-2 ${splitRows ? `md:row-start-2 ${colClass}` : ""}`}
    >
      {column.stats && <StatsGrid stats={column.stats} />}

      {column.items && <SubItemList items={column.items} level={3} variant="h4" />}

      {column.list && !listJoinsHeading &&
        (column.listBoxed ? (
          <ul className="flex flex-col gap-1 bg-lightergrey p-4">
            {column.list.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-muted">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col gap-1">
            {column.list.map((item) => (
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
  );

  if (!splitRows) {
    // Single cell, no row split — the common case where no column in the
    // pair has a heading, so there's nothing to align across two rows.
    return (
      <div className={`flex flex-col gap-6 md:col-span-2 ${colClass}`}>
        {headingBlock}
        {bodyBlock}
      </div>
    );
  }

  return (
    <>
      {headingBlock}
      {bodyBlock}
    </>
  );
}

/**
 * "Problem" / "Solution" / "Understanding": a heading in column 1, then two
 * body columns each spanning 2 of the shared 6 columns — at 3-4 and 5-6,
 * with column 2 deliberately left empty as a gap after the label (not
 * columns 2-3/4-5 immediately following it — confirmed via
 * get_design_context on Contract's own rows: `col-[3/span_2]` and
 * `col-[5/span_2]`, consistently, even though the label itself only spans
 * column 1). Each column can mix prose and a bullet list, optionally under
 * its own small heading (see LabeledColumn) — not every case study's
 * content is a flat list of paragraphs.
 */
export function ColumnsSection({ section }: { section: ColumnsSectionData }) {
  const { title, subtitle, columns, subsections } = section;
  const [colA, colB] = columns;
  // Only a real `heading` (a short label, like "Main responsibilities")
  // creates the asymmetry worth splitting rows over. Plain `paragraphs`
  // with no heading (Claims' Problem) are symmetric prose either way —
  // forcing the split there would just narrow a column for no reason.
  const splitRows = Boolean(colA.heading || colB.heading);

  return (
    <section aria-labelledby={headingId(title)} className="flex flex-col gap-subsection">
      <Grid6 rowGap="title" insetRight>
        <div
          className={`flex flex-col gap-title md:col-span-2 md:col-start-1 ${splitRows ? "md:row-start-1 md:row-span-2" : ""}`}
        >
          <Heading level={2} variant="h2" id={headingId(title)}>
            {title}
          </Heading>
          {subtitle && (
            <Heading level={3} variant="h5">
              {subtitle}
            </Heading>
          )}
        </div>
        <Column column={colA} colStart={3} splitRows={splitRows} />
        <Column column={colB} colStart={5} splitRows={splitRows} />
      </Grid6>
      {subsections?.map((subsection, i) => (
        <SubsectionView key={`${subsection.title ?? ""}-${i}`} subsection={subsection} />
      ))}
    </section>
  );
}
