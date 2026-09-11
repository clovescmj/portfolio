export function PageHeader({ title }: { title: string }) {
  return (
    <header>
      {/*
        text-box-trim/text-box-edge crop the line box down to cap-height,
        matching Figma's own export for this text — without it, the
        99px font's ~109px line-height pads the box well past the visible
        glyph, throwing off alignment with anything next to it.
      */}
      <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-display text-[55px] leading-[1.05] tracking-[-0.03em] font-extrabold text-ink md:text-display">
        {title}
      </h2>
    </header>
  );
}
