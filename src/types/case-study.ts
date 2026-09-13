export interface CaseStudySlide {
  src: string;
  alt: string;
  /** Every slide gets its own caption in the Figma file — not one shared line. */
  caption: string;
}

/**
 * A full project case study page (src/app/work/[slug]/page.tsx). Only
 * projects with an entry here get a generated page — see
 * src/content/case-studies/.
 *
 * Shape mirrors the Figma frame's own structure (node 15:2, "Portfolio -
 * Case") rather than a generic invented schema: a 6-column grid repeats
 * across Problem/Solution (label + two 2-col body columns) and the
 * Approval flow / Attachment library / Scaling / embed block (two
 * 2-col pairs), so the types below name those parts directly instead of
 * modeling something more abstract.
 */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tags: string[];
  heroImage: {
    src: string;
    alt: string;
  };
  /** Paragraphs next to the title, under the hero image. */
  intro: string[];
  /** Each entry is a column of paragraphs — Problem/Solution both split into two. */
  problem: [string[], string[]];
  solution: [string[], string[]];
  carousel: CaseStudySlide[];
  approvalFlow: {
    intro: string;
    list: string[];
  };
  attachmentLibrary: {
    body: string[];
  };
  scaling: string[];
  embed: {
    src: string;
    caption: string;
  };
  impact: {
    intro: string;
    /** Split into two explicit columns in Figma, not an evenly-wrapping grid. */
    itemsLeft: string[];
    itemsRight: string[];
  };
}
