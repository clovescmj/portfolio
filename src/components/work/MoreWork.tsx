"use client";

import { isPlainLeftClick, usePageTransition } from "@/components/layout/PageTransitionContext";
import { projects } from "@/content/projects";
import { ProjectMeta } from "./ProjectMeta";

const COUNT = 3;

/**
 * "More work" footer for case and article pages: text-only cards
 * for the next projects after the current one (home order, wrapping
 * around), with real case studies ahead of articles.
 */
export function MoreWork({ currentSlug }: { currentSlug: string }) {
  const { navigate } = usePageTransition();
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const others = [...projects.slice(index + 1), ...projects.slice(0, Math.max(index, 0))];
  const isCase = (kind?: string) => kind !== "article";
  const picked = [...others.filter((p) => isCase(p.kind)), ...others.filter((p) => !isCase(p.kind))].slice(0, COUNT);

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <h2 className="font-sans text-h1 text-ink">More work</h2>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-gutter">
        {picked.map((project) => {
          const href = `/work/${project.slug}`;
          return (
            <a
              key={project.slug}
              href={href}
              onClick={(event) => {
                if (!isPlainLeftClick(event)) return;
                event.preventDefault();
                navigate(href);
              }}
              className="group flex flex-col gap-2 p-4 transition-colors duration-400 ease-in-out hover:bg-placeholder"
            >
              <p className="font-sans text-caption text-muted">{project.kind === "article" ? "Article" : "Case study"}</p>
              <h3 className="font-sans text-h2 text-ink">{project.title}</h3>
              <p className="font-sans text-body text-ink">{project.description}</p>
              <ProjectMeta client={project.client} tags={project.tags} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
