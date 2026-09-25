import { Heading } from "@/components/ui/Heading";
import { headingId } from "@/lib/heading-id";
import type { Chapter as ChapterData } from "@/types/case-study";
import { SubsectionView } from "./Subsection";

/**
 * A titled section (Context, Solution, App Evolution, Insights...) made of
 * subsections. The title is the section's h2; with `titlePlacement:
 * "beside"` it moves into the first subsection's label column instead of
 * sitting above the content.
 *
 * Subsections are separated by the child rhythm: 64px at the 1440px
 * desktop width, scaling down to 36px (see `gap-subsection`).
 */
export function Chapter({ chapter }: { chapter: ChapterData }) {
  const beside = chapter.titlePlacement === "beside";
  const id = headingId(chapter.title);

  return (
    <section aria-labelledby={id} className="flex flex-col gap-subsection">
      {!beside && (
        <Heading level={2} variant="h2" id={id} className="-mb-6 md:-mb-10">
          {chapter.title}
        </Heading>
      )}

      {chapter.subsections.map((subsection, i) => (
        <SubsectionView
          key={`${subsection.title ?? ""}-${i}`}
          subsection={subsection}
          labelWidth={chapter.labelWidth}
          // The chapter title takes the place of the first subsection's own.
          title={beside && i === 0 ? chapter.title : undefined}
          isSectionTitle={beside && i === 0}
        />
      ))}
    </section>
  );
}
