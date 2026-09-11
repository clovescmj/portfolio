"use client";

import Link from "next/link";
import { nav, site } from "@/content/site";
import { usePageTransition } from "./PageTransitionContext";

export function Sidebar() {
  const { navigate, activePath } = usePageTransition();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-8 overflow-y-auto px-6 py-8 md:w-[280px] md:gap-rhythm md:px-nav md:py-[48px]">
      <div className="flex flex-col gap-6">
        <h1 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] w-[216px] font-display text-ink">
          <span className="block text-brand">{site.greeting}</span>
          <span className="block text-brand">{site.title}</span>
        </h1>
        <p className="w-[216px] font-sans text-body text-ink">{site.bio}</p>
      </div>

      <nav className="flex flex-col gap-2">
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
              // font-weight can't be transitioned smoothly on a static font
              // file (no variable weight axis to interpolate through, so it
              // would just snap) — instead, a regular-weight span and a
              // bold-weight span sit stacked on top of each other and
              // crossfade, giving a real animated transition between them.
              // The bold span (usually wider) also sizes the box, so the
              // link's width doesn't jump when the weight changes.
              className="group relative inline-block self-start font-sans text-nav text-ink"
            >
              <span aria-hidden className="invisible whitespace-nowrap font-bold">
                {item.label}
              </span>
              <span
                aria-hidden={active}
                className={`absolute inset-0 whitespace-nowrap underline decoration-ink decoration-[6%] underline-offset-4 transition-[opacity,text-decoration-color] duration-200 ease-out group-hover:decoration-transparent ${
                  active ? "opacity-0" : "opacity-100"
                }`}
              >
                {item.label}
              </span>
              <span
                aria-hidden={!active}
                className={`absolute inset-0 whitespace-nowrap font-bold transition-opacity duration-100 ease-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <p className="mt-auto whitespace-pre-line font-sans text-meta text-muted">
        {site.footer}
      </p>
    </aside>
  );
}
