import type { CaseStudy } from "@/types/case-study";

export const loftApp: CaseStudy = {
  slug: "loft-app",
  title: "Loft App",
  client: "Loft",
  tags: ["Research", "UI Design", "UX Design", "Product Strategy"],
  heroImage: {
    // Points at the raw PNG on purpose (not a converted .webp) — Clóves is
    // actively re-exporting this file, so this should always pick up his
    // latest save without needing a re-convert on this end.
    src: "/images/projects/loft/hero.png",
    alt: "Two Loft app screens tilted against a plain grey backdrop: the welcome screen and the city selection step",
  },
  intro: [
    "A real estate technology company that primarily operates in the residential sector to streamline the process of buying and selling properties through technology and data analytics.",
    "In 2021, Loft was the only company in the real estate sales segment without an app in the stores, relying solely on its website.",
    "At that time, a team was formed with the challenge of creating a better, more personalized, and effective search experience that would also contribute to the 'lead to schedule' metric and increase the company's market share.",
  ],
  // Figma measures a flat 72px between every row, divider or not.
  rowGap: 72,
  content: [
    {
      // "Context" is the real seção mãe here — Understanding, Business
      // Opportunities, and My Role are its filhas (64px apart, via
      // `subsections`), not three separate 72px-gapped mãe blocks of
      // their own, confirmed against Figma's own row structure (node
      // 87:4056: "Context"+"Understanding" share one Row frame, then
      // Business Opportunities/My Role each follow at a plain 72px, same
      // rhythm every other block gets — there is no real chapter boundary
      // between them, just Clóves' own information architecture).
      kind: "group",
      title: "Understanding",
      // "Context" (heading-2) sits directly above "Understanding" (title),
      // 24px below it, in the same label column — not a separate row with
      // its own 72px gap. Confirmed via get_metadata: both blocks live in
      // one "Row" frame (y=304, h=589), "Understanding" at y=59 relative to
      // "Context" at y=0. `wideLabel` because this row's topics start at
      // the same x=344 "Business Opportunities"/"My Role" below it do (the
      // 312px label column), not the narrower one MVP/Release Plan use.
      topLabel: "Context",
      wideLabel: true,
      // The only divider before "App Evolution"/"Insights"/"Impact"/
      // "Samples"/"Files and Prototypes" further down — none of the blocks
      // between here and there get one, confirmed against the Figma
      // file's own divider node positions, not guessed.
      divider: true,
      // Figma's "Usage Data"/stats pair sits in row 1, "User Research"/findings
      // in row 2, aligned across both columns — a topic grid (not two
      // independently-stacked columns) is what keeps that cross-column
      // row alignment: row height syncs to the tallest cell in each row.
      topics: [
        {
          title: "Usage Data",
          body: [
            "The numbers showed us that the mobile web experience was not optimized for the user context; users spent less time navigating the site and left sooner compared to desktop.",
            "However, the majority of the traffic still came from the mobile site.",
          ],
        },
        {
          stats: {
            items: [
              { value: "82%", label: "Bounce rate", caption: "66% on Desktop" },
              { value: "10s", label: "Load time", caption: "2s on Desktop" },
              { value: "1.4", label: "Avg. pageviews", caption: "2.2 on Desktop" },
              { value: "84%", label: "Total visits" },
            ],
          },
        },
        {
          title: "User Research",
          body: [
            "Previous research showed that users felt frustrated when using the mobile site. They said they preferred the desktop site and only accessed the mobile site when necessary and when they were not at home.",
          ],
        },
        {
          items: [
            {
              title: "Convenience",
              body: "Users complained about needing to select the city and fill in filters each time they accessed the website on mobile.",
            },
            {
              title: "Personalization",
              body: "They wanted to receive notifications about new properties, changes in property prices, and other updates.",
            },
            {
              title: "Performance",
              body: "Users said they usually leave the mobile site if the loading time is below expectations, particularly when loading photos.",
            },
          ],
        },
      ],
      subsections: [
        {
          title: "Business Opportunities",
          topics: [
            {
              items: [
                { title: "Market Share", body: "Create an additional sales/relationship channel with customers." },
                {
                  title: "Business Impact",
                  list: [
                    "Be the primary channel to contribute to conversion by bringing in qualified leads who are more confident about purchasing a property.",
                    "Increase average session time and DAU/MAU.",
                  ],
                },
                {
                  title: "Personalized Experience",
                  list: [
                    "Build a database based on usage behavior.",
                    "Personalize the experience by displaying property options that are more accurate based on browsing and search history.",
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "My Role",
          topics: [
            {
              body: [
                "I was the founding senior product designer in a multidisciplinary team, working closely with the product manager and engineering manager to define and execute our plan and strategy.",
                "I was also responsible for mentoring and supporting other designer work, ensuring the quality and visual consistency of the interface and deliverables.",
              ],
            },
            {
              listBoxed: true,
              list: [
                "Lead the overall user experience of the app.",
                "Design interfaces, flows, and prototypes.",
                "Contribute to planning, strategy and vision.",
                "Plan and conduct UX research.",
                "Analyze data to inform design decisions.",
                "Influence decisions based on user insights.",
                "Mentor other designers on the team.",
                "Collaborate directly with the staff designer.",
              ],
            },
          ],
        },
      ],
    },
    {
      kind: "spotlight",
      title: "Product Vision",
      statement:
        "Create a unique search experience for those looking to buy a property, in a personalized and proactive way.",
      searchContextLabel: "Search Context",
      searchContext: [
        { label: "Rational", items: ["Vila Mariana", "2+ beds", "Up to 80m²", "Up to R$ 900k", "1 parking space"] },
        { label: "Emotional", items: ["Morning sun", "Well-lit", "Spacious", "Quiet street", "Cozy balcony"] },
      ],
      principlesLabel: "Experience Principles",
      principles: ["Humanized Service", "Safety & Trust", "Transparency", "Predictability", "Personalization"],
      image: {
        src: "/images/projects/loft/product-vision.webp",
        alt: "Portrait of a woman behind a plant, with a floating property listing card",
      },
    },
    {
      // "Solution" is the seção mãe — MVP and Release Plan are its filhas
      // (64px apart, via `subsections`), not two separate 72px-gapped mãe
      // blocks (App Evolution, further down, stays its own mãe — it
      // carries a real Figma divider Clóves confirmed is intentional,
      // unlike Release Plan which doesn't).
      kind: "group",
      title: "MVP",
      // "Solution" (heading-2) sits above "MVP" only — Release Plan and App
      // Evolution below don't repeat it, confirmed via get_metadata (the
      // text node appears exactly once in the whole file).
      topLabel: "Solution",
      // Figma splits the rationale into two separate side-by-side
      // paragraphs (col 3-4 and col 5-6, column 2 left empty), not one
      // topic with two stacked paragraphs — confirmed via a fresh grid-guide
      // screenshot from Clóves (the title "MVP" only spans column 1, but
      // content starts at column 3, same as contentOffset3 groups elsewhere).
      contentOffset3: true,
      topics: [
        {
          body: [
            "To achieve our goal of gaining market share quickly, we developed a Minimum Viable Product strategy that allowed us to be available in the app stores within the first month after the team was set up.",
          ],
        },
        {
          body: [
            "The main premise of the MVP was that it didn't need to be perfect; it just needed to work well enough to ensure our presence in the app stores as a first step.",
          ],
        },
      ],
      flows: [
        {
          src: "/images/projects/loft/mvp.png",
          alt: "MVP screens: a native splashscreen and welcome screen, plus five webview screens for city selection, property listing, property details, and visit scheduling",
          width: 2834,
          height: 1001,
        },
      ],
      subsections: [
        {
          title: "Release Plan",
          // Title spans only column 1 (140px, confirmed via get_metadata on
          // node 95:12373), but both topics start at column 3 — same
          // contentOffset3 pattern as MVP, column 2 left as a gap.
          contentOffset3: true,
          topics: [
            {
              body: [
                "During the MVP development, we gathered together to plan the next releases, focusing on the product vision and users' feedback.",
                "I led the design efforts for each release, ensuring we delivered value to the users and followed our experience principles.",
              ],
            },
            {
              title: "Native Features & Flows",
              // Confirmed via get_design_context: a real 2-column list (4
              // items + 4 items side by side), not one stacked column.
              listTwoColumn: true,
              list: [
                "Onboarding",
                "Property listing & search",
                "Property details",
                "Bottom navigation",
                "Recommendation lists",
                "Push notification",
                "Favorites",
                "Login",
              ],
            },
          ],
          flows: [
            {
              src: "/images/projects/loft/release-plan.png",
              alt: "Release plan timeline, from MVP Alpha and Beta through Release 1 launch to Release 4",
              width: 1056,
              height: 161,
            },
          ],
        },
      ],
    },
    {
      kind: "group",
      title: "App Evolution",
      // 144px gap above this row on the Figma file (double the flat 72px
      // rhythm every other ungapped pair gets) — the same "two 72px gaps
      // back to back" divider signature Understanding/Samples/Files and
      // Prototypes use, confirmed via get_metadata (Release Plan row
      // bottom y=3206.015, this row's own y=3350.015).
      divider: true,
      // Figma row 1 is NOT one spanning intro — it's two side-by-side
      // topics (the rationale paragraph, and a "Main Flows & Features"
      // list), confirmed via get_design_context. The title itself spans
      // columns 1-2 (312px), and topics start at column 3 — `wideLabel`,
      // confirmed on node 95:12862 (title width=312, topics' x=344/688).
      wideLabel: true,
      topics: [
        {
          body: [
            "For each release, I iterated and evolved the user experience based on research and data analysis to meet their needs and impact our goals, helping the team focus on delivering real value.",
          ],
        },
        {
          title: "Main Flows & Features",
          list: ["User Setup", "Bottom Navigation", "Home Feed", "Property Feedback"],
        },
      ],
      // Each feature below is its own named child ("seção filha"), spaced
      // 64px from the next — not the group's old flat `topics` array with
      // positional `colLabel`s glued together by array-index adjacency.
      // Figma positions each feature's name at the same x as the group
      // title itself (x=0, the narrow 140px column — confirmed on screen:
      // "Bottom Navigation" wraps to two lines there), hence `narrowLabel`
      // on every one despite the parent group being `wideLabel`.
      subsections: [
        {
          title: "User Setup",
          narrowLabel: true,
          topics: [
            {
              body: [
                "As the first step in our strategy to develop a personalized experience, I designed an onboarding flow that allowed new users to filter and visualize the most relevant properties based on their preferences.",
              ],
            },
            {
              listLabel: "Goals",
              list: [
                "Increase the average number of pageviews per user.",
                "Increase the lead-to-schedule conversion rate.",
              ],
            },
          ],
          flows: [
            {
              src: "/images/projects/loft/user-setup-flow.webp",
              alt: "User Setup onboarding flow, from welcome screen through city, neighborhood, and property criteria selection",
              width: 2230,
              height: 708,
            },
          ],
        },
        {
          title: "Bottom Navigation",
          narrowLabel: true,
          topics: [
            {
              body: [
                "At the time, the main app navigation was through the 'hamburger' menu. As a strategy to increase overall average session time and the number of pageviews, I analyzed the data and designed a bottom navigation that provided users with quick access to some of the most accessed sections in the app.",
              ],
              listLabel: "Goals",
              list: [
                "Increase the average number of saved properties per user",
                "Increase the average session time",
                "Increase the average number of pageviews per user",
              ],
            },
            {
              image: {
                src: "/images/projects/loft/bottom-navigation.webp",
                alt: "The new persistent bottom navigation bar: Explorar, Favoritos, Minha Conta",
                width: 624,
                height: 626,
              },
            },
          ],
          // flows: [
          //   {
          //     src: "/images/projects/loft/bottom-navigation-before-after.webp",
          //     alt: "Before and after: the hamburger menu's account and navigation options replaced by a persistent bottom navigation bar",
          //     width: 2000,
          //     height: 923,
          //   },
          // ],
        },
        {
          title: "Home Feed",
          narrowLabel: true,
          topics: [
            {
              body: [
                "Users shared in interviews that they felt overwhelmed when navigating through many properties. This presented an opportunity to increase average session time and lead-to-schedule rate by displaying an updated and personalized list of property recommendations.",
              ],
              listLabel: "Goals",
              list: ["Increase the average session time", "Increase the lead-to-schedule conversion rate"],
            },
            {
              embed: {
                src: "https://embed.figma.com/proto/ybSunSwwHgQMKjleqmU4V1?node-id=2022-9345&t=VmWmKHpo8vPLkJwV-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2022%3A9345&embed-host=share&hide-ui=1",
                title: "Home Feed prototype",
                caption: "Interactive prototype that shows the interaction with Home Feed lists.",
                device: true,
              },
            },
          ],
        },
        {
          title: "Property Feedback",
          narrowLabel: true,
          topics: [
            {
              body: [
                "To continue evolving our product vision of creating a personalized experience, I designed a feedback component to evaluate if our recommendations matched users' needs. This data improved our recommendation engine and helped measure user satisfaction.",
              ],
              listLabel: "Goals",
              list: ["Increase the average session time", "Increase the lead-to-schedule conversion rate"],
            },
            {
              embed: {
                src: "https://embed.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=8-7737&t=VmWmKHpo8vPLkJwV-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=8%3A7737&embed-host=share&hide-ui=1",
                title: "Property Feedback prototype",
                caption:
                  'Interactive prototype that shows the interaction with "like" and "dislike" buttons of the property feedback banner.',
                device: true,
              },
            },
          ],
        },
      ],
    },
    {
      kind: "group",
      title: "Interview & Usability Test",
      // "Insights" (heading-2) sits above this whole chapter — Interview &
      // Usability Test, Research Process, Key Findings, and A/B Test all
      // pack into one physical Figma row with no dividers or 72px gaps
      // between them (confirmed via get_metadata: one ~1064px-tall row),
      // hence `subsections` instead of separate top-level groups.
      topLabel: "Insights",
      wideLabel: true,
      divider: true,
      topics: [],
      miniGrid: [
        [
          { title: "Goal", body: "Understand user behavior and app usage during the onboarding steps." },
          {
            title: "Why conduct this research?",
            list: [
              "People want to view properties that are ideal for them.",
              "Therefore, we want to create a personalized experience for them.",
              "This will help increase engagement and lead-to-schedule conversion rate.",
            ],
          },
          {
            title: "What needs to be understood?",
            list: [
              "How do people search for an apartment and what criteria are most relevant?",
              "What is the search process like?",
              "During the onboarding, do people know how to select a city, choose neighborhoods, and use filters to view the property listing?",
            ],
          },
        ],
      ],
      subsections: [
        {
          title: "Research Process",
          // Title sits flush beside the 4-column list, same row — not
          // stacked above it like "Interview & Usability Test"'s title is
          // above its own 3-col miniGrid.
          miniGridInline: true,
          miniGrid: [
            [
              { title: "Plan", list: ["Research canvas", "Prototype", "Script & Tasks", "Annotation sheet"] },
              { title: "Recruit", list: ["Hotjar survey", "Contact users", "Schedule interviews"] },
              { title: "Document", list: ["Synthesize findings", "Share with the team"] },
              { title: "Iterate", list: ["Prioritization", "Prototype", "A/B Test", "Deliver"] },
            ],
          ],
        },
        {
          title: "Key Findings",
          topics: [
            // Two distinct findings share this exact title — confirmed
            // verbatim via get_design_context (both text nodes literally
            // say "Content matters" in the Figma file itself), not a
            // transcription slip on this end.
            {
              title: "Content matters",
              tag: "A/B Test",
              body: [
                "People preferred to be taken directly to the property listings after selecting the city, and then apply filters later.",
              ],
            },
            {
              title: "Search context",
              body: [
                "In some cases, the filters applied during the onboarding step did not return any results in the property listings.",
              ],
            },
            {
              title: "Interactive search",
              body: [
                "People missed having a map to navigate and search for properties in their preferred region without needing to select a specific neighborhood.",
              ],
            },
            {
              title: "Content matters",
              body: ["People were able to complete the onboarding process easily."],
            },
          ],
        },
        {
          title: "A/B Test",
          topics: [
            {
              body: [
                "After reviewing the insights that came from user interviews, we decided to run an A/B Test to evaluate the finding which, in the first time experience, people prefer rather to jump right to the property listing instead of filtering their options.",
              ],
            },
            {
              body: [
                "We found out that when people go straight to the property listing, we had a 16% increase in the Lead To Schedule (L2S) conversion rate. This discovery resulted in changing the entire onboarding flow, removing now irrelevant steps for the users.",
              ],
            },
          ],
          flows: [
            {
              src: "/images/projects/loft/abtest.png",
              alt: "A/B test comparison of the onboarding flow, before and after removing the filter-first steps, with a 16% increase in L2S conversion rate",
              width: 1862,
              height: 442,
            },
          ],
        },
      ],
    },
  ],
  impact: {
    groups: [
      {
        label: "Product",
        // Figma pairs these as two columns — [+16%, 2x higher] and [Top 10, 4+
        // stars] each stacked — so row-major order for a 2-col grid is
        // +16%, Top 10, 2x higher, 4+ stars (not source/reading order).
        stats: {
          items: [
            {
              value: "+16%",
              label: "L2S rate",
              caption: "The A/B test removing onboarding steps resulted in a 16% increase in the lead-to-schedule rate.",
            },
            {
              value: "Top 10",
              label: "Downloaded apps",
              caption:
                "The Loft app was ranked among the top downloads in the 'Home Decor' and 'Lifestyle' categories in the app stores.",
            },
            {
              value: "2x higher",
              label: "L2S rate higher on mobile app",
              caption: "The lead-to-schedule conversion rate was higher on the mobile app than on the desktop site.",
            },
            {
              value: "4+ stars",
              label: "Rating on app stores",
              caption: "The Loft app achieved an average rating of over 4 stars in the app stores.",
            },
          ],
        },
      },
      {
        label: "Process",
        topics: [
          {
            title: "Effective Team Integration",
            body: ["Team integration ensured that agreements were very well aligned."],
          },
          {
            title: "Data-Driven Decision Making",
            body: ["Using data and making rational decisions was crucial."],
          },
          {
            title: "Comprehensive Documentation",
            body: [
              "Documentation of the release plan guaranteed value delivery and agreements between the team and stakeholders.",
            ],
          },
          {
            title: "Impact of User Research",
            body: ["User research redefined and reinforced the paths we were following."],
          },
          {
            title: "Dual-Track Design and Development",
            body: ['The "dual-track" design and development process enabled quality and speed of deliveries.'],
          },
        ],
      },
    ],
  },
  closingGroups: [
    {
      title: "Samples",
      divider: true,
      topics: [],
      // Two independent stacked columns, not a 2-per-row topic grid —
      // confirmed via get_metadata on node 111:12081: the right column's
      // top image (home-feed-phone, a tall 747×1084 portrait) makes that
      // whole column taller than the left one (998.5px vs 1217.35px), which
      // a shared-row-height grid can't express. Left column (top to
      // bottom): city selection, then the property filter step. Right
      // column: Home Feed, then property feedback.
      imageColumns: [
        [
          {
            src: "/images/projects/loft/city-selection.gif",
            alt: "Recording of the city selection step, tilted in 3D",
            // Cropped 2px off each edge (was 600×600).
            width: 596,
            height: 596,
          },
          {
            src: "/images/projects/loft/property-filter-onboarding.webp",
            alt: "Property criteria filter screen: price, area, bedrooms, suites and parking",
            width: 900,
            height: 900,
          },
        ],
        [
          {
            src: "/images/projects/loft/home-feed-phone.webp",
            alt: "Home Feed screen with personalized property recommendation lists",
            width: 747,
            height: 1084,
          },
          {
            src: "/images/projects/loft/property-feedback.gif",
            alt: "Recording of the property feedback banner: tapping like or dislike, then the schedule-a-visit button",
            // Cropped 2px off each edge (was 600×600).
            width: 596,
            height: 596,
          },
        ],
      ],
    },
    {
      title: "Files and Prototypes",
      divider: true,
      topics: [],
      links: [
        {
          label: "Loft App",
          href: "https://www.figma.com/design/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=0-1&p=f&t=uRP8KygdEZuqC5gy-0",
        },
        {
          label: "User Setup Prototype",
          href: "https://www.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=1-5896&p=f&viewport=59%2C932%2C0.28&t=T7CbjHFrZBjwV0Ai-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A5890&page-id=0%3A1",
        },
        {
          label: "Property Feedback Interaction",
          href: "https://www.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=8-7737&viewport=1%2C1029%2C0.5&t=gjSm7qoWJLV5vRdD-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=8%3A7737&page-id=2%3A5282",
        },
      ],
    },
  ],
};
