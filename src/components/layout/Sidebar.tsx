"use client";

import Link from "next/link";
import { nav, secondaryLinks, site } from "@/content/site";
import { assetPath } from "@/lib/asset-path";
import { usePageTransition } from "./PageTransitionContext";

export function Sidebar() {
  const { navigate, activePath } = usePageTransition();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 overflow-y-auto px-6 py-8 md:w-[280px] md:gap-menu md:px-nav md:py-[40px]">
      <div className="flex flex-col gap-4 md:gap-6">
        {/*
          max-md: here, not bare utilities — text-brand bundles the same
          size/leading/tracking/weight via Tailwind's shared --tw-leading/
          --tw-tracking/--tw-font-weight custom properties, so an
          unprefixed leading-[...] would keep winning at md: too and
          silently override text-brand's own line-height.

          No text-box-trim at all: Braun Linear's cap-height metrics make
          it paint glyphs outside the box the trim computes — on desktop
          that broke scrolling (Chromium clips the overflow against the
          scrollable aside), on mobile it just paints "Hi!" above its own
          box. Both breakpoints already use leading-[1] / a 41px
          line-height matching the font-size almost exactly, so there's
          barely any leading to trim in the first place — dropping it
          costs nothing visible.
        */}
        <h1 className="w-full font-sans text-ink md:w-[216px]">
          <span className="block max-md:text-[31px] max-md:leading-[1] max-md:tracking-[-0.03em] max-md:font-bold md:text-brand">
            {site.greeting}
          </span>
          <span className="block max-md:text-[31px] max-md:leading-[1] max-md:tracking-[-0.03em] max-md:font-bold md:text-brand">
            {site.title}
          </span>
        </h1>
        <p className="w-full font-sans text-body text-ink md:w-[216px]">{site.bio}</p>
      </div>

      <nav className="flex flex-row gap-6 md:flex-col md:gap-1">
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
              className={`self-start font-sans text-nav transition-colors duration-400 ease-in-out hover:text-accent ${
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
      <div className="mt-auto hidden flex-col gap-10 md:flex">
        <div className="flex flex-col gap-1">
          {secondaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.external ? link.href : assetPath(link.href)}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : { download: true })}
              className="self-start font-sans text-[12px] text-muted transition-colors duration-400 ease-in-out hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="whitespace-pre-line font-sans text-meta text-muted">{site.footer}</p>
      </div>
    </aside>
  );
}
