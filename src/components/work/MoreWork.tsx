"use client";

import { TransitionLink } from "@/components/layout/TransitionLink";
import { projects } from "@/content/projects";
import { headingId } from "@/lib/heading-id";
import { ProjectMeta } from "./ProjectMeta";
import { Heading } from "@/components/ui/Heading";

const COUNT = 3;

/**
 * "More work" footer for case and article pages: text-only cards
 * for the next projects after the current one (home order, wrapping
 * around), with real case studies ahead of articles.
 */
export function MoreWork({ currentSlug }: { currentSlug: string }) {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const others = [...projects.slice(index + 1), ...projects.slice(0, Math.max(index, 0))];
  const isCase = (kind?: string) => kind !== "article";
  const picked = [...others.filter((p) => isCase(p.kind)), ...others.filter((p) => !isCase(p.kind))].slice(0, COUNT);

  return (
    <section aria-labelledby={headingId("More work")} className="flex flex-col gap-6 md:gap-10">
      <Heading level={2} variant="h2" id={headingId("More work")}>
        More work
      </Heading>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-gutter">
        {picked.map((project) => {
          const href = `/work/${project.slug}`;
          return (
            <TransitionLink
              key={project.slug}
              href={href}
              className="group flex flex-col gap-2 p-4 transition-colors duration-400 ease-in-out hover:bg-placeholder"
            >
              <p className="font-sans text-caption text-muted">{project.kind === "article" ? "Article" : "Case study"}</p>
              <Heading level={3} variant="h3">{project.title}</Heading>
              <p className="font-sans text-body text-ink">{project.description}</p>
              <ProjectMeta client={project.client} tags={project.tags} />
            </TransitionLink>
          );
        })}
      </div>
    </section>
  );
}
