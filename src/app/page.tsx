import { PageHeader } from "@/components/ui/PageHeader";
import { BentoGrid } from "@/components/work/BentoGrid";
import { projects } from "@/content/projects";

export default function HomePage() {
  return (
    <>
      <PageHeader title="Work" />
      <div className="mt-10 md:mt-rhythm">
        <BentoGrid projects={projects} />
      </div>
    </>
  );
}
