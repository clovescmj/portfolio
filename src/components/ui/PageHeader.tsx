export function PageHeader({ title }: { title: string }) {
  return (
    <header>
      {/*
        text-box-trim/text-box-edge crop the line box down to cap-height,
        matching Figma's own export for this text — without it, the
        99px font's 123px line-height pads the box well past the visible
        glyph, throwing off alignment with anything next to it.

        The mobile size/leading/tracking/weight below are max-md: on
        purpose, not bare utilities: text-display bundles those same
        properties via Tailwind's shared --tw-leading/--tw-tracking/
        --tw-font-weight custom properties, so a bare (unprefixed)
        leading-[...] here would keep winning at the md: breakpoint too,
        silently overriding text-display's own 123px line-height — that's
        exactly what was happening before this was scoped.
      */}
      <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-sans max-md:text-[55px] max-md:leading-[1.05] max-md:tracking-[-0.03em] max-md:font-bold text-ink md:text-display">
        {title}
      </h2>
    </header>
  );
}
