/**
 * The title/meta block and the intro paragraphs share one 6-column grid
 * (matches the Figma "Header Row" node exactly): title+meta take columns
 * 1-2, column 3 sits empty as a gutter, and the intro takes columns 4-6.
 */
export function CaseStudyIntro({
  title,
  client,
  tags,
  paragraphs,
}: {
  title: string;
  client: string;
  tags: string[];
  paragraphs: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-x-gutter md:gap-y-10 md:pr-content">
      <div className="flex flex-col gap-6 md:col-span-2 md:col-start-1 md:max-lg:col-span-6">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-caption text-muted">Case study</p>
          <h1 className="break-words font-sans text-page-title text-ink md:max-lg:text-[40px]">{title}</h1>
        </div>
        <p className="font-sans text-caption text-ink">
          <span className="font-bold">{client}</span> | {tags.join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-2 font-sans text-body text-ink md:col-span-3 md:col-start-4 md:max-lg:col-span-6 md:max-lg:col-start-1">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
