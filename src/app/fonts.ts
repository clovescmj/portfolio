import localFont from "next/font/local";

/**
 * The one real typeface from the Figma file, self-hosted from the
 * licensed files in src/fonts/. Exposes a CSS variable that globals.css
 * wires into --font-sans.
 */
export const braunLinear = localFont({
  src: [
    { path: "../fonts/BraunLinear-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/BraunLinear-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/BraunLinear-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-braun-linear",
  display: "swap",
});
