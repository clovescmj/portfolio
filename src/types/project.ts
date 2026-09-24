export type ImageTreatment = "plain" | "framed";

/**
 * Where and how big a project's card is inside the 6-column bento grid.
 * colStart/colSpan/rowStart give full manual control over the collage-style
 * layout (matches the hand-placed composition in Figma). Every card is
 * top-aligned in its row (never stretched to match a taller neighbor) —
 * offsetTop nudges a specific card down by one rhythm unit (88px) with a
 * fixed margin, matching how Figma places some cards lower within a row.
 * This is intentionally a fixed offset, not "align to the row's bottom":
 * the row's height is driven by its tallest card, so anchoring to the
 * bottom would make this card's position shift whenever that neighbor's
 * height changes (e.g. its image treatment or copy length).
 */
export interface ProjectLayout {
  colStart: 1 | 2 | 3 | 4 | 5 | 6;
  colSpan: 1 | 2 | 3 | 4 | 5 | 6;
  rowStart: number;
  /** Rows the card spans (default 1) — lets a tall card share its rows with a stack of shorter ones. */
  rowSpan?: number;
  offsetTop?: boolean;
  /** Card renders only the image, no title/description/tags. */
  imageOnly?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
  /** "framed" adds the browser-mockup gradient + shadow treatment. */
  treatment?: ImageTreatment;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  tags: string[];
  description: string;
  image?: ProjectImage;
  /** "article" for a project shared as a written piece rather than a full
   *  design case study — no card image, and its own page (see
   *  src/content/articles/) reads closer to a blog post than a case
   *  study's Problem/Understanding/Solution/Impact structure. Defaults to
   *  "case-study". */
  kind?: "case-study" | "article";
  layout: ProjectLayout;
}
