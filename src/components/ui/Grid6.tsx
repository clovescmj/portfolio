import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

/**
 * The site's shared 6-column grid (one column on mobile, six equal 140px
 * columns with a 32px gutter from `md` up — `page-grid` in globals.css).
 * Every case-study / article / about-page row is one of these; a new
 * section is a matter of composing one `<Grid6>` plus typed children, not
 * re-deriving `grid-cols-[repeat(6,minmax(0,1fr))]` by hand again.
 */
const grid6 = cva("page-grid", {
  variants: {
    /** Row gap: `y` is the common case (a fixed value), `responsive` is
     *  the "tighter on mobile" pattern used for the Problem/Understanding/
     *  Solution row shape. */
    rowGap: {
      none: "",
      sm: "gap-y-3 md:gap-y-6",
      md: "gap-y-3 md:gap-y-10",
      lg: "gap-y-10",
      /** Mobile keeps the normal stacked-card gap; desktop uses
       *  `--spacing-title-gap` — for a grid whose only real desktop row
       *  gap is a heading splitting from its own body (`ColumnsSection`'s
       *  two-row columns). Harmless when desktop never has a second row
       *  (nothing to gap against) — same as `md` was before this existed. */
      title: "gap-y-3 md:gap-y-[length:var(--spacing-title-gap)]",
    },
    /** Reserves the shared right inset (`--spacing-content`) so content
     *  doesn't run to the bleed edge a parent `<Bleed>` opened up. */
    insetRight: {
      true: "md:pr-content",
      false: "",
    },
  },
  defaultVariants: { rowGap: "none", insetRight: false },
});

export function Grid6({
  rowGap,
  insetRight,
  className = "",
  ...rest
}: { className?: string } & VariantProps<typeof grid6> & ComponentPropsWithoutRef<"div">) {
  return <div className={`${grid6({ rowGap, insetRight })} ${className}`.trim()} {...rest} />;
}
