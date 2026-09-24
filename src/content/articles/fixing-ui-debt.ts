import type { Article } from "@/types/article";

export const fixingUiDebt: Article = {
  slug: "fixing-ui-debt",
  title: "Fixing UI Debt in Contract Template Management",
  company: "QuintoAndar",
  role: "UI Design, Frontend Development, AI-Assisted Development",
  note: {
    text: "This follows the Contract Template Management case. During the sprint that shipped that system, the team cut some visual refinements to deliver the functional core on time.",
    link: { label: "Contract Template Management", href: "/work/contract-template-management" },
  },
  sections: [
    {
      heading: "Situation",
      blocks: [
        {
          kind: "paragraph",
          text: "After the sprint shipped, I ran a design review of what had actually gone live and found real gaps between the design and the implementation: a button's dropdown opened on hover instead of click, a status label used the wrong word, a details screen showed the contract name as its title instead of the version number, and a form was missing spacing between labels and fields. I documented each one and created backlog tickets for the fixes.",
        },
      ],
    },
    {
      heading: "Task",
      blocks: [
        {
          kind: "paragraph",
          text: "I didn't want the tool to ship in a half-finished state. Holding the line on UI quality is part of my job as the designer on this project, and what had gone live didn't match what was designed. It was also a chance to put into practice something the company was actively encouraging: designers picking up code, with AI support, to move faster on exactly this kind of fix.",
        },
      ],
    },
    {
      heading: "Action",
      blocks: [
        {
          kind: "paragraph",
          text: "I cloned the repository, ran it locally, and implemented all four fixes myself. An AI coding assistant walked me through the codebase's conventions and pointed me to the right place to make each change, but I wrote and edited every line myself, using the team's actual design system. Two fixes required reading the design system's own source code to understand undocumented behavior, like why a button component had two incompatible sets of variant names, or why a card component's internal markup was leaking spacing into its parent layout. Each fix shipped as its own pull request, went through the team's automated code review (which caught two outdated test assertions that would have broken as soon as the copy changed) and staging validation before merging.",
        },
        {
          kind: "image",
          src: "/images/articles/fixing-ui-debt/review.png",
          alt: "Design review documenting the UI gaps found after the Contract Template Management sprint shipped",
          width: 1440,
          height: 738,
        },
      ],
    },
    {
      heading: "Result",
      blocks: [
        {
          kind: "paragraph",
          text: "Now it's closer to the quality bar the company holds as a pillar, with the interface matching what was actually designed. Resolving debt like this, technical or UI/UX, is part of getting there.",
        },
      ],
    },
  ],
};
