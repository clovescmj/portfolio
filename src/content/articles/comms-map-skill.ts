import type { Article } from "@/types/article";

export const commsMapSkill: Article = {
  // Title, client and tags come from this slug's entry in content/projects.ts.
  slug: "comms-map-skill",
  sections: [
    {
      heading: "Rules Nobody Could See",
      blocks: [
        {
          kind: "paragraph",
          text: "QuintoAndar's communication rules, over 500 of them with 2,500+ templates across email, WhatsApp, and SMS, lived entirely in code. Teams like property intake inspections couldn't get a real answer about their own communication cadence. Even engineering had to investigate events one by one to know what each of them triggered. The maps people built by hand in Figma went stale as soon as anything changed.",
        },
      ],
    },
    {
      heading: "Picking It Back Up",
      blocks: [
        {
          kind: "paragraph",
          text: "Early on, I was on Comms System, the team responsible for this system, and we had a plan to give the rest of the company real visibility. The first tool we shipped let people browse templates by channel. The second was a journey-level view showing what fires for whom, in what sequence, and with what fallback. It got deprioritized as other work took over, and I moved to a different team before it shipped.",
        },
        {
          kind: "paragraph",
          text: "On my new team, I needed to map one piece of a different journey: what an owner and a tenant each receive between an accepted rental proposal and a signed contract. The same problem was still there. Seeing it meant digging through code and cross-referencing logs by hand.",
        },
      ],
    },
    {
      heading: "How It Works",
      sideImage: true,
      blocks: [
        {
          kind: "paragraph",
          text: "By then AI coding tools were available and encouraged across the company, so I built a skill that pulls from real, correlated data. Given a specific property, proposal, contract, and user, it queries the rules and dispatch service directly and returns only the communications tied to that exact case. The output is an interactive page with a visual timeline. Each communication shows up as a card with its template context, channel, send time, and a link to the actual template used.",
        },
        {
          kind: "paragraph",
          text: "People could usually find a template, but they couldn't tell when or where it had fired. Or they'd find a dispatch log entry with no way to see what was sent. The skill brings both into the same view.",
        },
        {
          kind: "paragraph",
          text: "You call it with a plain-language request:",
        },
        {
          kind: "code",
          text: "/comms-map rent, tenant, from accepted offer to signed contract, last 20 days, São Paulo",
        },
        {
          kind: "paragraph",
          text: "With those five details up front (business, persona, journey range, timeframe, region), it skips the back-and-forth and infers whatever you leave out.",
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
      heading: "Who Uses It Now",
      blocks: [
        {
          kind: "paragraph",
          text: "I refined it until I was happy with it, then shared it with the design team. They took it further and embedded a live template preview directly into the page. The PMM team, mapping communications ahead of a migration to Salesforce Marketing Cloud, adopted it to get more visibility into that work. Product came to me directly to use it for their own mapping. And the Comms System team, the one I'd left, ended up building a deeper version of the same idea for themselves, using my skill as the reference for the criteria theirs should follow.",
        },
      ],
    },
  ],
};
