"use client";

import { FADE_DURATION, usePageTransition } from "./PageTransitionContext";

/**
 * Fades `children` based on PageTransitionContext's `visible` flag. Since
 * navigation itself is deferred until the fade-out completes (see
 * PageTransitionProvider), `children` only ever changes to the new page
 * while this is already hidden — no buffering of the outgoing page needed
 * here, just a plain opacity transition.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { visible } = usePageTransition();

  return (
    <div
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      className={`transition-opacity ease-out ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {children}
    </div>
  );
}
