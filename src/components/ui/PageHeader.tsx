export function PageHeader({ title }: { title: string }) {
  return (
    <header>
      {/*
        Desktop: hand-tuned live in DevTools against the real render —
        text-display has no explicit line-height (falls back to the
        browser's default "normal"), no margin-bottom compensation, and
        a single margin-top (-37.16px) pulling the glyph up to align with
        "Hi!". This replaces the earlier 72px-footprint/negative-margin
        derivation now that line-height isn't a known, calculable value
        to derive an overflow from.

        Negative margin-top (not a fixed-height flex-centered wrapper):
        Chromium clips painted content that overflows its own box against
        a scrolling ancestor (main here) as soon as it's scrolled by any
        amount. A negative margin doesn't have that problem since nothing
        paints outside the h2's own box; only the space siblings see
        above it is collapsed.

        Mobile keeps text-box-trim instead: it crops the line box down to
        cap-height so this aligns tightly with neighboring elements there
        (no fixed reference box like the desktop 72px one to match).
      */}
      <h1 className="max-md:[text-box-edge:cap_alphabetic] max-md:[text-box-trim:trim-both] font-sans max-md:text-[55px] max-md:leading-[1.05] max-md:tracking-[-0.03em] max-md:font-bold text-ink md:-mt-[37.16px] md:text-display">
        {title}
      </h1>
    </header>
  );
}
