import type { Article } from "@/types/article";
import { careerDevelopmentPlan } from "./career-development-plan";
import { commsMapSkill } from "./comms-map-skill";
import { fixingUiDebt } from "./fixing-ui-debt";

/**
 * Written pieces, keyed by the same `slug` used in src/content/projects.ts
 * — see the note on src/content/case-studies/index.ts, which this mirrors.
 * A project marked `kind: "article"` there should have an entry here.
 */
export const articles: Record<string, Article> = {
  [fixingUiDebt.slug]: fixingUiDebt,
  [commsMapSkill.slug]: commsMapSkill,
  [careerDevelopmentPlan.slug]: careerDevelopmentPlan,
};
