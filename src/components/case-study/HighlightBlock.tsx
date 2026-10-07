import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

/**
 * A full-bleed, tinted-background block that spans true edge to true
 * edge — Loft's dark "Product Vision" spotlight and the case-study
 * carousel/prototype highlight both reuse this instead of each hand-rolling
 * the same bleed math. Unlike Hero (which only bleeds right — the page's
 * shared `pl-content` inset already covers its left edge), this bleeds on
 * BOTH sides: past the page's shared left inset, out to the sidebar
 * boundary. `md:-ml-content` cancels the parent's `pl-content` for just
 * this block, and the matching width bump keeps the right edge exactly
 * where it already was (the shared right-bleed every block gets by
 * default). Mobile bleeds past the page's 24px gutter the same way.
 *
 * The content wrapper one level in re-adds `pl-content`/`pr-content`, so
 * children render at the normal page inset while only the background
 * bleeds — children bring their own inner layout (grid, flex, whatever
 * the block needs), this only owns the bleed/background/padding shell.
 *
 * `tone` is a closed set (`dark` | `light`), not a free-form background
 * class string — the three call sites only ever needed two real looks, so
 * the type now says that instead of accepting any Tailwind class a typo
 * could silently break.
 */
const highlightBlock = cva(
  "relative -mx-6 w-[calc(100%+48px)] px-6 py-10 md:w-[calc(100%+56px)] md:-ml-content md:px-0 md:py-12",
  {
    variants: {
      tone: {
        dark: "bg-ink",
        // Links on the grey tint read in ink with the underline at rest, and
        // take the accent orange on hover and keyboard focus.
        light: "bg-placeholder [&_.link]:text-ink [&_.link:hover]:text-accent [&_.link:focus-visible]:text-accent",
      },
    },
    defaultVariants: { tone: "light" },
  },
);

export function HighlightBlock({
  tone,
  labelledBy,
  children,
}: {
  /** Id of the heading inside, when this block is a titled `<section>`. */
  labelledBy?: string;
  children: ReactNode;
} & VariantProps<typeof highlightBlock>) {
  const Root = labelledBy ? "section" : "div";
  return (
    <Root aria-labelledby={labelledBy} className={highlightBlock({ tone })}>
      <div className="md:pl-content md:pr-content">{children}</div>
    </Root>
  );
}
