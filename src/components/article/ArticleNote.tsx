"use client";

import { TransitionLink } from "@/components/layout/TransitionLink";
import type { ArticlePage } from "@/types/work";

/** A small callout above an article's body — same fade-transition
 *  navigation as BackLink/Sidebar for its link, not a plain <a>. */
export function ArticleNote({ note }: { note: NonNullable<ArticlePage["note"]> }) {
  return (
    <aside className="flex flex-col gap-1 border-l-2 border-lightgrey pl-4">
      <p className="font-sans text-caption text-muted">{note.text}</p>
      {note.link && (
        <TransitionLink
          href={note.link.href}
          className="w-fit font-sans text-caption link"
        >
          {note.link.label}
        </TransitionLink>
      )}
    </aside>
  );
}
