import { notFound } from "next/navigation";
import { BackLink } from "@/components/case-study/BackLink";
import { CaseStudyIntro } from "@/components/case-study/CaseStudyIntro";
import { Hero } from "@/components/case-study/Hero";
import { Impact } from "@/components/case-study/Impact";
import { LabeledRow } from "@/components/case-study/LabeledRow";
import { ProductVisionSpotlight } from "@/components/case-study/ProductVisionSpotlight";
import { SolutionGroup } from "@/components/case-study/SolutionGroup";
import { caseStudies } from "@/content/case-studies";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies[slug];
  if (!caseStudy) notFound();

  // Both case studies use a 72px rhythm between top-level ("mãe") blocks
  // at desktop width, divider or not (the divider itself is a 0-height
  // line, so a "divided" gap is just two of these back to back) — see the
  // note on `CaseStudy.rowGap`. Scales down proportionally below that
  // (not a hard breakpoint jump) via `clamp()`, floored at a bit over
  // half the desktop value; the vw coefficient is derived from `rowGap`
  // itself so it still lands exactly on `rowGap` at the 1440px desktop
  // width the whole scale is measured against, even if a future case
  // study overrides `rowGap` to something other than 72. Kept overridable
  // rather than hardcoded, in case a future case study measures
  // differently; the JIT-unfriendly arbitrary value is why this is a
  // style prop instead of a `gap-*` class.
  const rowGap = caseStudy.rowGap ?? 72;
  const rowGapMin = Math.round(rowGap * 0.56);
  const rowGapVw = ((rowGap / 1440) * 100).toFixed(3);
  const rowGapStyle = { gap: `clamp(${rowGapMin}px, ${rowGapVw}vw, ${rowGap}px)` };

  return (
    <div className="flex flex-col gap-0 md:gap-[88px]">
      <div className="max-md:sticky max-md:top-0 max-md:z-10 max-md:-mx-6 max-md:w-[calc(100%+48px)] max-md:bg-surface max-md:px-6">
        <BackLink href="/" label="Back to Work" />
      </div>

      {/*
        Cancels ScrollArea's shared left+right inset once for the whole
        page, then reintroduces only the left one here — matching the
        Figma file, where the page itself defines the left margin but
        each block below decides its own right edge (most add their own
        pr-content back; Hero/Carousel/dividers don't, so they bleed).
      */}
      <div className="flex flex-col gap-8 md:-mx-content md:w-[calc(100%+112px)] md:gap-12 md:pl-content">
        <Hero image={caseStudy.heroImage} />

        <div className="flex flex-col" style={rowGapStyle}>
          <CaseStudyIntro
            title={caseStudy.title}
            client={caseStudy.client}
            tags={caseStudy.tags}
            paragraphs={caseStudy.intro}
          />

          {caseStudy.content.flatMap((block, i) => {
            // Every divider is a plain sibling in this same flex column, not
            // nested inside its block's own wrapper — that's what makes the
            // gap on both sides of it match the ungapped rhythm everywhere
            // else, instead of a smaller, component-local gap.
            const dividerLight = block.kind === "group" && block.dividerLight;
            const divider =
              "divider" in block && block.divider ? (
                <hr key={`divider-${i}`} className={dividerLight ? "border-lightergrey" : "border-ink"} />
              ) : null;
            if (block.kind === "section") {
              // A section with its own filhas ("childGroups" — Contract's
              // "Solution") renders them right after it, in one shared 64px
              // child↔child column, itself a single item in the page's 72px
              // mãe↔mãe rhythm — same pattern `SolutionGroup` uses for its
              // own `subsections`/nested groups.
              if (block.childGroups?.length) {
                return [
                  divider,
                  <div key={`section-${i}`} className="flex flex-col gap-[clamp(36px,4.444vw,64px)]">
                    <LabeledRow label={block.label} sublabel={block.sublabel} columns={block.columns} />
                    {block.childGroups.map((childGroup, ci) => (
                      <SolutionGroup key={`${childGroup.title}-${ci}`} group={childGroup} />
                    ))}
                  </div>,
                ];
              }
              return [
                divider,
                <LabeledRow key={`section-${i}`} label={block.label} sublabel={block.sublabel} columns={block.columns} />,
              ];
            }
            if (block.kind === "spotlight") {
              return [<ProductVisionSpotlight key={`spotlight-${i}`} spotlight={block} />];
            }
            return [divider, <SolutionGroup key={`group-${i}`} group={block} />];
          })}

          <hr className="border-ink" />

          <Impact intro={caseStudy.impact.intro} lists={caseStudy.impact.lists} groups={caseStudy.impact.groups} />

          {caseStudy.closingGroups?.flatMap((group, i) => [
            group.divider ? <hr key={`closing-divider-${i}`} className="border-ink" /> : null,
            <SolutionGroup key={`closing-group-${i}`} group={group} />,
          ])}
        </div>
      </div>
    </div>
  );
}
