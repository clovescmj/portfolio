import type { Project } from "@/types/project";
import { WorkCard } from "./WorkCard";

/**
 * Two side-by-side stacks on desktop (see `ProjectLayout`). Below md the stack
 * wrappers are `display: contents`, so cards fall into one column and each
 * takes its position from its index in `projects` (`--card-order`).
 */
export function BentoGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-y-12 md:grid md:grid-cols-6 md:gap-x-gutter">
      {(["left", "right"] as const).map((column) => (
        <div
          key={column}
          className={`contents md:grid md:grid-cols-3 md:content-start md:gap-x-gutter ${column === "left" ? "md:col-start-1" : "md:col-start-4"} md:col-span-3`}
        >
          {projects.map((project, index) =>
            project.layout.column === column ? (
              <WorkCard key={project.slug} project={project} order={index} priority={index === 0} />
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
}
