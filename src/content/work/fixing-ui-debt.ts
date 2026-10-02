import type { WorkEntry } from "@/types/work";

export const fixingUiDebt: WorkEntry = {
  slug: "fixing-ui-debt",
  title: "Fixing UI Debt in Contract Template Management",
  client: "QuintoAndar",
  tags: [
    "UI Design",
    "Frontend Development",
    "AI-Assisted Development"
  ],
  kind: "article",
  card: {
    description: "",
    layout: {
      column: "left",
      colStart: 1,
      colSpan: 2
    }
  },
  page: {
    sections: [
      {
        blocks: [
          {
            kind: "paragraph",
            text: "The contract template management tool was part of an initiative to remove compliance risks from QuintoAndar's contract templates and attachments ahead of the company's IPO. With a tight deadline, I was part of the call to prioritize the functional core and leave some visual refinements for later. It was the right trade-off to hit the date, and it left a gap to close after launch."
          },
          {
            kind: "paragraph",
            text: "After launch, I pulled together a design review with the team, walking through a document comparing what I'd designed against what had actually shipped. Four gaps surfaced: a dropdown that opened on hover instead of on click, a status label using the wrong word, a details screen showing the contract name as its title instead of the version number, and a form missing spacing between labels and fields. Each one was small. Together, they made the tool harder to read for the people using it every day. Working with engineering, we turned each one into a backlog task."
          },
          {
            kind: "paragraph",
            text: "The fixes were well-scoped and low-risk, and the company was encouraging designers to pick up this kind of work in code, with AI support, rather than wait for engineering bandwidth. I wanted to explore that tooling myself and test what I could do with it, so I cloned the repository, ran it locally, and made all four changes myself, directly in the team's production design system."
          }
        ]
      },
      {
        blocks: [
          {
            kind: "paragraph",
            text: "The design system's documentation didn't cover the behavior I needed, so I read its source directly: once to find why a dropdown's trigger defaulted to hover, once to find where a details screen pulled its title from. An AI assistant helped me navigate the codebase's conventions and knew where to look. Understanding what I found, and deciding it was the right fix, was mine to do."
          },
          {
            kind: "image",
            src: "/images/articles/fixing-ui-debt/review.png",
            alt: "Design review documenting the UI gaps found after the Contract Template Management sprint shipped",
            width: 1440,
            height: 738
          }
        ]
      },
      {
        blocks: [
          {
            kind: "paragraph",
            text: "Each fix shipped as its own pull request and went through the team's normal review, tests, and staging validation, the same process any other change gets. The review caught two test assertions still checking the old copy, which would have broken the moment it changed. All four merged, and the interface now matches what was designed."
          }
        ]
      }
    ]
  }
};
