import type { ProjectImage, ProjectLayout } from "./project";
import type { Section } from "./case-study";
import type { ArticleSection } from "./article";

/**
 * Everything a Work card needs, beyond the fields every entry shares
 * (title/client/tags below) — the card-specific slice of one project's
 * single source file (see `WorkEntry`).
 */
export interface WorkCardData {
  description: string;
  /** Articles have no card image — shared as a written piece, not a set
   *  of designed screens. */
  image?: ProjectImage;
  layout: ProjectLayout;
}

/** A full case-study page's content, minus the fields `WorkEntry` already
 *  carries once (slug/title/client/tags) — see the note there. */
export interface CaseStudyPage {
  heroImage: {
    src: string;
    alt: string;
    desktopAspect?: "wide" | "portrait";
  };
  intro: string[];
  /** Space between sections at the 1440px desktop width (72px by default). */
  rowGap?: number;
  sections: Section[];
}

/** A full article page's content, minus the fields `WorkEntry` already
 *  carries once — see the note there. */
export interface ArticlePage {
  /** An italicized one-line summary under the title — the Notion source's
   *  own lead sentence, e.g. "As design manager, I built and ran a
   *  development plan...". */
  lead?: string;
  /** A small callout above the body — Fixing UI Debt's note that it
   *  follows the Contract Template Management case, with a link back to it. */
  note?: { text: string; link?: { label: string; href: string } };
  /** Career Development Plan's TL;DR aside: a short labeled list read
   *  before the full body. */
  tldr?: { label: string; body: string }[];
  sections: ArticleSection[];
}

interface WorkEntryBase {
  slug: string;
  title: string;
  client: string;
  tags: string[];
  card: WorkCardData;
}

/**
 * One project, one file (`src/content/work/<slug>.ts`), one object: the
 * Work card and the full page both read from this — title, client and
 * tags exist exactly once, instead of a `content/projects.ts` entry and a
 * separate `content/case-studies/`or`articles/<slug>.ts` file quietly
 * disagreeing with each other (which is exactly what happened before this
 * existed — two real bugs, a wrong tags line and a stray title prefix,
 * both from the same slug living in two places).
 *
 * `kind` decides which shape `page` is: a full Problem/Solution/Impact
 * case study, or a single-column written article.
 */
export type WorkEntry =
  | (WorkEntryBase & { kind: "case-study"; page: CaseStudyPage })
  | (WorkEntryBase & { kind: "article"; page: ArticlePage });
