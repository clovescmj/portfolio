import localFont from "next/font/local";

/**
 * The two real typefaces from the Figma file, self-hosted from the
 * licensed files in src/fonts/. Each exposes a CSS variable that
 * globals.css wires into --font-display / --font-sans.
 */
export const helveticaNeueHeavy = localFont({
  src: "../fonts/HelveticaNeueLTStd-85Heavy.otf",
  weight: "800",
  style: "normal",
  variable: "--font-helvetica-heavy",
  display: "swap",
});

export const braunLinear = localFont({
  src: [
    { path: "../fonts/BraunLinear-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/BraunLinear-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/BraunLinear-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-braun-linear",
  display: "swap",
});
