import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { MoreWork } from "@/components/work/MoreWork";
import { BackLink, FloatingBackLink } from "@/components/case-study/BackLink";
import { CaseStudyIntro } from "@/components/case-study/CaseStudyIntro";
import { Hero } from "@/components/case-study/Hero";
import { Impact } from "@/components/case-study/Impact";
import { Chapter } from "@/components/case-study/Chapter";
import { ColumnsSection } from "@/components/case-study/ColumnsSection";
import { ProductVisionSpotlight } from "@/components/case-study/ProductVisionSpotlight";
import { articles } from "@/content/articles";
import { caseStudies } from "@/content/case-studies";

export function generateStaticParams() {
  return [...Object.keys(caseStudies), ...Object.keys(articles)].map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (article) {
    return (
      <article className="flex flex-col gap-8 md:gap-20">
        <div className="max-md:sticky max-md:top-0 max-md:z-10 max-md:-mx-6 max-md:w-[calc(100%+48px)] max-md:bg-surface max-md:px-6">
          <BackLink href="/" label="Back to Work" />
          <FloatingBackLink href="/" label="Back to Work" />
        </div>
        {/* Cancels the shared right inset for everything below, same as
            the case-study branch — a `sideImage` section's image bleeds
            to this true right edge; everything else adds its own
            `pr-content` back in ArticleBody. */}
        <div className="bleed-content">
          <ArticleBody article={article} />
          <div className="mt-[72px] flex flex-col gap-[72px] md:pr-content">
            <hr className="border-ink" />
            <MoreWork currentSlug={slug} />
          </div>
        </div>
      </article>
    );
  }

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
    <article className="flex flex-col gap-0 md:gap-[88px]">
      <div className="max-md:sticky max-md:top-0 max-md:z-10 max-md:-mx-6 max-md:w-[calc(100%+48px)] max-md:bg-surface max-md:px-6">
        <BackLink href="/" label="Back to Work" />
        <FloatingBackLink href="/" label="Back to Work" />
      </div>

      {/*
        Cancels ScrollArea's shared left+right inset once for the whole
        page, then reintroduces only the left one here — matching the
        Figma file, where the page itself defines the left margin but
        each block below decides its own right edge (most add their own
        pr-content back; Hero/Carousel/dividers don't, so they bleed).
        Direct children are the header and then one <section> per chapter
        (with <hr> dividers between), all separated by the page rhythm.
      */}
      <div className="flex flex-col bleed-content" style={rowGapStyle}>
        <header className="flex flex-col gap-8 md:gap-12">
          <Hero image={caseStudy.heroImage} />
          <CaseStudyIntro
            title={caseStudy.title}
            client={caseStudy.client}
            tags={caseStudy.tags}
            paragraphs={caseStudy.intro}
          />
        </header>

        {caseStudy.sections.flatMap((section, i) => {
          // A divider is a plain sibling in this same flex column, not nested
          // inside its section's wrapper: that's what makes the gap on both
          // sides of it match the ungapped rhythm everywhere else, instead
          // of a smaller, component-local gap.
          const divider =
            "divider" in section && section.divider ? (
              <hr key={`divider-${i}`} className={section.divider === "light" ? "border-lightergrey" : "border-ink"} />
            ) : null;
          switch (section.kind) {
            case "columns":
              return [divider, <ColumnsSection key={`columns-${i}`} section={section} />];
            case "spotlight":
              return [<ProductVisionSpotlight key={`spotlight-${i}`} spotlight={section} />];
            case "chapter":
              return [divider, <Chapter key={`chapter-${i}`} chapter={section} />];
            case "impact":
              return [divider, <Impact key={`impact-${i}`} section={section} />];
          }
        })}

        <hr className="border-ink" />

        <div className="md:pr-content">
          <MoreWork currentSlug={slug} />
        </div>
      </div>
    </article>
  );
}
