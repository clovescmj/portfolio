"use client";

import { isPlainLeftClick, usePageTransition } from "@/components/layout/PageTransitionContext";
import { ArrowIcon } from "./ArrowIcon";

/** Same fade-transition navigation as the sidebar nav links, not a plain <Link>. */
export function BackLink({ href, label }: { href: string; label: string }) {
  const { navigate } = usePageTransition();

  return (
    <a
      href={href}
      aria-label={label}
      onClick={(event) => {
        if (!isPlainLeftClick(event)) return;
        event.preventDefault();
        navigate(href);
      }}
      className="inline-flex w-fit max-md:py-3 text-ink transition-colors duration-400 ease-in-out hover:text-accent"
    >
      <ArrowIcon direction="left" size={20} />
    </a>
  );
}
