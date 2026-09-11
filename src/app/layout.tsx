import type { Metadata } from "next";
import "./globals.css";
import { braunLinear, helveticaNeueHeavy } from "./fonts";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageTransitionProvider } from "@/components/layout/PageTransitionContext";
import { ScrollArea } from "@/components/layout/ScrollArea";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Clóves — Portfolio",
  description:
    "Product Designer with over 10 years of experience turning real user problems into experiences that drive business impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${helveticaNeueHeavy.variable} ${braunLinear.variable}`}
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
      <body className="h-full overflow-hidden p-4 md:p-gutter">
        <PageTransitionProvider>
          <div
            id="shell"
            className="mx-auto flex h-[calc(100vh-32px)] w-full max-w-[1440px] flex-col overflow-y-auto bg-surface md:h-[calc(100vh-48px)] md:flex-row md:overflow-visible"
          >
            <Sidebar />
            <ScrollArea>
              <PageTransition>{children}</PageTransition>
            </ScrollArea>
          </div>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
