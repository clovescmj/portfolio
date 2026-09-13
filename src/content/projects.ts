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
    tags: ["UI Design", "Systems Thinking", "Product Strategy", "Stakeholder Management"],
    description:
      "Contract templates lived in hand-coded HTML, taking engineers weeks to update and leaving one attachment type editable with no audit trail. I designed a system giving the legal team direct control, closing a compliance risk ahead of the company's IPO.",
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
    tags: ["UI Design", "Frontend Development", "AI-Assisted Development"],
    description:
      "After that tool shipped, I reviewed what had actually gone live, found real gaps between design and implementation, and fixed all four myself in code, with AI support, using the team's real design system.",
    layout: { colStart: 5, colSpan: 2, rowStart: 1, offsetTop: true },
  },
  {
    slug: "loft-app",
    title: "Loft App",
    client: "Loft",
    tags: ["UI Design", "UX Design", "User Research", "Product Strategy"],
    description:
      "Loft had no mobile app, only a slow, high-bounce mobile site. As founding product designer, I led the app from MVP to a personalized native experience, raising lead-to-schedule conversion 16% and ranking top 10 in its App Store category.",
    layout: { colStart: 2, colSpan: 4, rowStart: 2 },
  },
  {
    slug: "comms-map-skill",
    title: "Comms Map Skill",
    client: "QuintoAndar",
    tags: ["AI Tooling", "Internal Tools", "Workflow Automation"],
    description:
      "QuintoAndar's messaging system had grown to 500+ rules and 2,500+ templates with no unified view of what a customer actually received. I built an AI agent skill that maps any communication journey on demand, no ticket to engineering needed.",
    layout: { colStart: 1, colSpan: 2, rowStart: 3 },
  },
  {
    slug: "third-party-claims",
    title: "Third-party Claims",
    client: "Youse",
    tags: ["UI Design", "UX Design", "User Research", "Usability Testing"],
    description:
      "Third parties in a car accident had to call support to file a claim, driving cost and frustration. I designed and validated a digital self-service journey that moved 40% of claims off the phone within a month of launch.",
    layout: { colStart: 4, colSpan: 3, rowStart: 3, offsetTop: true },
  },
  {
    slug: "career-development-plan",
    title: "Career Development Plan",
    client: "unico IDtech",
    tags: ["Team Mentorship", "People Management", "Career Development"],
    description:
      "As design manager, I built a concrete development plan with a mid-level designer to close specific skill gaps and make her impact visible to the promotion committee. She earned 5/5 ratings and was promoted to senior.",
    layout: { colStart: 2, colSpan: 2, rowStart: 4 },
  },
];
