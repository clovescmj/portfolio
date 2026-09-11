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
      className={`work-card @container flex flex-col gap-4 md:self-start ${
        layout.offsetTop ? "md:mt-rhythm" : ""
      }`}
      style={style}
    >
      <ProjectImage image={image} priority={priority} />

      {!layout.imageOnly && (
        <div className="flex flex-col gap-4 @min-[420px]:flex-row @min-[420px]:gap-6">
          <h3 className="flex-1 font-sans text-title text-ink">{project.title}</h3>
          <div className="flex flex-1 flex-col gap-4">
            <p className="font-sans text-body text-ink">{project.description}</p>
            <ProjectMeta client={project.client} tags={project.tags} />
          </div>
        </div>
      )}
    </article>
  );
}
