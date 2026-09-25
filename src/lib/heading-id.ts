/**
 * Stable DOM id for a heading, derived from its text, so the `<section>`
 * it titles can point at it with `aria-labelledby`. Case and article
 * titles are unique within a page, so no counter is needed.
 */
export function headingId(text: string) {
  return `h-${text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}
