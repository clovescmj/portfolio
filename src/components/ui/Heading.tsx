import type { ElementType, ReactNode } from "react";

/**
 * Visual style of a heading, one per type-scale token in globals.css. The
 * names match the tag each one normally goes on: h1 is the page title, h2 a
 * section, h3 a group inside it, and so on.
 *
 * Kept separate from `level` on purpose: the tag says where the heading
 * sits in the document outline, the variant says how it looks. A group
 * title that happens to sit under an h2 section is `level={3}`, and so on.
 *
 *   h1  48px  title of a case study or article
 *   h2  32px  section (Problem, Solution, Impact, App Evolution...)
 *   h3  24px  group inside a section (MVP, Release Plan, User Setup...)
 *   h4  18px  subtitle or item title (Usage Data, Effective Team Integration...)
 *   h5  16px  smallest title, used where an h3 has to hold items without an h4
 */
export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5";

/** HTML heading level, i.e. the document outline. Never skip a level. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

// Full class names, not built from the variant string: Tailwind only
// generates classes it can find as literals in the source.
const VARIANT_CLASS: Record<HeadingVariant, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  h5: "text-h5",
};

const TONE_CLASS = {
  ink: "text-ink",
  surface: "text-surface",
} as const;

export function Heading({
  level,
  variant,
  tone = "ink",
  className = "",
  id,
  children,
}: {
  level: HeadingLevel;
  variant: HeadingVariant;
  tone?: keyof typeof TONE_CLASS;
  className?: string;
  /** Set when a `<section aria-labelledby>` points at this heading. */
  id?: string;
  children: ReactNode;
}) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag id={id} className={`font-sans ${VARIANT_CLASS[variant]} ${TONE_CLASS[tone]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
