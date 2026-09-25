import type { CaseStudy } from "@/types/case-study";

// Hero and card images point at the raw PNG on purpose: Clóves re-exports these files directly.
export const loftApp: CaseStudy = {
  slug: "loft-app",
  title: "Loft App",
  client: "Loft",
  tags: [
    "Research",
    "UI Design",
    "UX Design",
    "Product Strategy"
  ],
  heroImage: {
    src: "/images/projects/loft/hero.png",
    alt: "Two Loft app screens tilted against a plain grey backdrop: the welcome screen and the city selection step"
  },
  intro: [
    "A real estate technology company that primarily operates in the residential sector to streamline the process of buying and selling properties through technology and data analytics.",
    "In 2021, Loft was the only company in the real estate sales segment without an app in the stores, relying solely on its website.",
    "At that time, a team was formed with the challenge of creating a better, more personalized, and effective search experience that would also contribute to the 'lead to schedule' metric and increase the company's market share."
  ],
  rowGap: 72,
  sections: [
    {
      kind: "chapter",
      title: "Context",
      labelWidth: "wide",
      subsections: [
        {
          title: "Understanding",
          topics: [
            {
              title: "Usage Data",
              body: [
                "The numbers showed us that the mobile web experience was not optimized for the user context; users spent less time navigating the site and left sooner compared to desktop.",
                "However, the majority of the traffic still came from the mobile site."
              ]
            },
            {
              stats: {
                items: [
                  {
                    value: "82%",
                    label: "Bounce rate",
                    caption: "66% on Desktop"
                  },
                  {
                    value: "10s",
                    label: "Load time",
                    caption: "2s on Desktop"
                  },
                  {
                    value: "1.4",
                    label: "Avg. pageviews",
                    caption: "2.2 on Desktop"
                  },
                  {
                    value: "84%",
                    label: "Total visits"
                  }
                ]
              }
            },
            {
              title: "User Research",
              body: [
                "Previous research showed that users felt frustrated when using the mobile site. They said they preferred the desktop site and only accessed the mobile site when necessary and when they were not at home."
              ]
            },
            {
              nested: true,
              items: [
                {
                  title: "Convenience",
                  body: "Users complained about needing to select the city and fill in filters each time they accessed the website on mobile."
                },
                {
                  title: "Personalization",
                  body: "They wanted to receive notifications about new properties, changes in property prices, and other updates."
                },
                {
                  title: "Performance",
                  body: "Users said they usually leave the mobile site if the loading time is below expectations, particularly when loading photos."
                }
              ]
            }
          ]
        },
        {
          title: "Business Opportunities",
          topics: [
            {
              items: [
                {
                  title: "Market Share",
                  body: "Create an additional sales/relationship channel with customers."
                },
                {
                  title: "Business Impact",
                  list: [
                    "Be the primary channel to contribute to conversion by bringing in qualified leads who are more confident about purchasing a property.",
                    "Increase average session time and DAU/MAU."
                  ]
                },
                {
                  title: "Personalized Experience",
                  list: [
                    "Build a database based on usage behavior.",
                    "Personalize the experience by displaying property options that are more accurate based on browsing and search history."
                  ]
                }
              ]
            }
          ]
        },
        {
          title: "My Role",
          topics: [
            {
              body: [
                "I was the founding senior product designer in a multidisciplinary team, working closely with the product manager and engineering manager to define and execute our plan and strategy.",
                "I was also responsible for mentoring and supporting other designer work, ensuring the quality and visual consistency of the interface and deliverables."
              ]
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
                "Collaborate directly with the staff designer."
              ]
            }
          ]
        }
      ],
      divider: "dark"
    },
    {
      kind: "spotlight",
      title: "Product Vision",
      statement: "Create a unique search experience for those looking to buy a property, in a personalized and proactive way.",
      searchContextLabel: "Search Context",
      searchContext: [
        {
          label: "Rational",
          items: [
            "Vila Mariana",
            "2+ beds",
            "Up to 80m²",
            "Up to R$ 900k",
            "1 parking space"
          ]
        },
        {
          label: "Emotional",
          items: [
            "Morning sun",
            "Well-lit",
            "Spacious",
            "Quiet street",
            "Cozy balcony"
          ]
        }
      ],
      principlesLabel: "Experience Principles",
      principles: [
        "Humanized Service",
        "Safety & Trust",
        "Transparency",
        "Predictability",
        "Personalization"
      ],
      image: {
        src: "/images/projects/loft/product-vision.webp",
        alt: "Portrait of a woman behind a plant, with a floating property listing card"
      }
    },
    {
      kind: "chapter",
      title: "Solution",
      subsections: [
        {
          title: "MVP",
          layout: {
            contentStart: 3
          },
          topics: [
            {
              body: [
                "To achieve our goal of gaining market share quickly, we developed a Minimum Viable Product strategy that allowed us to be available in the app stores within the first month after the team was set up."
              ]
            },
            {
              body: [
                "The main premise of the MVP was that it didn't need to be perfect; it just needed to work well enough to ensure our presence in the app stores as a first step."
              ]
            }
          ],
          flows: [
            {
              src: "/images/projects/loft/mvp.png",
              alt: "MVP screens: a native splashscreen and welcome screen, plus five webview screens for city selection, property listing, property details, and visit scheduling",
              width: 2834,
              height: 1001
            }
          ]
        },
        {
          title: "Release Plan",
          layout: {
            contentStart: 3
          },
          topics: [
            {
              body: [
                "During the MVP development, we gathered together to plan the next releases, focusing on the product vision and users' feedback.",
                "I led the design efforts for each release, ensuring we delivered value to the users and followed our experience principles."
              ]
            },
            {
              title: "Native Features & Flows",
              listTwoColumn: true,
              list: [
                "Onboarding",
                "Property listing & search",
                "Property details",
                "Bottom navigation",
                "Recommendation lists",
                "Push notification",
                "Favorites",
                "Login"
              ]
            }
          ],
          flows: [
            {
              src: "/images/projects/loft/release-plan.png",
              alt: "Release plan timeline, from MVP Alpha and Beta through Release 1 launch to Release 4",
              width: 1056,
              height: 161
            }
          ]
        }
      ]
    },
    {
      kind: "chapter",
      title: "App Evolution",
      titlePlacement: "beside",
      labelWidth: "wide",
      subsections: [
        {
          topics: [
            {
              body: [
                "For each release, I iterated and evolved the user experience based on research and data analysis to meet their needs and impact our goals, helping the team focus on delivering real value."
              ]
            },
            {
              title: "Main Flows & Features",
              list: [
                "User Setup",
                "Bottom Navigation",
                "Home Feed",
                "Property Feedback"
              ]
            }
          ]
        },
        {
          title: "User Setup",
          layout: {
            labelWidth: "narrow"
          },
          topics: [
            {
              body: [
                "As the first step in our strategy to develop a personalized experience, I designed an onboarding flow that allowed new users to filter and visualize the most relevant properties based on their preferences."
              ]
            },
            {
              listLabel: "Goals",
              list: [
                "Increase the average number of pageviews per user.",
                "Increase the lead-to-schedule conversion rate."
              ]
            }
          ],
          flows: [
            {
              src: "/images/projects/loft/user-setup-flow.webp",
              alt: "User Setup onboarding flow, from welcome screen through city, neighborhood, and property criteria selection",
              width: 2230,
              height: 708
            }
          ]
        },
        {
          title: "Bottom Navigation",
          layout: {
            labelWidth: "narrow"
          },
          topics: [
            {
              body: [
                "At the time, the main app navigation was through the 'hamburger' menu. As a strategy to increase overall average session time and the number of pageviews, I analyzed the data and designed a bottom navigation that provided users with quick access to some of the most accessed sections in the app."
              ],
              listLabel: "Goals",
              list: [
                "Increase the average number of saved properties per user",
                "Increase the average session time",
                "Increase the average number of pageviews per user"
              ]
            },
            {
              image: {
                src: "/images/projects/loft/bottom-navigation.webp",
                alt: "The new persistent bottom navigation bar: Explorar, Favoritos, Minha Conta",
                width: 624,
                height: 626
              }
            }
          ]
        },
        {
          title: "Home Feed",
          layout: {
            labelWidth: "narrow"
          },
          topics: [
            {
              body: [
                "Users shared in interviews that they felt overwhelmed when navigating through many properties. This presented an opportunity to increase average session time and lead-to-schedule rate by displaying an updated and personalized list of property recommendations."
              ],
              listLabel: "Goals",
              list: [
                "Increase the average session time",
                "Increase the lead-to-schedule conversion rate"
              ]
            },
            {
              embed: {
                src: "https://embed.figma.com/proto/ybSunSwwHgQMKjleqmU4V1?node-id=2022-9345&t=VmWmKHpo8vPLkJwV-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2022%3A9345&embed-host=share&hide-ui=1",
                title: "Home Feed prototype",
                fallback: "/images/projects/loft/fallback-home-feed.png",
                placeholder: true,
                caption: "Interactive prototype that shows the interaction with Home Feed lists.",
                device: true
              }
            }
          ]
        },
        {
          title: "Property Feedback",
          layout: {
            labelWidth: "narrow"
          },
          topics: [
            {
              body: [
                "To continue evolving our product vision of creating a personalized experience, I designed a feedback component to evaluate if our recommendations matched users' needs. This data improved our recommendation engine and helped measure user satisfaction."
              ],
              listLabel: "Goals",
              list: [
                "Increase the average session time",
                "Increase the lead-to-schedule conversion rate"
              ]
            },
            {
              embed: {
                src: "https://embed.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=8-7737&t=VmWmKHpo8vPLkJwV-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=8%3A7737&embed-host=share&hide-ui=1",
                title: "Property Feedback prototype",
                fallback: "/images/projects/loft/fallback-property-feedback.png",
                placeholder: true,
                caption: "Interactive prototype that shows the interaction with \"like\" and \"dislike\" buttons of the property feedback banner.",
                device: true
              }
            }
          ]
        }
      ],
      divider: "dark"
    },
    {
      kind: "chapter",
      title: "Insights",
      labelWidth: "wide",
      subsections: [
        {
          title: "Interview & Usability Test",
          miniGrid: {
            rows: [
              [
                {
                  title: "Goal",
                  body: "Understand user behavior and app usage during the onboarding steps."
                },
                {
                  title: "Why conduct this research?",
                  list: [
                    "People want to view properties that are ideal for them.",
                    "Therefore, we want to create a personalized experience for them.",
                    "This will help increase engagement and lead-to-schedule conversion rate."
                  ]
                },
                {
                  title: "What needs to be understood?",
                  list: [
                    "How do people search for an apartment and what criteria are most relevant?",
                    "What is the search process like?",
                    "During the onboarding, do people know how to select a city, choose neighborhoods, and use filters to view the property listing?"
                  ]
                }
              ]
            ],
            placement: "stacked"
          }
        },
        {
          title: "Research Process",
          miniGrid: {
            rows: [
              [
                {
                  title: "Plan",
                  list: [
                    "Research canvas",
                    "Prototype",
                    "Script & Tasks",
                    "Annotation sheet"
                  ]
                },
                {
                  title: "Recruit",
                  list: [
                    "Hotjar survey",
                    "Contact users",
                    "Schedule interviews"
                  ]
                },
                {
                  title: "Document",
                  list: [
                    "Synthesize findings",
                    "Share with the team"
                  ]
                },
                {
                  title: "Iterate",
                  list: [
                    "Prioritization",
                    "Prototype",
                    "A/B Test",
                    "Deliver"
                  ]
                }
              ]
            ],
            placement: "inline"
          }
        },
        {
          title: "Key Findings",
          topics: [
            {
              title: "Content matters",
              tag: "A/B Test",
              body: [
                "People preferred to be taken directly to the property listings after selecting the city, and then apply filters later."
              ]
            },
            {
              title: "Search context",
              body: [
                "In some cases, the filters applied during the onboarding step did not return any results in the property listings."
              ]
            },
            {
              title: "Interactive search",
              body: [
                "People missed having a map to navigate and search for properties in their preferred region without needing to select a specific neighborhood."
              ]
            },
            {
              title: "Content matters",
              body: [
                "People were able to complete the onboarding process easily."
              ]
            }
          ]
        },
        {
          title: "A/B Test",
          topics: [
            {
              body: [
                "After reviewing the insights that came from user interviews, we decided to run an A/B Test to evaluate the finding which, in the first time experience, people prefer rather to jump right to the property listing instead of filtering their options."
              ]
            },
            {
              body: [
                "We found out that when people go straight to the property listing, we had a 16% increase in the Lead To Schedule (L2S) conversion rate. This discovery resulted in changing the entire onboarding flow, removing now irrelevant steps for the users."
              ]
            }
          ],
          flows: [
            {
              src: "/images/projects/loft/abtest.png",
              alt: "A/B test comparison of the onboarding flow, before and after removing the filter-first steps, with a 16% increase in L2S conversion rate",
              width: 1862,
              height: 442
            }
          ]
        }
      ],
      divider: "dark"
    },
    {
      kind: "impact",
      divider: "dark",
      groups: [
        {
          label: "Product",
          stats: {
            items: [
              {
                value: "+16%",
                label: "L2S rate",
                caption: "The A/B test removing onboarding steps resulted in a 16% increase in the lead-to-schedule rate."
              },
              {
                value: "Top 10",
                label: "Downloaded apps",
                caption: "The Loft app was ranked among the top downloads in the 'Home Decor' and 'Lifestyle' categories in the app stores."
              },
              {
                value: "2x higher",
                label: "L2S rate higher on mobile app",
                caption: "The lead-to-schedule conversion rate was higher on the mobile app than on the desktop site."
              },
              {
                value: "4+ stars",
                label: "Rating on app stores",
                caption: "The Loft app achieved an average rating of over 4 stars in the app stores."
              }
            ]
          }
        },
        {
          label: "Process",
          topics: [
            {
              title: "Effective Team Integration",
              body: [
                "Team integration ensured that agreements were very well aligned."
              ]
            },
            {
              title: "Data-Driven Decision Making",
              body: [
                "Using data and making rational decisions was crucial."
              ]
            },
            {
              title: "Comprehensive Documentation",
              body: [
                "Documentation of the release plan guaranteed value delivery and agreements between the team and stakeholders."
              ]
            },
            {
              title: "Impact of User Research",
              body: [
                "User research redefined and reinforced the paths we were following."
              ]
            },
            {
              title: "Dual-Track Design and Development",
              body: [
                "The \"dual-track\" design and development process enabled quality and speed of deliveries."
              ]
            }
          ]
        }
      ]
    },
    {
      kind: "chapter",
      title: "Samples",
      titlePlacement: "beside",
      subsections: [
        {
          imageColumns: [
            [
              {
                src: "/images/projects/loft/city-selection.gif",
                alt: "Recording of the city selection step, tilted in 3D",
                width: 596,
                height: 596
              },
              {
                src: "/images/projects/loft/property-filter-onboarding.webp",
                alt: "Property criteria filter screen: price, area, bedrooms, suites and parking",
                width: 900,
                height: 900
              }
            ],
            [
              {
                src: "/images/projects/loft/home-feed-phone.webp",
                alt: "Home Feed screen with personalized property recommendation lists",
                width: 747,
                height: 1084
              },
              {
                src: "/images/projects/loft/property-feedback.gif",
                alt: "Recording of the property feedback banner: tapping like or dislike, then the schedule-a-visit button",
                width: 596,
                height: 596
              }
            ]
          ]
        }
      ],
      divider: "dark"
    },
    {
      kind: "chapter",
      title: "Files and Prototypes",
      titlePlacement: "beside",
      subsections: [
        {
          links: [
            {
              label: "Loft App",
              href: "https://www.figma.com/design/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=0-1&p=f&t=uRP8KygdEZuqC5gy-0"
            },
            {
              label: "User Setup Prototype",
              href: "https://www.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=1-5896&p=f&viewport=59%2C932%2C0.28&t=T7CbjHFrZBjwV0Ai-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A5890&page-id=0%3A1&hide-ui=1"
            },
            {
              label: "City Selection Prototype",
              href: "https://www.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=5-10885&page-id=0%3A1&starting-point-node-id=5%3A10885&scaling=scale-down&content-scaling=fixed&hide-ui=1"
            },
            {
              label: "Home Feed Prototype",
              href: "https://www.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=2022-9345&page-id=2%3A5281&starting-point-node-id=2022%3A9345&hide-ui=1"
            },
            {
              label: "Property Feedback Interaction",
              href: "https://www.figma.com/proto/ybSunSwwHgQMKjleqmU4V1/Loft-App?node-id=8-7737&viewport=1%2C1029%2C0.5&t=gjSm7qoWJLV5vRdD-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=8%3A7737&page-id=2%3A5282&hide-ui=1"
            }
          ]
        }
      ],
      divider: "dark"
    }
  ]
};
