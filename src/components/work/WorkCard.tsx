"use client";

import type { CSSProperties, ReactNode } from "react";
import { isPlainLeftClick, usePageTransition } from "@/components/layout/PageTransitionContext";
import { articles } from "@/content/articles";
import { caseStudies } from "@/content/case-studies";
import type { Project } from "@/types/project";
import { ProjectImage } from "./ProjectImage";
import { ProjectMeta } from "./ProjectMeta";

/**
 * A single project card in the Work bento grid.
 *
 * Position and size come entirely from `project.layout` (see
 * src/types/project.ts). At the md breakpoint and up, whether the
 * title/description sit side by side or stacked adapts on its own via a
 * CSS container query, based on how wide the card ends up once placed
 * on the grid, no per-card variant switch to maintain by hand. Below
 * md, they always stack: on a wide phone a card can still render past
 * the 420px container threshold, and a mobile card splitting into two
 * columns reads as a bug, not a size-driven layout choice, so the
 * container query itself is scoped to md: (`md:@min-[420px]:flex-row`)
 * rather than being unconditional. Title/body/meta font sizes are fixed
 * and the same on every card regardless of width, by design.
 */
export function WorkCard({
  project,
  order,
  priority = false,
}: {
  project: Project;
  order: number;
  priority?: boolean;
}) {
  const { layout, image, kind = "case-study" } = project;
  const { navigate } = usePageTransition();
  const href = caseStudies[project.slug] || articles[project.slug] ? `/work/${project.slug}` : undefined;

  const style = {
    "--card-col-start": layout.colStart,
    "--card-col-span": layout.colSpan,
    "--card-gap-top": `${layout.gapTop ?? 0}px`,
    "--card-order": order,
  } as CSSProperties;

  return (
    <article
      className="work-card"
      style={style}
    >
      {/*
        Hover backdrop: padding + an equal negative margin cancel out for
        layout purposes (the card's footprint in the grid is unchanged),
        but the background-color only shows within the padded box — so
        hovering "reveals" a surface bleeding 16px past the card into the
        surrounding gutter, instead of pushing neighbors around. A border
        would only draw a ring, not a filled backdrop like this.

        Only cards with a real case study or article entry (see
        src/content/case-studies/ and src/content/articles/) link anywhere
        — the rest are placeholders without a page to go to yet, so they
        render as a plain div instead of an inert <a>.
      */}
      <Wrapper
        href={href}
        onNavigate={navigate}
        className="group @container -m-4 flex flex-col gap-4 p-4 transition-colors duration-400 ease-in-out hover:bg-placeholder"
      >
        {/* Articles have no thumbnail — they're shared as a written piece,
            not a set of designed screens, so a card image would either be
            blank or a stand-in that doesn't represent the content. */}
        {kind !== "article" && <ProjectImage image={image} priority={priority} comingSoon={!href} />}

        {!layout.imageOnly && (
          <div className="flex flex-col gap-2 md:gap-4 md:@min-[420px]:flex-row md:@min-[420px]:gap-6">
            {/*
              max-md: here, not bare utilities — same reason as
              PageHeader/Sidebar: text-h3 bundles size/leading/
              tracking/weight via Tailwind's shared --tw-leading/
              --tw-tracking/--tw-font-weight custom properties, so an
              unprefixed leading-[...] here would keep winning over
              text-h3's own line-height at the md: breakpoint too.
            */}
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-sans text-caption text-muted">{kind === "article" ? "Article" : "Case study"}</p>
              <h2 className="font-sans max-md:text-[19px] max-md:leading-[1.15] max-md:tracking-[-0.01em] max-md:font-medium text-ink md:text-h3">
                {project.title}
              </h2>
            </div>
            <div className="flex flex-1 flex-col gap-2 md:gap-4">
              <p className="font-sans text-body text-ink">{project.description}</p>
              <ProjectMeta client={project.client} tags={project.tags} />
            </div>
          </div>
        )}
      </Wrapper>
    </article>
  );
}

/** A real <a> when there's somewhere to go, a plain div otherwise — never an inert link. */
function Wrapper({
  href,
  onNavigate,
  className,
  children,
}: {
  href?: string;
  onNavigate: (href: string) => void;
  className: string;
  children: ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;

  return (
    <a
      href={href}
      onClick={(event) => {
        if (!isPlainLeftClick(event)) return;
        event.preventDefault();
        onNavigate(href);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
