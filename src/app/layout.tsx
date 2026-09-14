import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { braunLinear } from "./fonts";
import { EmailLink } from "@/components/layout/EmailLink";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageTransitionProvider } from "@/components/layout/PageTransitionContext";
import { ScrollArea } from "@/components/layout/ScrollArea";
import { Sidebar } from "@/components/layout/Sidebar";
import { secondaryLinks, site } from "@/content/site";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Clóves Cardoso — Staff Product Designer",
  description:
    "Product Designer with over 10 years of experience turning real user problems into experiences that drive business impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${braunLinear.variable}`}
    >
      {/*
        The white shell always stays fixed at viewport height — it's a
        "card" that encapsulates the content, not a page that grows past
        the screen. What differs by breakpoint is *what* scrolls inside
        it: on desktop, the sidebar stays put and only ScrollArea's main
        scrolls; on mobile there's no separate pinned sidebar (per the
        Figma mobile frame), so this shell itself is the scroll container
        and sidebar + content scroll together as one block within it.
      */}
      <body className="h-full overflow-hidden p-3 md:p-gutter">
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="78a29146-a745-4f41-9ed0-9c6aab5ea570"
        />
        <PageTransitionProvider>
          <div
            id="shell"
            // No top/bottom padding here on purpose: Sidebar (fixed,
            // never scrolls) and ScrollArea's main (the thing that
            // actually scrolls) each carry their own 40px top/bottom
            // padding instead. Putting it here made it a static band
            // that never moved as main scrolled — content should only
            // ever be cropped at the true start/end of the scrollable
            // range, not against a fixed inset.
            className="mx-auto flex h-[calc(100vh-24px)] w-full max-w-[1440px] flex-col overflow-y-auto bg-surface md:h-[calc(100vh-48px)] md:flex-row md:overflow-visible"
          >
            <Sidebar />
            <ScrollArea>
              <PageTransition>{children}</PageTransition>
              {/*
                On desktop this same block lives in Sidebar, pinned to the
                bottom of the (fixed-height) sidebar column via mt-auto —
                independent of how long the page content is. Mobile has no
                separate pinned sidebar (sidebar and content scroll together
                as one block, see #shell above), so there's no "bottom of
                the sidebar" to pin it to; it sits after the page content
                instead, as a real page footer.
              */}
              <div className="mt-16 flex flex-col gap-10 md:hidden">
                <div className="flex flex-col gap-4">
                  {secondaryLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.external ? link.href : assetPath(link.href)}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : { download: true })}
                      className="self-start font-sans text-[14px] leading-[1] text-ink transition-colors duration-400 ease-in-out hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                  <EmailLink className="self-start font-sans text-[14px] leading-[1] text-ink transition-colors duration-400 ease-in-out hover:text-accent" />
                </div>
                <p className="whitespace-pre-line font-sans text-meta text-muted">{site.footer}</p>
              </div>
            </ScrollArea>
          </div>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
