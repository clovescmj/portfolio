import type { LabeledColumn } from "@/types/case-study";
import { StatsGrid } from "./StatsGrid";

/**
 * Renders whichever pieces a column carries, in a fixed order: heading,
 * paragraphs, a stats block, stacked sub-items, a plain list. A column
 * mixing several (Loft's Understanding: a stats box stacked over three
 * findings) stacks them with the same gap as everything else — see
 * `SubItem` and `StatsBlock` on `LabeledColumn` for what each covers.
 */
function Column({ column }: { column: LabeledColumn }) {
  return (
    <div className="flex flex-col gap-6 font-sans text-body text-ink">
      <div className="flex flex-col gap-2">
        {column.heading && <h3 className="font-sans text-h3 text-ink">{column.heading}</h3>}
        {column.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {column.stats && <StatsGrid stats={column.stats} />}

      {column.items && (
        <div className="flex flex-col gap-4">
          {column.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-1">
              <h4 className="font-sans text-h4 text-ink">{item.title}</h4>
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

      {column.list &&
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
export function LabeledRow({
  label,
  sublabel,
  columns,
}: {
  label: string;
  sublabel?: string;
  columns: [LabeledColumn, LabeledColumn];
}) {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(6,minmax(0,1fr))] md:gap-10 md:gap-x-8 md:pr-content">
      <div className="flex flex-col gap-6 md:col-span-2 md:col-start-1">
        <h2 className="font-sans text-h1 text-ink">{label}</h2>
        {sublabel && <h3 className="font-sans text-h3 text-ink">{sublabel}</h3>}
      </div>
      <div className="md:col-span-2 md:col-start-3">
        <Column column={columns[0]} />
      </div>
      <div className="md:col-span-2 md:col-start-5">
        <Column column={columns[1]} />
      </div>
    </section>
  );
}
