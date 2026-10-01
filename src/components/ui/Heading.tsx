import { cva, type VariantProps } from "class-variance-authority";
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
 *   h4  18px  subtitle (Usage Data, Main Flows & Features...)
 *   h5  16px  item title or list label (Goals, Effective Team Integration...)
 *
 * Built on `cva`: a variant map is exactly what this always was
 * (`Record<Variant, string>` + a typed prop), `cva` just gives that pattern
 * a standard shape — the same one every other variant-bearing component in
 * this file's family (`EmbedFrame`, `HighlightBlock`, `WorkCard`...) uses.
 */
const heading = cva("font-sans", {
  variants: {
    variant: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
    },
    tone: {
      ink: "text-ink",
      surface: "text-surface",
    },
  },
  defaultVariants: { tone: "ink" },
});

export type HeadingVariant = NonNullable<VariantProps<typeof heading>["variant"]>;

/** HTML heading level, i.e. the document outline. Never skip a level. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export function Heading({
  level,
  variant,
  tone,
  className = "",
  id,
  children,
}: {
  level: HeadingLevel;
  className?: string;
  /** Set when a `<section aria-labelledby>` points at this heading. */
  id?: string;
  children: ReactNode;
} & VariantProps<typeof heading>) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag id={id} className={`${heading({ variant, tone })} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
