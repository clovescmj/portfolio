import type { ComponentPropsWithoutRef } from "react";

/**
 * Cancels the scroll area's left/right inset so a full-bleed block (hero,
 * highlight, a case page's own content column) can reach the right edge,
 * then puts the left margin back. See `bleed-content` in globals.css for
 * the mechanics; this is just a named wrapper so call sites read as
 * "this bleeds" instead of repeating the two Tailwind classes.
 */
export function Bleed({ className = "", ...rest }: { className?: string } & ComponentPropsWithoutRef<"div">) {
  return <div className={`bleed-content ${className}`.trim()} {...rest} />;
}
