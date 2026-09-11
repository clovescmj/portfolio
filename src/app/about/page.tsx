import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About me" />
      <div className="mt-rhythm max-w-[640px]">
        <p className="font-sans text-body text-ink">
          This page doesn&apos;t have a Figma design yet — it reuses the same
          shell (sidebar, header, tokens) as the Work page so the two stay
          visually consistent. Replace this paragraph with your real bio,
          timeline, or resume content whenever it&apos;s ready.
        </p>
      </div>
    </>
  );
}
