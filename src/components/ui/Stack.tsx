import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

/**
 * The flex-column-with-a-named-gap wrapper every block in this site reaches
 * for. `gap` is restricted to the spacing tokens in globals.css — never a
 * raw Tailwind number — so a new call site can't quietly introduce its own
 * one-off spacing the way `gap-1`/`gap-2`/`gap-6` drifted apart before this
 * was a single component (see docs/architecture.md#primitives).
 */
export const stack = cva("flex flex-col", {
  variants: {
    gap: {
      none: "",
      /** Title → its own body/list, inside one title block. */
      title: "gap-title",
      /** Between sibling title blocks in the same list/column. */
      block: "gap-block",
      /** Between whole sibling subsections. */
      subsection: "gap-subsection",
      /** Escape hatches for the handful of plain Tailwind values that
       *  aren't a named role (bullet-list line spacing, mostly) — prefer
       *  a named gap above when the value has a real role to name. */
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
  },
  defaultVariants: { gap: "none" },
});

type StackProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & VariantProps<typeof stack> &
  Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Stack<T extends ElementType = "div">({ as, gap, className = "", children, ...rest }: StackProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={`${stack({ gap })} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
