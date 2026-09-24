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
          text: "At Unico I was the line manager for a team of four product designers, working across B2B and B2C products. One designer on the team was solid on craft and delivery, but two things were holding her back from the next level. Her work wasn't visible to the stakeholders and the committee who decide promotions. And a few specific technical gaps were limiting the kind of problems she could take on alone.",
        },
        {
          kind: "paragraph",
          text: "The risk was that she'd stay at her level not because of her ceiling, but because her work wasn't visible to who needed to see it.",
        },
      ],
    },
    {
      heading: "What I did",
      blocks: [
        {
          kind: "paragraph",
          text: "We used an individual development plan (PDI) document. For each growth area, I worked with her to define concrete activities, and specific things to do, inside a specific topic, within a set timeframe. Not “get better at X,” but a list she could actually execute and we could both check against.",
        },
        {
          kind: "paragraph",
          text: "For example, under “Increase influence on the team”:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Schedule recurring 1:1s with engineering.",
            "Join backlog refinements.",
            "Share work in progress and get feedback from engineering before it's final.",
          ],
        },
        {
          kind: "paragraph",
          text: "Each other growth area (the technical skills and the stakeholder visibility) got the same treatment: broken into activities, each with a timeframe.",
        },
        {
          kind: "paragraph",
          text: "We reviewed progress through two six-month performance cycles, adjusting the plan as some activities landed and others needed rework. The point was to build a visible track record of her work and of her growth that a committee could evaluate on evidence.",
        },
        {
          kind: "paragraph",
          text: "By the time promotion was on the table, the plan had done its job: her contributions were visible, the technical gaps had closed, and there was a documented history of deliberate growth to point to.",
        },
      ],
    },
    {
      heading: "Outcome",
      blocks: [
        {
          kind: "paragraph",
          text: "Across the two cycles she received 5/5 performance ratings and approved salary increases each time. In the final cycle, the performance committee approved her promotion to senior.",
        },
      ],
    },
    {
      heading: "Reflection",
      blocks: [
        {
          kind: "paragraph",
          text: "At review time, a committee can only act on what it can see. A lot of career progression falls on visibility, because the growth is real but unseen, the impact is real but not perceived. A good development plan is partly a skills plan and partly a visibility plan, and the manager runs both. I now start development conversations by asking what evidence the next level requires, and working backward from there.",
        },
      ],
    },
  ],
};
