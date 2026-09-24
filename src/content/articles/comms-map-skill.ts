import type { Article } from "@/types/article";

export const commsMapSkill: Article = {
  slug: "comms-map-skill",
  title: "Comms Map: Building a Skill for Communications Visibility",
  company: "QuintoAndar",
  role: "Operational Efficiency, Compliance, UI Design, Systems Thinking",
  sections: [
    {
      blocks: [
        {
          kind: "paragraph",
          text: "QuintoAndar's communication rules, over 500 of them, with 2,500+ templates across email, WhatsApp, and SMS, lived entirely in code. Teams that wanted to understand their own communication cadence, like the team handling property intake inspections, couldn't get a real answer. You could extract a rule from the code, but not see the template content it actually sent. Even rendering a template to look like a real message was hard, since the template alone, with its raw variables, didn't show what the customer actually received. And even engineering didn't have a full picture: understanding everything a given event triggered meant investigating each one individually, since a rule's own taxonomy (its name, its content, what triggered it) lived buried in a service most people never looked at directly. Whatever maps people managed to put together by hand, usually in Figma, were static and out of date the moment anything changed.",
        },
      ],
    },
    {
      heading: "Two Tools, One Shipped, One Deprioritized",
      blocks: [
        {
          kind: "paragraph",
          text: "I was on the team responsible for this system early on, called Comms System, and we had a plan to give the rest of the company real visibility and access. The first tool we shipped let people browse the templates themselves, organized by channel. The second, a journey-level view (what fires for whom, in what sequence, with what fallback), got deprioritized as other work took over, and I moved to a different team before it shipped.",
        },
        {
          kind: "paragraph",
          text: "On my new team, I needed to map a specific piece of a different journey: what an owner and a tenant each receive in communications between an accepted rental proposal and a signed contract. The same old problem was still there, no way to see it without digging through code and cross-referencing logs by hand.",
        },
      ],
    },
    {
      heading: "Real Data Instead of a Map",
      sideImage: true,
      blocks: [
        {
          kind: "paragraph",
          text: "By then AI coding tools were available and encouraged across the company, so instead of another static map, I built a skill that pulls from real, correlated data. Given a specific property, proposal, contract, and user, it queries the rules and dispatch service directly and pulls every real communication tied to that exact case, not messages sent to the same person elsewhere. It generates an interactive page: a visual timeline where each communication is a card, with its template context, its channel, when it was sent, and a link to the actual template used, the real one, not a stand-in.",
        },
        {
          kind: "paragraph",
          text: "That last part mattered on its own. People could usually find a template, but not when or where it had fired. Or they'd find a dispatch log entry with no way to see what was actually sent. The skill closed both gaps in the same view.",
        },
        {
          kind: "paragraph",
          text: "You call it with a plain-language request, something like “/comms-map rent, tenant, from accepted offer to signed contract, last 20 days, São Paulo”. Give it those five details up front (business, persona, journey range, timeframe, region) and it skips the back-and-forth, inferring whatever you leave out.",
        },
        {
          kind: "image",
          src: "/images/articles/comms-map-skill/comms-map.png",
          alt: "The Comms Map skill's visual timeline of a communication journey, grouped by step, with each message linked to its template",
          width: 1440,
          height: 931,
        },
      ],
    },
    {
      heading: "It Spread Past My Own Question",
      blocks: [
        {
          kind: "paragraph",
          text: "I refined it until I was happy with it, then shared it with the design team. They took it further, embedding a live template preview directly into the page. The PMM team, mapping communications ahead of a migration to Salesforce Marketing Cloud, adopted it to get more visibility into that work. Product came to me directly to use it for their own mapping. And the original Comms System team, the one I'd left, ended up building a deeper version of the same idea for themselves, using my skill as the reference for the criteria theirs should follow.",
        },
      ],
    },
  ],
};
