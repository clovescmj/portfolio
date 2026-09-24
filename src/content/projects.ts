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
      // Transparent cutout — ProjectImage.tsx supplies the gradient
      // backdrop in CSS, same as every other project's card image. Points
      // at the raw PNG on purpose, same as the case-study hero and Loft's
      // own card — Clóves re-exports this file directly.
      src: "/images/projects/contract-template-management/hero.png",
      alt: "Contract Template Management screenshot",
      treatment: "framed",
    },
    // Row 1, left — colStart/colSpan/rowStart re-confirmed via get_metadata
    // on Figma node 7:2 ("Recent work" frame): x=0, width=317.33 in a
    // 6-col/146.67px/24px-gutter grid = colStart 1, colSpan 2 (was 3 —
    // stale from before the full layout re-check).
    layout: { colStart: 1, colSpan: 2, rowStart: 1 },
  },
  {
    slug: "loft-app",
    title: "Loft App",
    client: "Loft",
    tags: ["UI Design", "UX Design", "User Research", "Product Strategy"],
    description:
      "Loft had no mobile app, only a slow, high-bounce mobile site. As founding product designer, I led the app from MVP to a personalized native experience, raising lead-to-schedule conversion 16% and ranking top 10 in its App Store category.",
    image: {
      // Points at the raw PNG on purpose — see the note on this same
      // asset in content/case-studies/loft-app.ts.
      src: "/images/projects/loft/hero.png",
      alt: "Two Loft app screens tilted against a plain grey backdrop: the welcome screen and the city selection step",
      treatment: "framed",
    },
    // Row 1, right (shares its row with Contract Template Management) —
    // confirmed via get_metadata, node 8:203 (x=512 → colStart 4,
    // width=488 → colSpan 3, y=0 → row 1, image y-offset 88 → offsetTop).
    layout: { colStart: 4, colSpan: 3, rowStart: 1, offsetTop: true },
  },
  {
    slug: "comms-map-skill",
    title: "Building a Skill for Communications Visibility",
    client: "QuintoAndar",
    tags: ["AI Tooling", "Internal Tools", "Workflow Automation"],
    description:
      "QuintoAndar's messaging system had grown to 500+ rules and 2,500+ templates with no unified view of what a customer actually received. I built an AI agent skill that maps any communication journey on demand, no ticket to engineering needed.",
    kind: "article",
    // Row 3, left — confirmed via get_metadata, node 8:220 (x=0, y=1267 →
    // row 3, image y-offset 88 → offsetTop, unlike its row partner below).
    layout: { colStart: 5, colSpan: 2, rowStart: 2, offsetTop: true },
  },
  {
    slug: "third-party-claims",
    title: "Third-party Claims",
    client: "Youse Seguros",
    tags: ["UI Design", "UX Design", "User Research", "Usability Testing"],
    description:
      "Third parties in a car accident had to call support to file a claim, driving cost and frustration. I designed and validated a digital self-service journey that moved 40% of claims off the phone within a month of launch.",
    image: {
      // Same hero.png as the case study's own hero — same convention as
      // Contract/Loft's cards.
      src: "/images/projects/third-party-claims/hero.png",
      alt: "The third-party claim flow on a laptop and phone browser",
      treatment: "framed",
    },
    // Row 2, left (shares its row with Fixing UI Debt) — confirmed via
    // get_metadata, node 8:245 (x=0 → colStart 1, width=488 → colSpan 3,
    // y=609 → row 2, image y=0 → no offsetTop, unlike its row partner).
    layout: { colStart: 1, colSpan: 3, rowStart: 2 },
  },
  {
    slug: "career-development-plan",
    title: "Coaching a Designer from Mid-Level to Senior",
    client: "unico IDtech",
    tags: ["Team Mentorship", "People Management", "Career Development"],
    description:
      "As design manager, I built a concrete development plan with a mid-level designer to close specific skill gaps and make her impact visible to the promotion committee. She earned 5/5 ratings and was promoted to senior.",
    kind: "article",
    layout: { colStart: 1, colSpan: 2, rowStart: 3, offsetTop: true },
  },
];
