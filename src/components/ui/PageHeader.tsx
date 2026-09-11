export function PageHeader({ title }: { title: string }) {
  return (
    <header>
      {/*
        Desktop: text-display's 123px line-height is taller than Figma's
        72px Page Header box, so negative top/bottom margins on the h2
        itself pull surrounding layout in to a net 72px footprint — the
        (4px-nudged) split is -21.5px top / -29.5px bottom rather than an
        even -25.5/-25.5, shifting the glyph down slightly to align its
        cap-height with "Hi!"'s.

        This is deliberately NOT a fixed-height flex-centered wrapper
        with overflowing content (what was here before): Chromium clips
        painted content that overflows its own box against a scrolling
        ancestor (main here) as soon as it's scrolled by any amount —
        negative margins don't have that problem since the h2's own box
        genuinely is 123px tall, nothing paints outside it; only the
        space siblings see around it is collapsed.

        Mobile keeps text-box-trim instead: it crops the line box down to
        cap-height so this aligns tightly with neighboring elements there
        (no fixed reference box like the desktop 72px one to match).
      */}
      <h2 className="max-md:[text-box-edge:cap_alphabetic] max-md:[text-box-trim:trim-both] font-sans max-md:text-[55px] max-md:leading-[1.05] max-md:tracking-[-0.03em] max-md:font-bold text-ink md:-mt-[21.5px] md:-mb-[29.5px] md:text-display">
        {title}
      </h2>
    </header>
  );
}
