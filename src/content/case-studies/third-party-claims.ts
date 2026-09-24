import type { CaseStudy } from "@/types/case-study";

export const thirdPartyClaims: CaseStudy = {
  slug: "third-party-claims",
  title: "Third-party Claims",
  client: "Youse Seguros",
  tags: ["UX Design", "User Research", "Usability Testing", "UI Design"],
  heroImage: {
    // Transparent device-mockup cutout (laptop + phone), same pattern as
    // Contract/Loft's hero images — Hero.tsx fills the frame behind it
    // with --color-lightergrey.
    src: "/images/projects/third-party-claims/hero.png",
    alt: "The third-party claim flow on a laptop and phone browser",
  },
  intro: [
    "Youse, is a Brazilian digital insurance company offering customizable car, home, and life insurance policies online, and one of the first to introduce peer-to-peer insurance in Brazil.",
    "As a founding product designer, I helped shape the entire buyer experience and worked on the user experience for claim analysis, third-party claims, and car inspections. Back in 2019, I joined the Claim Squad and became responsible for the end-to-end experience of Youse's claims ecosystem.",
  ],
  rowGap: 72,
  content: [
    {
      kind: "section",
      divider: true,
      label: "Problem",
      columns: [
        {
          paragraphs: [
            "It was already possible for a Youse customer to file a claim in the app, but not for the third party, the other driver involved in the accident. To formalize their side of it, a third party had no option but to call Youse's support line and go through the whole process over the phone.",
          ],
        },
        {
          paragraphs: [
            "That call volume was a growing source of support tickets and operational cost, at odds with Youse's core strategy of being a digital-first insurer.",
          ],
        },
      ],
    },
    {
      kind: "group",
      title: "",
      topLabel: "Understanding",
      divider: true,
      wideLabel: true,
      topics: [],
      subsections: [
        {
          title: "",
          topics: [],
          flows: [
            {
              src: "/images/projects/third-party-claims/user-journey-old.png",
              alt: "The third-party claim journey before: every case required a phone call to Youse's support team",
              width: 2000,
              height: 503,
            },
          ],
        },
        {
          title: "Claim Data",
          contentOffset3: true,
          topics: [
            {
              body: [
                "Third-party claims were the second most common claim type, right behind collision, representing 23% of all claims filed in a 12-month period.",
                "Third parties still had to call our support team to file a claim, and that call volume was driving a growing number of support tickets and operational cost.",
              ],
            },
            {
              stats: {
                items: [
                  { value: "9,877", label: "Total claims", caption: "Over a 12-month period." },
                  { value: "23%", label: "Third-party claim", caption: "2nd most common claim type." },
                ],
              },
            },
          ],
        },
        {
          title: "Previous research findings",
          contentOffset3: true,
          topics: [
            {
              list: [
                "Customers are in a stressful situation, so waiting too long to talk with someone on the phone is very frustrating.",
                "Many times the third parties don't trust our customers, feeling that they won't have any support and will be left with their car damaged.",
              ],
            },
            {
              list: [
                "Customers don't want to be bothered by third parties, so they don't find it safe to give their personal phone numbers.",
                "Customers want to know if the third parties had full support from Youse and if the service was done, so they can just forget about the incident.",
              ],
            },
          ],
        },
        {
          title: "Opportunities",
          contentOffset3: true,
          topics: [
            { body: ["To file a claim for third-party, our customers still needed to call our support team."] },
            {
              body: [
                "Youse had an increasing number of support tickets and operational cost for third-party claims.",
              ],
            },
          ],
        },
      ],
    },
    {
      kind: "section",
      divider: true,
      label: "Strategy & Goals",
      columns: [
        {
          paragraphs: [
            "Give the possibility to customers to inform a third-party accident in the app, and a web-based experience for the third parties to file the claim.",
          ],
        },
        {
          paragraphs: [
            "The existing third-party claim experience was far from what Youse desired to offer to its customers and other people involved. We wanted to make it easier and offer a digital self-service experience. It was already possible to file a claim using the app, but not yet for the third-party coverage.",
          ],
        },
      ],
    },
    {
      kind: "group",
      title: "",
      topLabel: "Solution",
      divider: true,
      wideLabel: true,
      topics: [],
      flows: [
        {
          src: "/images/projects/third-party-claims/user-journey-new.png",
          alt: "The third-party claim journey after: a self-service flow the third party completes online, no call required",
          width: 2000,
          height: 499,
        },
      ],
      subsections: [
        {
          title: "",
          flushStacked: true,
          topics: [
            {
              title: "Content Mapping",
              body: [
                "I mapped all the information the Claim Service and our operational team needed to file a claim, breaking it down into driver data, car data, date and address, and a description of what happened. That mapping let me work out which fields the third party could realistically provide themselves, so the flow could collect as much as possible upfront and leave less for someone to chase down later.",
              ],
            },
          ],
          wideImage: {
            src: "/images/projects/third-party-claims/content-map.png",
            alt: "Content map of every field needed to file a third-party claim",
          },
          wideImageSpan: 3,
        },
        {
          title: "Interface",
          highlightEmbed: {
            src: "https://embed.figma.com/proto/01LDFvddOYPR1gJceGKmWB/Third-party-Claims?node-id=5002-1405&page-id=0%3A2988&scaling=scale-down&content-scaling=fixed&embed-host=share&hide-ui=1",
            title: "Third-party Claims prototype",
            caption: "Live prototype, walk through the third-party claim flow yourself.",
          },
        },
      ],
    },
    {
      kind: "group",
      title: "Interview & Usability Test",
      topLabel: "Insights",
      wideLabel: true,
      topics: [
        {
          body: [
            "After the final design review with the team, I set up a usability test using the prototype to validate if it was usable and understandable by our users.",
            "I built a research plan to support our research planning, ensure we had a clear goal, and make sure we could answer the following questions:",
          ],
        },
        {
          listLabel: "What do we wanted to know?",
          list: [
            "How was the user's experience as a third-party in a claim process?",
            "What's the user's perception about using our web-based process to file a claim?",
          ],
        },
      ],
      imageColumns: [
        [
          {
            src: "/images/projects/third-party-claims/research-canvas.png",
            alt: "Research canvas used to plan the usability test",
            width: 2312,
            height: 1390,
            background: true,
          },
        ],
        [
          {
            src: "/images/projects/third-party-claims/research-plan.png",
            alt: "Research plan and usability test script",
            width: 2312,
            height: 1390,
            background: true,
          },
        ],
      ],
      subsections: [
        {
          title: "Interview Findings",
          miniGridCompact: true,
          miniGrid: [
            [
              { title: "Anguish", body: "They don't know what the process is like." },
              { title: "Frustration", body: "File a claim without being guilty of the accident." },
            ],
            [
              { title: "Anxiety", body: "They don't know whether they will be paid or have their car repaired." },
              {
                title: "Mistrust",
                body: "They do not feel that the police, the insurer, the dispatcher want to help.",
              },
            ],
          ],
          quote: {
            text: "It was very time consuming, very exhausting. I was once the victim and was going through all this disorder to receive something that was my right.",
            attribution: "Interview participant",
          },
        },
        {
          title: "Usability Test",
          contentOffset3: true,
          topics: [
            {
              title: "Step 1: Driver and car information",
              body: [
                "It wasn't clear to the users, the third parties, whether the information requested was about them or about the insured person.",
              ],
            },
            {
              title: "Step 2: Date and address",
              body: [
                "The person doesn't always know the zip code of the place where the accident happened, so the map helped to find the location without breaking the experience.",
              ],
            },
            {
              title: "Success screen: Claim filed",
              body: [
                "It wasn't clear to users what would happen next. Most said they'd still call support to find out, and some took a screenshot of the confirmation just to keep a record.",
              ],
            },
          ],
        },
      ],
    },
  ],
  impact: {
    groups: [
      {
        label: "",
        topics: [
          {
            title:
              "Within the first four weeks after launch, 40% of third-party claims were filed through the new digital self-service journey instead of by phone.",
            body: [
              "Support ticket volume and operational cost for third-party claims dropped as a direct result of removing the phone call requirement, though we didn't track those two as a hard percentage.",
            ],
          },
        ],
        stats: {
          items: [{ value: "40%", label: "Third-party claims filed online" }],
        },
      },
    ],
  },
  // closingGroups: [
  //   {
  //     title: "Files and Prototypes",
  //     divider: true,
  //     topics: [],
  //     links: [
  //       {
  //         label: "Third-party Claims",
  //         href: "https://www.figma.com/proto/01LDFvddOYPR1gJceGKmWB/Third-party-Claims?node-id=0-2989&page-id=0%3A2988&t=sPfoXLtTVc3nidCe-1",
  //       },
  //     ],
  //   },
  // ],
};
