export interface CaseStudySlide {
  src: string;
  alt: string;
  /** Every slide gets its own caption in the Figma file — not one shared line. */
  caption: string;
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

/** Problem/Solution/Research Findings/etc. — a label plus two columns. */
export interface LabeledColumns {
  label: string;
  /** A smaller heading under `label`, in the same label column — Loft's "Context" / "Understanding". */
  sublabel?: string;
  columns: [LabeledColumn, LabeledColumn];
  /** A divider line above this block. Off by default — Figma uses these sparingly, at
   *  real chapter breaks, not between every block (see `CaseStudy.rowGap` for the rest). */
  divider?: boolean;
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
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Small caption under the image, e.g. noting it's an animated recording of a click-through. */
    caption?: string;
    /** Wrap the image in a tinted card — only when Figma actually shows one behind it. Off by default:
     *  most source exports are transparent-cutout mockups meant to sit on plain white. */
    background?: boolean;
  };
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
  embed?: { src?: string; title: string; caption: string };
  /**
   * A third-level heading in the group's label column (col 1), row-locked
   * to this topic instead of living inside its own card — Loft's App
   * Evolution, where "User Setup"/"Bottom Navigation"/"Home Feed"/"Property
   * Feedback" sit at the same x as the group title itself, confirmed via
   * get_metadata (each at x=0, same column as "App Evolution"), not inside
   * the topic's own col2/col4 cell like a normal `title`. Only meaningful
   * on the first topic of a row (the one rendered at col-start-2).
   */
  colLabel?: string;
  /** A link under `colLabel`, e.g. "View prototype" — Loft's User Setup. */
  colLabelLink?: { label: string; href: string };
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

/** A live, interactive prototype shown in an iframe, with its own caption. */
export interface CaseStudyEmbed {
  src: string;
  title: string;
  caption: string;
}

/**
 * Second level of a section ("Key decisions", "How it works", Loft's
 * "MVP"/"Release Plan"/"App Evolution"/"Insights"...): a title in the label
 * column, an optional intro paragraph, `topics` (third level) two per row
 * beside it, an optional full-width mini-grid (Loft's 4-column "Research
 * Process"), an optional full-width diagram, an optional carousel, and an
 * optional trailing list of plain links (Loft's "Files and Prototypes").
 * `embed` is its own field rather than a topic's — a live interactive
 * prototype (Contract's drawer) is a deliberately prominent, wide layout
 * that sits beside a single topic, in the space a second one would take,
 * not squeezed into a normal topic slot.
 */
export interface CaseStudyGroup {
  title: string;
  /**
   * A small chapter heading above `title`, in the same label column — Loft's
   * "Solution" above "MVP" and "Context" above "Understanding". Confirmed via
   * get_metadata: 24px below this label's bottom edge, same x. Only the
   * first group of a chapter carries it — Release Plan/App Evolution don't
   * repeat "Solution".
   */
  topLabel?: string;
  /**
   * Use the wide (~312px) label column sections like "Business Opportunities"
   * use, instead of the narrow one other groups (MVP, Release Plan) use —
   * Loft's "Understanding", whose topic grid starts at the same x as
   * "Business Opportunities"/"My Role" below it (confirmed via get_metadata:
   * content at x=344, the 312+32 wide-column rhythm, not x=172).
   */
  wideLabel?: boolean;
  /** Topics start at column 3 even though the title itself only spans
   *  column 1 — Contract's "New process". See the fuller note on
   *  `SolutionGroup`'s `GroupBody`. */
  contentOffset3?: boolean;
  intro?: string;
  topics: FeatureBlock[];
  /**
   * Full-width rows of N equal columns, below the 2-per-row topic grid —
   * Loft's "Goal / Why conduct this research? / What needs to be
   * understood?" (3 columns) and Key Findings' 4 equal columns. An array of
   * rows (not a single row) because a group can have more than one such
   * block. A row's own columns can carry a `tag` badge (Key Findings' "A/B
   * Test") the same way a topic can.
   */
  miniGrid?: { title: string; body?: string; list?: string[]; tag?: string }[][];
  embed?: CaseStudyEmbed;
  /**
   * Wide diagrams shown full-width, each after a given 0-indexed topic
   * (omit `afterTopic` to render after every topic in the row) — Loft's App
   * Evolution has two (after User Setup, after Bottom Navigation's image),
   * MVP/Release Plan/A-B Test have one each, some `first` (MVP, screens
   * before the rationale text).
   */
  flows?: (CaseStudyFlow & { afterTopic?: number; first?: boolean })[];
  carousel?: CaseStudySlide[];
  /**
   * Render `title` as the carousel's own header (full width, beside its
   * nav arrows) instead of the usual col-1 label — Contract's "Contract
   * and attachment template management" highlight, which has no other
   * content in the row. Only meaningful together with `carousel`.
   */
  titleAboveCarousel?: boolean;
  links?: { label: string; href: string }[];
  /**
   * More title+content blocks stacked below the main one, tightly (48px,
   * not the page's 72px rhythm) — Loft's "Insights" chapter, which packs
   * "Interview & Usability Test" (title + a 3-col miniGrid), "Research
   * Process" (title + a 4-col miniGrid), "Key Findings" (title + topics),
   * and "A/B Test" (title + topics + flow) into one physical Figma row
   * with no dividers or full rhythm gaps between them — confirmed via
   * get_metadata (all 4 titles/content sit inside one un-interrupted
   * ~1064px-tall row). Each entry reuses the same title/topics/miniGrid/
   * flows rendering as the group itself, just without its own topLabel.
   */
  subsections?: {
    title: string;
    topics?: FeatureBlock[];
    miniGrid?: { title: string; body?: string; list?: string[]; tag?: string }[][];
    flows?: (CaseStudyFlow & { afterTopic?: number })[];
  }[];
  /** A divider line above this group. Off by default — Figma uses these sparingly, at
   *  real chapter breaks, not between every group (see `CaseStudy.rowGap` for the rest). */
  divider?: boolean;
  /** Contract's group dividers are a lighter tint than its section dividers — `border-lightergrey`
   *  instead of `border-ink`. Only meaningful together with `divider: true`. */
  dividerLight?: boolean;
  /**
   * No reserved title column — Contract's "Adding an attachment to a
   * contract" / "Scaling with AI-assisted tooling": two titled topics
   * stack in columns 1-2 (flush left, no label column at all) beside one
   * wide image spanning columns 3-6 across both their rows. Confirmed via
   * get_metadata: the text column sits at x=0, not the usual x=172/344
   * indent. Only meaningful with exactly 2 topics and `wideImage` set.
   */
  flushStacked?: boolean;
  /** The wide image beside flush-stacked topics — see `flushStacked`.
   *  Rendered cropped to fill a fixed 656:707.5 box (Figma's own crop),
   *  not the source image's natural aspect ratio. */
  wideImage?: {
    src: string;
    alt: string;
  };
  /** A live iframe instead of `wideImage` — Contract's "Adding an
   *  attachment" section: Figma shows a static screenshot of the drawer
   *  here, but Clóves asked for the actual working HTML prototype embedded
   *  instead, same as the "View prototype" link beside it points to. */
  wideEmbed?: { src: string; title: string };
  /** A caption for `wideImage`, but positioned at the bottom of the LEFT
   *  (text) column, not under the image itself — confirmed via
   *  get_design_context on Contract's "Adding an attachment" section. */
  flushCaption?: string;
}

/**
 * A dark, full-bleed spotlight block — Loft's "Product Vision": a vision
 * statement, two small comparison lists side by side ("Rational" /
 * "Emotional" search criteria), a plain list ("Experience Principles"),
 * and a supporting photo. Genuinely one-off among this site's case
 * studies (every other block sits on the light canvas), so it's its own
 * field rather than a variant bolted onto `CaseStudyGroup`.
 */
export interface CaseStudySpotlight {
  title: string;
  statement: string;
  searchContextLabel: string;
  searchContext: { label: string; items: string[] }[];
  principlesLabel: string;
  principles: string[];
  image: { src: string; alt: string };
}

/** One column of Impact — "Results", "Process", or (Contract's case) unlabeled. */
export interface LabeledList {
  label?: string;
  items: string[];
}

/**
 * One item in a case study's main content flow, in the order it should
 * render. A `section` is a Problem/Understanding/Solution-shaped row (a
 * label plus two columns); a `group` is a second-level block (MVP,
 * Release Plan, Key decisions...) with its own topic grid; a `spotlight`
 * is the rare dark full-bleed block (Loft's Product Vision). Unifying
 * these into one ordered array — rather than separate `sections`/`groups`
 * arrays rendered as two back-to-back blocks — matters because a real
 * case study's narrative interleaves them: Loft's "Understanding" (a
 * group, for its cross-column row alignment) sits between "Context" (a
 * section) and "Business Opportunities" (another section), not after
 * every section the way two separate arrays would force it to.
 */
export type CaseStudyBlock =
  | ({ kind: "section" } & LabeledColumns)
  | ({ kind: "group" } & CaseStudyGroup)
  | ({ kind: "spotlight" } & CaseStudySpotlight);

/**
 * A full project case study page (src/app/work/[slug]/page.tsx). Only
 * projects with an entry here get a generated page — see
 * src/content/case-studies/.
 *
 * Generalized from the original Contract Template Management-only shape
 * so a case with a different narrative shape or set of deep-dive
 * features — like Loft App — doesn't need its own bespoke type and
 * components. A group's `embed` stays a distinct, optional field because
 * a live interactive prototype is a genuinely rare, deliberately wide
 * layout, not just another topic.
 */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tags: string[];
  heroImage: {
    src: string;
    alt: string;
    /**
     * Desktop banner shape. "wide" (default) matches a landscape
     * screenshot, like Contract's laptop shot. "portrait" gives a
     * shorter, more square box instead, for a source image — a phone
     * mockup, say — that's taller than it is wide, so an object-cover
     * crop against a very wide box wouldn't lose most of it.
     */
    desktopAspect?: "wide" | "portrait";
  };
  /** Paragraphs next to the title, under the hero image. */
  intro: string[];
  /** Vertical gap between top-level blocks, in px. Defaults to 48 (Contract's verified
   *  rhythm) — Loft's Figma measures a uniform 72px between every row instead. */
  rowGap?: number;
  /** The case's main narrative, in render order — see `CaseStudyBlock`. */
  content: CaseStudyBlock[];
  /** Trailing groups rendered after Impact — Loft's "Samples" and "Files and Prototypes",
   *  which sit at the very end of the Figma file, after the results. */
  closingGroups?: CaseStudyGroup[];
  impact: {
    /** Optional: Loft's Impact row has no lead-in sentence of its own. */
    intro?: string;
    /**
     * One unlabeled list (Contract's case) splits into two uneven
     * columns with continuous numbering, matching the original design.
     * Multiple labeled lists (Loft's "Results"/"Process", were it to use
     * this shape) each get their own column and number independently.
     */
    lists?: LabeledList[];
    /**
     * Loft's shape instead: labeled sub-blocks that are a stats grid
     * ("Product") or a plain topic grid, no numbering ("Process"). A
     * `CaseStudy` supplies either `lists` or `groups`, never both.
     */
    groups?: { label: string; stats?: StatsBlock; topics?: FeatureBlock[] }[];
  };
}
