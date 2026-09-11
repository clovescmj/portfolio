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
      <body className="h-full overflow-hidden p-4 md:p-gutter">
        <PageTransitionProvider>
          <div className="mx-auto flex h-[calc(100vh-32px)] w-full max-w-[1440px] flex-col bg-surface md:h-[calc(100vh-48px)] md:flex-row">
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
