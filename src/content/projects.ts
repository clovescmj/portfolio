import type { Project } from "@/types/project";

/**
 * One entry per project card on the Work grid.
 *
 * To add a new project: append an object here (and drop an image in
 * public/images/projects if you have one). `layout` places the card on the
 * 6-column bento grid — colStart/colSpan/rowStart control position and size,
 * `offsetTop: true` nudges the card down by one rhythm unit (88px, a fixed
 * offset — see the note in src/types/project.ts on why it's not "align to
 * the row's bottom"), `imageOnly: true` renders just the image with no text
 * block. Everything else (title size, split vs. stacked content) adapts on
 * its own based on how wide the resulting card ends up.
 */
export const projects: Project[] = [
  {
    slug: "contract-template-management",
    title: "Contract Template Management",
    client: "QuintoAndar",
    tags: ["Operational Efficiency", "Compliance", "UI Design", "Systems Thinking"],
    description:
      "The rental and property management contract was built in HTML, hosted on Google Drive. Any update, such as a clause change or a legal text edit.",
    image: {
      src: "/images/projects/contract-template-management.png",
      alt: "Contract Template Management screenshot",
      treatment: "framed",
    },
    layout: { colStart: 1, colSpan: 3, rowStart: 1 },
  },
  {
    slug: "fixing-ui-debt",
    title: "Fixing UI Debt in Contract Template Management",
    client: "QuintoAndar",
    tags: ["Operational Efficiency", "Compliance", "UI Design", "Systems Thinking"],
    description:
      "The rental and property management contract was built in HTML, hosted on Google Drive. Any update, such as a clause change or a legal text edit, required an engineer to rewrite the template.",
    layout: { colStart: 5, colSpan: 2, rowStart: 1, offsetTop: true },
  },
  {
    slug: "loft-app",
    title: "Loft App",
    client: "Loft",
    tags: ["Operational Efficiency", "Compliance", "UI Design", "Systems Thinking"],
    description:
      "The rental and property management contract was built in HTML, hosted on Google Drive. Any update, such as a clause change or a legal text edit, required an engineer to rewrite the template.",
    layout: { colStart: 2, colSpan: 4, rowStart: 2 },
  },
  {
    slug: "comms-map-skill",
    title: "Comms Map Skill",
    client: "QuintoAndar",
    tags: ["Operational Efficiency", "Compliance", "UI Design", "Systems Thinking"],
    description:
      "The rental and property management contract was built in HTML, hosted on Google Drive. Any update, such as a clause change or a legal text edit, required an engineer to rewrite the template.",
    layout: { colStart: 1, colSpan: 2, rowStart: 3 },
  },
  {
    slug: "third-party-claims",
    title: "Third-party Claims",
    client: "Youse Seguros",
    tags: ["Operational Efficiency", "Compliance", "UI Design", "Systems Thinking"],
    description:
      "The rental and property management contract was built in HTML, hosted on Google Drive. Any update, such as a clause change or a legal text edit, required an engineer to rewrite the template.",
    layout: { colStart: 4, colSpan: 3, rowStart: 3, offsetTop: true },
  },
  {
    slug: "career-development-plan",
    title: "Career Development Plan",
    client: "unico IDtech",
    tags: ["Operational Efficiency", "Compliance", "UI Design", "Systems Thinking"],
    description:
      "The rental and property management contract was built in HTML, hosted on Google Drive. Any update, such as a clause change or a legal text edit, required an engineer to rewrite the template.",
    layout: { colStart: 2, colSpan: 2, rowStart: 4 },
  },
];
