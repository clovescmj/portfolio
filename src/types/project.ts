export type ImageTreatment = "plain" | "framed";

/**
 * Where a project's card sits on the Work page. Desktop is two side-by-side
 * stacks, each a 3-column grid (matches Figma's "Recent work" frame: two
 * 488px frames, 24px gutters, 146.67px columns): `column` picks the stack,
 * colStart/colSpan the position inside it (1-3), and `gapTop` the space
 * above the card in px, measured from Figma per card (Contract's 88 is the
 * offset of its image; 128 and 48 are the gaps between stacked cards).
 * Mobile ignores all of it and follows the order of `projects`.
 */
export interface ProjectLayout {
  column: "left" | "right";
  colStart: 1 | 2 | 3;
  colSpan: 1 | 2 | 3;
  gapTop?: number;
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
