import { notFound } from "next/navigation";
import { BackLink } from "@/components/case-study/BackLink";
import { Carousel } from "@/components/case-study/Carousel";
import { CaseStudyIntro } from "@/components/case-study/CaseStudyIntro";
import { DeepDive } from "@/components/case-study/DeepDive";
import { Hero } from "@/components/case-study/Hero";
import { Impact } from "@/components/case-study/Impact";
import { LabeledRow } from "@/components/case-study/LabeledRow";
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

  return (
    <div className="flex flex-col gap-0 md:gap-[88px]">
      <BackLink href="/" label="Back to Work" />

      {/*
        Cancels ScrollArea's shared left+right inset once for the whole
        page, then reintroduces only the left one here — matching the
        Figma file, where the page itself defines the left margin but
        each block below decides its own right edge (most add their own
        pr-content back; Hero/Carousel/dividers don't, so they bleed).
      */}
      <div className="flex flex-col gap-8 md:-mx-content md:w-[calc(100%+112px)] md:gap-12 md:pl-content">
        <Hero image={caseStudy.heroImage} />

        <div className="flex flex-col gap-12">
          <CaseStudyIntro
            title={caseStudy.title}
            client={caseStudy.client}
            tags={caseStudy.tags}
            paragraphs={caseStudy.intro}
          />

          <hr className="border-ink" />

          <LabeledRow label="Problem" columns={caseStudy.problem} />

          <hr className="border-ink" />

          <LabeledRow label="Solution" columns={caseStudy.solution} />

          <Carousel slides={caseStudy.carousel} />

          <DeepDive
            approvalFlow={caseStudy.approvalFlow}
            attachmentLibrary={caseStudy.attachmentLibrary}
            scaling={caseStudy.scaling}
            embed={caseStudy.embed}
          />

          <hr className="border-ink" />

          <Impact
            intro={caseStudy.impact.intro}
            itemsLeft={caseStudy.impact.itemsLeft}
            itemsRight={caseStudy.impact.itemsRight}
          />
        </div>
      </div>
    </div>
  );
}
