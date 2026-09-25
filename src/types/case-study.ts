/** A plain image reference — src/alt plus its real pixel size, so it can
 *  render at its own natural aspect ratio instead of being forced into a
 *  fixed box (source screenshots vary widely: square crops, tall phone
 *  screens, wide diagrams). Shared by `FeatureBlock.image` and
 *  `Subsection.imageColumns`. */
export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Wrap the image in a tinted card — only when Figma actually shows one behind it. Off by default:
   *  most source exports are transparent-cutout mockups meant to sit on plain white. */
  background?: boolean;
  /** Only meaningful with `background: true` — crop to a fixed 270px-tall
   *  box (object-cover) instead of the image's own natural aspect ratio.
   *  Third-party Claims' research-canvas image (confirmed via
   *  get_design_context on node 148:19353: `h-[270px]` + `object-cover`
   *  inside a `p-[24px]` tinted card). Left off for a source image that's
   *  much taller than it is wide (e.g. a portrait document pair), where
   *  this crop would cut off most of the content — natural aspect stays
   *  the right call there even though Figma's own box is the same size. */
  crop?: boolean;
}

/** A `CaseStudyImage` with its own small caption underneath — `FeatureBlock.image`
 *  and each `imageColumns` entry. */
export interface CaptionedImage extends CaseStudyImage {
  caption?: string;
}

export interface CaseStudySlide {
  src: string;
  alt: string;
  /** Every slide gets its own caption in the Figma file — not one shared line. */
  caption: string;
  /**
   * Overrides the carousel's header while this slide is active — Contract's
   * "Contract Template Management" (first 3 slides) vs. "Attachment
   * Template Management" (last 3): one carousel covering two distinct
   * flows, so the header should say which one is on screen, not one
   * static label for both. Falls back to the group's own `title` (set on
   * every slide in this case, so that fallback is mostly theoretical).
   */
  title?: string;
}

/** A stacked heading+body sub-entry — Loft's "Convenience/Personalization/Performance"
 *  findings, its "Market Share/Business Impact/..." opportunities, Impact's "Process"
 *  learnings. Reused by both `LabeledColumn` (inside a Problem/Understanding/Solution
 *  row) and `FeatureBlock` (inside a group's topic grid) rather than duplicated. */
export interface SubItem {
  title: string;
  body?: string;
  list?: string[];
}

/** A number + label + optional one-line context — the "Big Number Block" pattern
 *  (Loft's Usage Data stats, Impact's Product stats: "82% / Bounce rate / 66% on Desktop"). */
export interface StatItem {
  value: string;
  label: string;
  caption?: string;
}

export interface StatsBlock {
  items: StatItem[];
}

/**
 * One column inside a `LabeledColumns` row — prose, a bullet list, stacked
 * sub-items, or a stats block, optionally under its own small heading (e.g.
 * "Emotional" / "Rational" side by side under one label). A column renders
 * whichever pieces it's given, in this fixed order: heading, paragraphs,
 * stats, items, list — covering everything from a plain two-paragraph body
 * (Contract) to a stats box stacked over three findings (Loft's
 * Understanding row).
 */
export interface LabeledColumn {
  heading?: string;
  paragraphs?: string[];
  stats?: StatsBlock;
  items?: SubItem[];
  list?: string[];
  /** Give `list` the same tinted-box treatment as a stats block — Loft's "My Role" scope list. */
  listBoxed?: boolean;
}

/** Problem / Understanding / Solution: a section title plus two columns, and
 *  optionally subsections under them (Contract's "Solution"). */
export interface ColumnsSection {
  kind: "columns";
  title: string;
  /** A smaller heading under `title`, in the same label column. */
  subtitle?: string;
  columns: [LabeledColumn, LabeledColumn];
  /** A rule above the section. */
  divider?: Divider;
  subsections?: Subsection[];
}

/**
 * One "deep dive" topic inside a group (Approval flow, Bottom Navigation,
 * Home Feed...): an optional heading, body paragraphs, a labeled or plain
 * bullet list, stacked sub-items, a stats block, a supporting image, a
 * plain link ("View prototype"), or a reserved embed slot. Not every topic
 * uses every field — a title-less topic holding just `stats` or `items` is
 * how a group fills a topic slot with something other than prose (see
 * Loft's Understanding group). Image width/height are explicit (not
 * `fill`) because these come from source screenshots of very different
 * aspect ratios (portrait phone screens, wide flow diagrams) — forcing
 * them into one fixed box would crop unpredictably, so each renders at its
 * own natural ratio instead.
 */
export interface FeatureBlock {
  title?: string;
  body?: string[];
  /** Small heading above `list`, e.g. "Goals" — omit for a plain bullet list. */
  listLabel?: string;
  list?: string[];
  /** Split `list` into 2 even side-by-side columns — Loft's Release Plan
   *  "Native Features & Flows" (4 items + 4 items), confirmed via
   *  get_metadata (two 140px-wide text nodes side by side, not one column). */
  listTwoColumn?: boolean;
  /** Give `list` the same tinted-box treatment a `LabeledColumn` list can get — Loft's "My Role" scope list. */
  listBoxed?: boolean;
  items?: SubItem[];
  stats?: StatsBlock;
  image?: CaptionedImage;
  /** A small badge above the topic, e.g. "A/B Test" — pairs with an accent-bordered highlight. */
  tag?: string;
  /** A plain external link, e.g. "View prototype" pointing at a Figma proto URL. */
  link?: { label: string; href: string };
  /**
   * A reserved slot for a live, interactive prototype in an iframe. `src`
   * is optional: when it's not set yet (the real prototype URL hasn't
   * been handed off), the slot renders as a placeholder the same size,
   * with the caption already in place — never a fabricated or guessed src.
   */
  embed?: {
    src?: string;
    title: string;
    caption: string;
    /** A device-shaped embed (a phone prototype) — see EmbedFrame's `device` prop. */
    device?: boolean;
    /** Show a "Loading prototype" placeholder behind a device embed until it loads. */
    placeholder?: boolean;
    /** Static image shown instead of the iframe on touch devices, where Figma's player drops the device skin. */
    fallback?: string;
  };
}

