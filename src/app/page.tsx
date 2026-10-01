import { PageHeader } from "@/components/ui/PageHeader";
import { BentoGrid } from "@/components/work/BentoGrid";
import { workEntries } from "@/content/work";

export default function HomePage() {
  return (
    <div className="flex flex-col md:gap-header">
      <PageHeader title="Work" />
      <section aria-label="Selected work" className="mt-10 md:mt-0">
        <BentoGrid entries={workEntries} />
      </section>
    </div>
  );
}
