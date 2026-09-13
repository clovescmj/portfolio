import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <div className="flex flex-col md:gap-header">
      <PageHeader title="About me" />
      <div className="mt-10 max-w-[640px] md:mt-0">
        <p className="font-sans text-body text-ink">
          This page doesn&apos;t have a Figma design yet. It reuses the same
          shell (sidebar, header, tokens) as the Work page, so the two stay
          visually consistent. Replace this paragraph with your real bio,
          timeline, or resume content whenever it&apos;s ready.
        </p>
      </div>
    </div>
  );
}