/** A wide process diagram with its own caption, shown full width. */
export interface CaseStudyFlow {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Small caption under the diagram. Optional — not every flow has one (Release Plan's timeline and
   *  User Setup's onboarding flow read fine without one). */
  caption?: string;
  /** Wrap the image in a tinted card — only when Figma actually shows one behind it. Off by default. */
  background?: boolean;
}

/** A live, interactive prototype shown in an iframe. */
export interface CaseStudyEmbed {
  src: string;
  title: string;
  /** Shown under a group-level `embed`. Unused by `highlightEmbed` —
   *  PrototypeHighlight renders the prototype alone, no caption. */
  caption?: string;
}

export type Divider = "dark" | "light";

/** Width of the title column beside a subsection's content. */
export type LabelWidth = "narrow" | "wide";

/**
 * Where a subsection's content sits in the 6-column grid. Everything here
 * is layout, kept apart from the content fields so a subsection reads as
 * "what it says" plus one small "how it is laid out" object.
 */
export interface SubsectionLayout {
  /** Title column width: "narrow" is 1 column (140px), "wide" is 2. Defaults to the chapter's `labelWidth`. */
  labelWidth?: LabelWidth;
  /** Start the topics at column 3 even when the title only spans column 1. */
  contentStart?: 3;
}

/**
 * Full-width rows of equal columns below the topics: `stacked` puts each
 * row below the title, `inline` puts the first row beside it, `compact`
 * packs two columns at col 3-4 so a `quote` can sit beside them.
 */
export interface MiniGrid {
  rows: { title: string; body?: string; list?: string[]; tag?: string }[][];
  placement: "stacked" | "inline" | "compact";
}

/**
 * A single flush-left column of titled topics with one wide image or embed
 * beside them (Contract's "Adding an attachment", Claims' "Content
 * Mapping"). Presence of this object selects that layout.
 */
export interface StackedLayout {
  image?: { src: string; alt: string };
  embed?: { src: string; title: string };
  /** Columns the wide slot spans: 4 by default (Contract), 3 for Claims. */
  span?: 3 | 4;
  caption?: string;
}

/**
 * The unit a chapter is made of: a title (optional, in the label column),
 * then any of these pieces, rendered in a fixed order. A chapter with a
 * single piece of content has one subsection.
 */
export interface Subsection {
  title?: string;
  /** A link under the title, e.g. "View prototype". */
  link?: { label: string; href: string };
  layout?: SubsectionLayout;
  intro?: string;
  topics?: FeatureBlock[];
  miniGrid?: MiniGrid;
  /** Two independent stacked-image columns (Loft's "Samples"). */
  imageColumns?: [CaptionedImage[], CaptionedImage[]];
  embed?: CaseStudyEmbed;
  /** Wide diagrams shown full width after the topics. */
  flows?: CaseStudyFlow[];
  quote?: { text: string; attribution: string };
  links?: { label: string; href: string }[];
  stacked?: StackedLayout;
  /** A live prototype in the full-bleed tinted shell, in place of the normal body. */
  highlightEmbed?: CaseStudyEmbed;
  /** Slides, with the subsection's title as the carousel header when `titleAbove` is set. */
  carousel?: { slides: CaseStudySlide[]; titleAbove?: boolean };
}

/**
 * A titled section made of subsections (Context, Solution, App Evolution,
 * Insights, Samples...). The section's `title` is its h2; each subsection
 * is an h3 inside it.
 */
export interface Chapter {
  kind: "chapter";
  title: string;
  /** "above" puts the title over the content, "beside" puts it in the first subsection's label column. */
  titlePlacement?: "above" | "beside";
  /** Default title column width for every subsection. */
  labelWidth?: LabelWidth;
  divider?: Divider;
  subsections: Subsection[];
}

/**
 * A dark, full-bleed spotlight block: Loft's "Product Vision". One-off
 * among the case studies, so it has its own shape.
 */
export interface SpotlightSection {
  kind: "spotlight";
  title: string;
  statement: string;
  searchContextLabel: string;
  searchContext: { label: string; items: string[] }[];
  principlesLabel: string;
  principles: string[];
  image: { src: string; alt: string };
}

/** One column of Impact: "Results", "Process", or unlabeled. */
export interface LabeledList {
  label?: string;
  items: string[];
}

/** The closing "Impact" section: stat groups, numbered lists, or both. */
export interface ImpactSection {
  kind: "impact";
  divider?: Divider;
  intro?: string;
  lists?: LabeledList[];
  groups?: { label: string; stats?: StatsBlock; topics?: FeatureBlock[] }[];
}

/** Everything a case study page is made of, in reading order. */
export type Section = ColumnsSection | Chapter | SpotlightSection | ImpactSection;

/**
 * A full project case study page (src/app/work/[slug]/page.tsx): a header
 * (hero + intro) followed by sections, each rendered as a `<section>` with
 * its own subsections nested inside.
 */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tags: string[];
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
