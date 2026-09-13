/**
 * No background card anymore — the user removed it in Figma ("quebrava o
 * grid"), so this is now plain content like Problem/Solution, just with
 * its own grid: heading in column 1, intro spanning 1-2, and the numbered
 * list split into two explicit, unevenly-sized columns (2 items, then 3)
 * rather than one list wrapping evenly into two.
 */
export function Impact({
  intro,
  itemsLeft,
  itemsRight,
}: {
  intro: string;
  itemsLeft: string[];
  itemsRight: string[];
}) {
  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-x-6 md:gap-y-10 md:pr-content">
      <h2 className="font-sans text-heading-2 text-ink md:col-span-1 md:col-start-1 md:row-start-1">
        Impact
      </h2>

      <p className="font-sans text-nav text-ink md:col-span-3 md:col-start-3 md:row-start-1">{intro}</p>

      <ol className="flex flex-col gap-2 font-sans text-body text-ink md:col-span-2 md:col-start-3 md:row-start-2">
        {itemsLeft.map((item, i) => (
          <li key={item} className="flex gap-3">
            <span className="font-medium">{i + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <ol className="flex flex-col gap-2 font-sans text-body text-ink md:col-span-2 md:col-start-5 md:row-start-2">
        {itemsRight.map((item, i) => (
          <li key={item} className="flex gap-3">
            <span className="font-medium">{i + itemsLeft.length + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
