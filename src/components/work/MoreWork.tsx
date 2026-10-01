"use client";

import { TransitionLink } from "@/components/layout/TransitionLink";
import { workEntries } from "@/content/work";
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
  const index = workEntries.findIndex((e) => e.slug === currentSlug);
  const others = [...workEntries.slice(index + 1), ...workEntries.slice(0, Math.max(index, 0))];
  const isCase = (kind: string) => kind !== "article";
  const picked = [...others.filter((e) => isCase(e.kind)), ...others.filter((e) => !isCase(e.kind))].slice(0, COUNT);

  return (
    <section aria-labelledby={headingId("More work")} className="flex flex-col gap-6 md:gap-10">
      <Heading level={2} variant="h2" id={headingId("More work")}>
        More work
      </Heading>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-gutter">
        {picked.map((entry) => {
          const href = `/work/${entry.slug}`;
          return (
            <TransitionLink
              key={entry.slug}
              href={href}
              className="group flex flex-col gap-2 md:p-4 transition-colors duration-400 ease-in-out hover:bg-placeholder"
            >
              <p className="font-sans text-caption text-muted">{entry.kind === "article" ? "Article" : "Case study"}</p>
              <Heading level={3} variant="h3">{entry.title}</Heading>
              <p className="font-sans text-body text-ink">{entry.card.description}</p>
              <ProjectMeta client={entry.client} tags={entry.tags} />
            </TransitionLink>
          );
        })}
      </div>
    </section>
  );
}
