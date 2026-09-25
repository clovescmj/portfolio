import type { CaseStudyEmbed } from "@/types/case-study";
import { EmbedFrame } from "./EmbedFrame";
import { HighlightBlock } from "./HighlightBlock";
import { Heading } from "@/components/ui/Heading";
import { headingId } from "@/lib/heading-id";

/**
 * A single live, navigable prototype inside the same full-bleed tinted
 * shell the Carousel uses (see HighlightBlock), Third-party Claims'
 * "Prototype" block, which shows one real interactive flow instead of a
 * set of static slides.
 */
export function PrototypeHighlight({ title, embed }: { title?: string; embed: CaseStudyEmbed }) {
  return (
    <HighlightBlock background="bg-placeholder" labelledBy={title ? headingId(title) : undefined}>
      <div className="flex flex-col gap-4 md:gap-6">
        {title && (
          <Heading level={3} variant="h3" id={headingId(title)}>
            {title}
          </Heading>
        )}
        <figure className="flex flex-col gap-3">
          {/* Hugs the actual Figma frame's proportions (measured directly:
              the browser-chrome + laptop skin the live prototype renders
              at `scaling=scale-down-width`, ~1.57:1) instead of a fixed
              px height, so there's no leftover empty space above/below
              the mockup at any width — mobile included, same box. */}
          <div className="aspect-[584/372] w-full">
            <EmbedFrame src={embed.src} title={embed.title} bordered={false} fit placeholder />
          </div>
        </figure>
      </div>
    </HighlightBlock>
  );
}
