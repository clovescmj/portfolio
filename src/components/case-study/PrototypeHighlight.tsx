import type { CaseStudyEmbed } from "@/types/case-study";
import { EmbedFrame } from "./EmbedFrame";
import { HighlightBlock } from "./HighlightBlock";

/**
 * A single live, navigable prototype inside the same full-bleed tinted
 * shell the Carousel uses (see HighlightBlock), Third-party Claims'
 * "Prototype" block, which shows one real interactive flow instead of a
 * set of static slides. `md:h-[720px]` gives EmbedFrame's own `md:h-full`
 * something to resolve against, the same fixed height Contract's
 * wideEmbed uses (there via a CSS Grid sibling instead, unavailable here).
 */
export function PrototypeHighlight({ title, embed }: { title?: string; embed: CaseStudyEmbed }) {
  return (
    <HighlightBlock background="bg-placeholder">
      <div className="flex flex-col gap-4 md:gap-6">
        {title && <h3 className="font-sans text-title text-ink">{title}</h3>}
        <figure className="flex flex-col gap-3">
          <div className="h-[616px] md:h-[720px]">
            <EmbedFrame src={embed.src} title={embed.title} />
          </div>
          <figcaption className="font-sans text-caption text-muted">{embed.caption}</figcaption>
        </figure>
      </div>
    </HighlightBlock>
  );
}
