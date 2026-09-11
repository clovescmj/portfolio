"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const TOP_INSET = 18;
const BOTTOM_INSET = 18;
const MIN_THUMB_HEIGHT = 24;
const HIDE_DELAY = 600;

interface ThumbMetrics {
  height: number;
  top: number;
}

/**
 * The scrollable content column. Wraps `main` so a custom scrollbar thumb
 * (a real element, not a `::-webkit-scrollbar-thumb`) can be positioned
 * next to it and kept in sync with scroll position via JS — the native
 * pseudo-element approach doesn't animate reliably on hover in Chromium,
 * so this is the only way to get an actually smooth transition. It's also
 * draggable, which a pure CSS scrollbar replacement can't be on its own.
 *
 * The thumb behaves like an overlay scrollbar: scrolling or moving the
 * pointer inside this area shows it and resets a `HIDE_DELAY`ms idle
 * timer, so it fades out both when the pointer leaves AND when it just
 * sits still inside the area without moving.
 */
export function ScrollArea({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<ThumbMetrics | null>(null);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const showThumb = useCallback(() => {
    if (!visibleRef.current) {
      visibleRef.current = true;
      setVisible(true);
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      visibleRef.current = false;
      setVisible(false);
    }, HIDE_DELAY);
  }, [clearHideTimer]);

  const pulse = useCallback(() => {
    showThumb();
    scheduleHide();
  }, [showThumb, scheduleHide]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const contentEl = contentRef.current;
    if (!scrollEl || !contentEl) return;

    const measure = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      if (scrollHeight <= clientHeight) {
        setThumb(null);
        return;
      }
      const trackHeight = clientHeight - TOP_INSET - BOTTOM_INSET;
      const height = Math.max((clientHeight / scrollHeight) * trackHeight, MIN_THUMB_HEIGHT);
      const maxTop = trackHeight - height;
      const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop;
      setThumb({ height, top });
    };

    const onScroll = () => {
      measure();
      pulse();
    };

    measure();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scrollEl);
    resizeObserver.observe(contentEl);

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      clearHideTimer();
    };
  }, [pulse, clearHideTimer]);

  // On desktop this is a custom scroll container, not the window, so
  // Next's built-in scroll restoration doesn't reach it — reset both here:
  // scrollRef for the desktop internal scroll, window for mobile's plain
  // document scroll. Each is a no-op on the breakpoint that doesn't use it.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scrollEl = scrollRef.current;
    if (!scrollEl || !thumb) return;
    event.preventDefault();

    const startY = event.clientY;
    const startScrollTop = scrollEl.scrollTop;
    const trackHeight = scrollEl.clientHeight - TOP_INSET - BOTTOM_INSET;
    const maxThumbTop = trackHeight - thumb.height;
    const maxScrollTop = scrollEl.scrollHeight - scrollEl.clientHeight;

    setDragging(true);
    pulse();
    document.body.style.userSelect = "none";

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const deltaScroll = maxThumbTop > 0 ? (deltaY / maxThumbTop) * maxScrollTop : 0;
      scrollEl.scrollTop = Math.min(Math.max(startScrollTop + deltaScroll, 0), maxScrollTop);
      pulse();
    };

    const onPointerUp = () => {
      setDragging(false);
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      scheduleHide();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div className="relative min-h-0 min-w-0 flex-1" onPointerEnter={pulse} onPointerMove={pulse}>
      <main
        ref={scrollRef}
        className="scroll-area px-6 py-10 md:h-full md:overflow-y-auto md:px-content md:py-12"
      >
        <div ref={contentRef}>{children}</div>
      </main>

      {thumb && (
        <div
          aria-hidden
          className={`group absolute bottom-[18px] right-1 top-[18px] w-4 touch-none transition-opacity duration-300 ${
            visible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onPointerDown={handlePointerDown}
        >
          {/*
            Animating `width` directly is layout-triggering and reads as
            choppy/stop-motion in practice — `scale` is compositor-only
            and animates smoothly. The element is always 4px wide;
            scale-x-50 just visually halves it to 2px at rest. Tailwind's
            scale/translate utilities set the standalone CSS `scale` /
            `translate` properties (not the legacy `transform` shorthand),
            so `scale` — not `transform` — is what transition-property
            needs to actually animate it.
          */}
          <div
            className={`absolute left-1/2 w-[4px] origin-center -translate-x-1/2 transition-[scale,background-color] duration-400 ease-in-out ${
              dragging ? "scale-x-100 bg-ink" : "scale-x-50 bg-muted group-hover:scale-x-100 group-hover:bg-ink"
            }`}
            style={{ height: thumb.height, top: thumb.top }}
          />
        </div>
      )}
    </div>
  );
}
