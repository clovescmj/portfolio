import type { WorkEntry } from "@/types/work";
import { loftApp } from "./loft-app";
import { contractTemplateManagement } from "./contract-template-management";
import { thirdPartyClaims } from "./third-party-claims";
import { commsMapSkill } from "./comms-map-skill";
import { careerDevelopmentPlan } from "./career-development-plan";

/**
 * One file per project (`<slug>.ts`, each exporting a single `WorkEntry`),
 * registered here — this array's order is the mobile order of the Work
 * grid (see `BentoGrid`/`ProjectLayout` for the desktop position) and the
 * only place that order is declared.
 *
 * To add a new project: create `<slug>.ts` next to this file, export a
 * `WorkEntry`, then add it to this array.
 *
 * `fixing-ui-debt.ts` exists in this folder but isn't registered here —
 * drafted, not ready to publish yet. Add it to this array to bring it back.
 */
export const workEntries: WorkEntry[] = [
  loftApp,
  contractTemplateManagement,
  thirdPartyClaims,
  commsMapSkill,
  careerDevelopmentPlan,
];

export const workEntriesBySlug: Record<string, WorkEntry> = Object.fromEntries(
  workEntries.map((entry) => [entry.slug, entry]),
);
