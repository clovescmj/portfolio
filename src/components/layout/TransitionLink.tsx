"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { isPlainLeftClick, usePageTransition } from "./PageTransitionContext";

/**
 * Internal link that goes through the page fade (see PageTransitionContext)
 * instead of an instant route change. Every in-site link should use this;
 * modified clicks (Cmd/Ctrl, Shift, middle-click) fall through to the
 * browser's own behavior.
 */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !isPlainLeftClick(event)) return;
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
}
