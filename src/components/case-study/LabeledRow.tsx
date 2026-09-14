/**
 * "Problem" / "Solution": a heading in column 1, then two paragraph
 * columns each spanning 2 of the shared 6 columns (2-3 and 4-5) — column
 * 6 is intentionally left empty, matching the Figma row exactly.
 */
export function LabeledRow({ label, columns }: { label: string; columns: [string[], string[]] }) {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-10 md:gap-x-8 md:pr-content">
      <h2 className="font-sans text-heading-2 text-ink md:col-span-1 md:col-start-1">{label}</h2>
      <div className="flex flex-col gap-2 font-sans text-body text-ink md:col-span-2 md:col-start-2">
        {columns[0].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="flex flex-col gap-2 font-sans text-body text-ink md:col-span-2 md:col-start-4">
        {columns[1].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
