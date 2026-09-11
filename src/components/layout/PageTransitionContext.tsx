"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

/** Shared with PageTransition.tsx, which applies this as its CSS transition duration. */
export const FADE_DURATION = 150;

interface PageTransitionContextValue {
  visible: boolean;
  navigate: (href: string) => void;
  /**
   * The path nav links should treat as "current" — the real `pathname`,
   * except during a pending navigation, where it's the clicked href. That
   * makes the active nav item update the instant you click, instead of
   * waiting out the fade-out + navigation before `pathname` itself moves.
   */
  activePath: string;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

/**
 * Drives page-to-page fades imperatively instead of reacting to a
 * `pathname` change after the fact: `navigate` fades the current page out
 * first, and only calls `router.push` once that's done — so the new
 * route's content only ever gets fetched/rendered while already hidden,
 * however long that takes. When it lands, `pathname` updates and this
 * fades it back in. No race between "did the content already swap?" and
 * "has the fade finished?", because content can't swap before the fade
 * starts.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const navigatingRef = useRef(false);

  const navigate = (href: string) => {
    if (href === pathname || navigatingRef.current) return;
    navigatingRef.current = true;
    setPendingHref(href);
    setVisible(false);
    setTimeout(() => {
      router.push(href);
    }, FADE_DURATION);
  };

  // Scroll position resets here too — not in a separate effect elsewhere
  // — so it's driven by the same navigation this effect is already
  // reacting to, rather than racing it via its own independent effect.
  // It's deferred a frame with requestAnimationFrame because scrollTo()
  // forces a synchronous layout flush; doing that in the same tick as
  // the setVisible(true) that starts the fade-in transition was
  // preventing the browser from ever registering an opacity-0 "from"
  // state to animate out of, so the fade-in silently snapped straight
  // to opacity-100 instead of playing. One deferred frame is well
  // within the fade's opacity-near-zero window, so the scroll jump
  // itself stays imperceptible.
  useEffect(() => {
    if (navigatingRef.current) {
      navigatingRef.current = false;
      setVisible(true);
      setPendingHref(null);
      requestAnimationFrame(() => {
        document.querySelector(".scroll-area")?.scrollTo({ top: 0 });
        document.getElementById("shell")?.scrollTo({ top: 0 });
      });
    }
  }, [pathname]);

  return (
    <PageTransitionContext.Provider
      value={{ visible, navigate, activePath: pendingHref ?? pathname }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return ctx;
}
