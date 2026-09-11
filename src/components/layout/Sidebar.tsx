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
          <span className="block text-[31px] leading-[1] tracking-[-0.03em] font-extrabold md:text-brand">
            {site.greeting}
          </span>
          <span className="block text-[31px] leading-[1] tracking-[-0.03em] font-extrabold md:text-brand">
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
              className={`font-sans text-nav transition-colors duration-400 ease-in-out hover:text-accent ${
                active ? "font-bold text-accent" : "text-ink"
              }`}
            >
              {item.label}
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
