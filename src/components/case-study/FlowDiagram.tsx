import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import type { CaseStudyFlow } from "@/types/case-study";

/**
 * A wide process diagram — too wide for a group's topic column, where its
 * labels would shrink to nothing. On mobile the image keeps a readable
 * minimum width and scrolls sideways instead of shrinking with the
 * viewport.
 *
 * `flow.background` is opt-in, off by default: most source exports
 * (Loft's screens, timelines, before/afters) already sit on plain white
 * or have their own fill, and a surrounding gray card isn't part of the
 * Figma design — adding one by default just shows through any
 * transparent margin the export has. Turn it on only for a diagram that
 * Figma genuinely renders on a tinted backdrop.
 */
export function FlowDiagram({ flow }: { flow: CaseStudyFlow }) {
  return (
    <figure className="flex flex-col gap-3 md:pr-content">
      <div
        className={`scroll-area -mx-6 w-[calc(100%+48px)] overflow-x-auto md:mx-0 md:w-full md:overflow-visible ${flow.background ? "bg-placeholder p-6 md:p-8" : ""}`}
      >
        <Image
          src={assetPath(flow.src)}
          alt={flow.alt}
          width={flow.width}
          height={flow.height}
          className="h-auto w-[900px] max-w-none md:w-full"
        />
      </div>
      {flow.caption && <figcaption className="font-sans text-caption text-muted">{flow.caption}</figcaption>}
    </figure>
  );
}
