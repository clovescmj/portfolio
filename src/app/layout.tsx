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
        The fixed-height shell with its own internal scroll (ScrollArea)
        is a desktop-only pattern — the Figma mobile frame is one long
        page instead, so on mobile the body just scrolls normally and
        nothing here is height-constrained.
      */}
      <body className="min-h-full p-4 md:h-full md:overflow-hidden md:p-gutter">
        <PageTransitionProvider>
          <div className="mx-auto flex w-full max-w-[1440px] flex-col bg-surface md:h-[calc(100vh-48px)] md:flex-row">
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
