import type { ReactNode } from "react";
import { Heading, type HeadingLevel, type HeadingVariant } from "./Heading";
import { Stack } from "./Stack";

/**
 * A title plus the text/list directly under it — the one shape every case
 * study is built from (Process, Pain Points, Problem's six blocks, a
 * topic's own sub-items...). Always `gap-title` between the two, so this
 * is the single place that rhythm is encoded, not re-typed at every call
 * site. `children` is the body; pass nothing for a title-only block (a
 * chapter's own label, rendered with `-mb-*` by its caller).
 */
export function TitledBlock({
  title,
  level,
  variant,
  id,
  className = "",
  children,
}: {
  title?: ReactNode;
  level: HeadingLevel;
  variant: HeadingVariant;
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Stack gap="title" className={className}>
      {title && (
        <Heading level={level} variant={variant} id={id}>
          {title}
        </Heading>
      )}
      {children}
    </Stack>
  );
}
