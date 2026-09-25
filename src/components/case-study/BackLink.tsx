"use client";

import { useEffect, useState } from "react";

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

/**
 * Desktop-only: a copy of the back arrow pinned to the top-left of the
 * scroll area that fades in while scrolling up (past the inline arrow) and
 * out while scrolling down. Mobile already has a sticky inline arrow.
 */
export function FloatingBackLink({ href, label }: { href: string; label: string }) {
  const { navigate } = usePageTransition();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const scrollEl = document.querySelector<HTMLElement>(".scroll-area");
    if (!scrollEl) return;
    let last = scrollEl.scrollTop;

    const onScroll = () => {
      const current = scrollEl.scrollTop;
      const rect = scrollEl.getBoundingClientRect();
      const paddingLeft = parseFloat(getComputedStyle(scrollEl).paddingLeft) || 0;
      setPos({ left: rect.left + paddingLeft, top: rect.top + 16 });
      if (current < 120) setVisible(false);
      else if (current < last) setVisible(true);
      else if (current > last) setVisible(false);
      last = current;
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      onClick={(event) => {
        if (!isPlainLeftClick(event)) return;
        event.preventDefault();
        navigate(href);
      }}
      style={{ left: pos.left, top: pos.top }}
      className={`fixed z-20 hidden rounded-full bg-surface p-2 text-ink shadow-sm transition-[opacity,color] duration-300 ease-in-out hover:text-accent md:inline-flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowIcon direction="left" size={20} />
    </a>
  );
}
