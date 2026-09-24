/** One piece of content inside an article section, in source order — a
 *  section can mix paragraphs, a list, and an image freely (Career
 *  Development Plan's "What I did" has a paragraph, then a numbered
 *  list, then more paragraphs, all under one heading), so this is a
 *  loose ordered array rather than fixed paragraphs/list/image slots. */
export type ArticleBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "image"; src: string; alt: string; width: number; height: number };

/** One section of an article's body — content, optionally under a
 *  heading, in the order it should render. Deliberately looser than the
 *  case-study content model: articles are a single reading column, not a
 *  pixel-matched Figma layout, so there's no grid position math here.
 *  `heading` is optional: Comms Map Skill reads as one continuous piece
 *  with no STAR-style labels, closer to how a real Medium post reads,
 *  while Fixing UI Debt and Career Development Plan keep their
 *  Situation/Task/Action/Result-style headings. */
export interface ArticleSection {
  heading?: string;
  blocks: ArticleBlock[];
  /** Narrows this section's text to a 2-column-wide side column and
   *  pulls its image block out to sit beside it, spanning the remaining
   *  columns, instead of the image running full-width in normal flow —
   *  Comms Map Skill's "Real Data Instead of a Map", confirmed against
   *  Clóves' own Figma layout (node 165:9020: text at col-start-2
   *  col-span-2, image at col-start-4 col-span-3, both the same row).
   *  Only meaningful when the section has exactly one image block. */
  sideImage?: boolean;
}

export interface Article {
  slug: string;
  title: string;
  company: string;
  role: string;
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
