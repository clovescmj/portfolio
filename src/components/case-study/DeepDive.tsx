import { EmbedFrame } from "./EmbedFrame";

/**
 * "Approval flow" / "Attachment library" / "Scaling with AI-assisted
 * tooling" / the embedded prototype all live in ONE shared 6-column grid
 * in Figma, over 2 rows: row 1 pairs Approval flow (cols 1-2) with
 * Attachment library (cols 4-5); row 2 pairs Scaling (cols 1-2) with the
 * embed (cols 3-5, wider than the text columns) and its caption alone in
 * the last column. Each heading+body is one group, not separate grid
 * children, so they stay together at any width.
 *
 * Grid placement doesn't depend on source order, so the JSX below is
 * written in natural reading order for when the grid isn't active yet,
 * below md.
 */
export function DeepDive({
  approvalFlow,
  attachmentLibrary,
  scaling,
  embed,
}: {
  approvalFlow: { intro: string; list: string[] };
  attachmentLibrary: { body: string[] };
  scaling: string[];
  embed: { src: string; caption: string };
}) {
  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-x-8 md:gap-y-10 md:pr-content">
      <div className="flex flex-col gap-4 md:col-span-2 md:col-start-1 md:row-start-1">
        <h2 className="font-sans text-heading-3 text-ink">Approval flow</h2>
        <div className="flex flex-col gap-2 font-sans text-body text-ink">
          <p>{approvalFlow.intro}</p>
          <ul className="flex flex-col gap-2">
            {approvalFlow.list.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-muted">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:col-start-4 md:row-start-1">
        <h2 className="font-sans text-heading-3 text-ink">Attachment library</h2>
        <div className="flex flex-col gap-2 font-sans text-body text-ink">
          {attachmentLibrary.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:col-start-1 md:row-start-2">
        <h2 className="font-sans text-heading-3 text-ink">Scaling with AI-assisted tooling</h2>
        <div className="flex flex-col gap-2 font-sans text-body text-ink">
          {scaling.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="md:col-span-3 md:col-start-3 md:row-start-2">
        <EmbedFrame src={embed.src} title="Property improvements attachment drawer prototype" />
      </div>

      <p className="font-sans text-caption text-muted md:col-span-1 md:col-start-6 md:row-start-2 md:flex md:flex-col md:justify-end">
        {embed.caption}
      </p>
    </section>
  );
}
