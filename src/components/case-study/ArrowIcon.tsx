const LEFT_PATH =
  "M14.2871 2.28906L6.30957 10.2646H28V13.502H6.08008L14.29 21.7109L12 24L0.551758 12.5537L0.554688 12.5498L0 11.9951L11.998 0L14.2871 2.28906Z";
const RIGHT_PATH =
  "M13.7129 2.28906L21.6904 10.2646H0V13.502H21.9199L13.71 21.7109L16 24L27.4482 12.5537L27.4453 12.5498L28 11.9951L16.002 0L13.7129 2.28906Z";

/**
 * Inlined (not <Image src="...svg">) so `currentColor` actually resolves
 * against the surrounding text color — an externally-referenced <img> SVG
 * is opaque to the page's CSS and can't pick up hover color changes.
 *
 * Left/right are two distinct paths (from public/images/projects/
 * arrow-left.svg and arrow-right.svg), not one mirrored via CSS — they
 * aren't quite symmetric. `size` sets the rendered height; width follows
 * the source's 28:24 aspect ratio.
 */
export function ArrowIcon({
  direction = "left",
  size = 24,
  className,
}: {
  direction?: "left" | "right";
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={(28 / 24) * size}
      height={size}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d={direction === "left" ? LEFT_PATH : RIGHT_PATH} fill="currentColor" />
    </svg>
  );
}
