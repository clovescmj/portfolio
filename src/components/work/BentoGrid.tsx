import type { Project } from "@/types/project";
import { WorkCard } from "./WorkCard";

export function BentoGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-6 md:gap-x-gutter md:gap-y-rhythm">
      {projects.map((project, index) => (
        <WorkCard key={project.slug} project={project} priority={index === 0} />
      ))}
    </div>
  );
}
