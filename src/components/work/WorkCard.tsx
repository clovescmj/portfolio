import type { CSSProperties } from "react";
import type { Project } from "@/types/project";
import { ProjectImage } from "./ProjectImage";
import { ProjectMeta } from "./ProjectMeta";

/**
 * A single project card in the Work bento grid.
 *
 * Position and size come entirely from `project.layout` (see
 * src/types/project.ts). Whether the title/description sit side by side
 * or stacked adapts on its own via a CSS container query, based on how
 * wide the card ends up once placed on the grid — no per-card variant
 * switch to maintain by hand. Title/body/meta font sizes are fixed and
 * the same on every card regardless of width, by design.
 */
export function WorkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { layout, image } = project;

  const style = {
    "--card-col-start": layout.colStart,
    "--card-col-span": layout.colSpan,
    "--card-row-start": layout.rowStart,
  } as CSSProperties;

  return (
    <article
      className={`work-card md:self-start ${layout.offsetTop ? "md:mt-rhythm" : ""}`}
      style={style}
    >
      {/*
        Hover backdrop: padding + an equal negative margin cancel out for
        layout purposes (the card's footprint in the grid is unchanged),
        but the background-color only shows within the padded box — so
        hovering "reveals" a surface bleeding 16px past the card into the
        surrounding gutter, instead of pushing neighbors around. A border
        would only draw a ring, not a filled backdrop like this.
      */}
      <div className="@container -m-4 flex flex-col gap-4 p-4 transition-colors duration-400 ease-in-out hover:bg-surface-hover">
        <ProjectImage image={image} priority={priority} />

        {!layout.imageOnly && (
          <div className="flex flex-col gap-2 md:gap-4 @min-[420px]:flex-row @min-[420px]:gap-6">
            <h3 className="flex-1 font-sans text-[20px] leading-[1.2] tracking-[-0.01em] font-medium text-ink md:text-title">
              {project.title}
            </h3>
            <div className="flex flex-1 flex-col gap-2 md:gap-4">
              <p className="font-sans text-body text-ink">{project.description}</p>
              <ProjectMeta client={project.client} tags={project.tags} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
