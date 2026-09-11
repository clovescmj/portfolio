"use client";

import Link from "next/link";
import { nav, site } from "@/content/site";
import { usePageTransition } from "./PageTransitionContext";

export function Sidebar() {
  const { navigate, activePath } = usePageTransition();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 overflow-y-auto px-6 py-8 md:w-[280px] md:gap-rhythm md:px-nav md:py-[48px]">
      <div className="flex flex-col gap-4 md:gap-6">
        <h1 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] w-full font-display text-ink md:w-[216px]">
          <span className="block text-[32px] leading-[1.05] tracking-[-0.03em] font-extrabold md:text-brand">
            {site.greeting}
          </span>
          <span className="block text-[32px] leading-[1.05] tracking-[-0.03em] font-extrabold md:text-brand">
            {site.title}
          </span>
        </h1>
        <p className="w-full font-sans text-body text-ink md:w-[216px]">{site.bio}</p>
      </div>

      <nav className="flex flex-row gap-6 md:flex-col md:gap-2">
        {nav.map((item) => {
          const active = activePath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.href);
              }}
              // Padding + an equal negative margin cancel out for layout
              // purposes (same trick as the card hover backdrop) so the
              // gray pill can bleed past the text without nudging the
              // other nav items around it.
              className={`relative -mx-3 -my-1 inline-block self-start px-3 py-1 font-sans text-nav text-ink transition-colors duration-400 ease-in-out hover:bg-surface-hover ${
                active ? "bg-surface-hover" : ""
              }`}
            >
              {/* font-weight can't be transitioned smoothly on a static
                  font file (no variable weight axis to interpolate
                  through, so it would just snap) — instead, a
                  regular-weight span and a bold-weight span sit stacked
                  on top of each other and crossfade. The bold span
                  (usually wider) also sizes the box via normal flow, so
                  the pill's width doesn't jump when the weight changes. */}
              <span aria-hidden className="invisible whitespace-nowrap font-bold">
                {item.label}
              </span>
              <span
                aria-hidden={active}
                className={`absolute inset-0 whitespace-nowrap transition-opacity duration-200 ease-out ${
                  active ? "opacity-0" : "opacity-100"
                }`}
              >
                {item.label}
              </span>
              <span
                aria-hidden={!active}
                className={`absolute inset-0 whitespace-nowrap font-bold transition-opacity duration-200 ease-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* No room for it in the Figma mobile frame — every card already
          makes for a long single-column page there. */}
      <p className="mt-auto hidden whitespace-pre-line font-sans text-meta text-muted md:block">
        {site.footer}
      </p>
    </aside>
  );
}
