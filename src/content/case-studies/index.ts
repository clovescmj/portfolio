import type { CaseStudy } from "@/types/case-study";
import { contractTemplateManagement } from "./contract-template-management";

/**
 * Full project case studies, keyed by the same `slug` used in
 * src/content/projects.ts. Only slugs with an entry here get a generated
 * page (see generateStaticParams in src/app/work/[slug]/page.tsx) — a
 * project can exist on the Work grid without one yet.
 *
 * To add a new one: drop a `<slug>.ts` file next to this one, exporting a
 * single `CaseStudy` object, then register it below.
 */
export const caseStudies: Record<string, CaseStudy> = {
  [contractTemplateManagement.slug]: contractTemplateManagement,
};
