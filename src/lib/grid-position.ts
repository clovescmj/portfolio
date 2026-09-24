/**
 * Tailwind only generates CSS for class names it finds as literal text, so
 * every grid position in this codebase is a lookup into a fixed-length
 * array of literal `md:col-start-N`/`md:row-start-N` strings, indexed by
 * a content array's position (see SolutionGroup.tsx/Impact.tsx). Indexing
 * past the end silently degrades to `undefined` — the item then falls
 * into ordinary grid auto-flow and can overlap its positioned neighbors,
 * with nothing at build time to say why. This warns once, in dev only, so
 * a content author adding "one more" item finds out from the console
 * instead of from a broken layout.
 */
export function gridPositionClass(classes: readonly string[], index: number, label: string): string {
  const positionClass = classes[index];
  if (positionClass === undefined && process.env.NODE_ENV !== "production") {
    console.warn(
      `[${label}] no position class for index ${index} — only ${classes.length} defined. ` +
        "This item will fall into default grid auto-flow instead of its intended spot.",
    );
  }
  return positionClass ?? "";
}
