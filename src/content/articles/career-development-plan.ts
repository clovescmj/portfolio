import type { Article } from "@/types/article";

export const careerDevelopmentPlan: Article = {
  slug: "career-development-plan",
  title: "Coaching a Designer from Mid-Level to Senior",
  company: "unico IDtech",
  role: "Team Mentorship, People Management, Career Development",
  sections: [
    {
      heading: "Context",
      blocks: [
        {
          kind: "paragraph",
          text: "At Unico I was the line manager for a team of four product designers working across B2B and B2C products. One designer on the team was solid on craft and delivery, and two things were holding her back from the next level. Her work wasn't visible to the stakeholders and the committee who decide promotions. And a few specific technical gaps limited the kind of problems she could take on alone.",
        },
        {
          kind: "paragraph",
          text: "The risk was that she'd stay at her level because her work wasn't reaching the people who needed to see it.",
        },
      ],
    },
    {
      heading: "What I did",
      blocks: [
        {
          kind: "paragraph",
          text: "We built an Individual Development Plan (IDP) together. For each growth area, we defined concrete activities within a set timeframe, so she had a list she could actually execute and we could both check against.",
        },
        {
          kind: "paragraph",
          text: "For example, visibility started with her influence on the team, and under “Increase influence on the team” we listed:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Schedule recurring 1:1s with engineering.",
            "Join backlog refinements.",
            "Share work in progress and get engineering feedback before it's final.",
          ],
        },
        {
          kind: "paragraph",
          text: "The technical skills and stakeholder visibility got the same treatment, each one broken into activities with a timeframe.",
        },
        {
          kind: "paragraph",
          text: "We reviewed progress over two six-month performance cycles and adjusted the plan as some activities landed and others needed rework. Along the way she built a documented track record of her work and her growth, something a committee could evaluate on evidence.",
        },
      ],
    },
    {
      heading: "Outcome",
      blocks: [
        {
          kind: "paragraph",
          text: "She received 5/5 performance ratings and approved salary increases in both cycles. In the second one, the performance committee approved her promotion to senior.",
        },
      ],
    },
    {
      heading: "Reflection",
      blocks: [
        {
          kind: "paragraph",
          text: "At review time, a committee can only act on what it can see. A good development plan covers skills and visibility at the same time, and the manager is responsible for both. I now start development conversations by asking what evidence the next level requires and working backward from there.",
        },
      ],
    },
  ],
};
