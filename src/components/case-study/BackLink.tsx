"use client";

import { usePageTransition } from "@/components/layout/PageTransitionContext";
import { ArrowIcon } from "./ArrowIcon";

/** Same fade-transition navigation as the sidebar nav links, not a plain <Link>. */
export function BackLink({ href, label }: { href: string; label: string }) {
  const { navigate } = usePageTransition();

  return (
    <a
      href={href}
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
      className="inline-flex w-fit text-ink transition-colors duration-400 ease-in-out hover:text-accent"
    >
      <ArrowIcon direction="left" size={24} />
    </a>
  );
}
