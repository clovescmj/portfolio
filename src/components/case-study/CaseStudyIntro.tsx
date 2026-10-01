import { Heading } from "@/components/ui/Heading";

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
      {/* Full-width until `wide` (1440px, globals.css), the actual width
          this 2-column intro was designed at: col-span-2 is only ~312px
          there, and a fluid h1 keeps growing right up to 1440px too, so
          the narrow column breaks a word anywhere below that — confirmed
          by testing every width from 768 up, not just the old md/lg gap
          a fixed-size h1 had. */}
      <div className="flex flex-col gap-6 md:max-wide:col-span-6 md:max-wide:col-start-1 wide:col-span-2 wide:col-start-1">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-caption text-muted">Case study</p>
          {/* h1 is fluid now (34-48px, globals.css), so the old tablet-only
              40px patch for "the title breaks mid-word between 768-1023px"
              isn't needed — the curve already lands on a sane size there. */}
          <Heading level={1} variant="h1" className="break-words">
            {title}
          </Heading>
        </div>
        <p className="font-sans text-caption text-ink">
          <span className="font-bold">{client}</span> | {tags.join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-2 font-sans text-body text-ink md:max-wide:col-span-6 md:max-wide:col-start-1 wide:col-span-3 wide:col-start-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
