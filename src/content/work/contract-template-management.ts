import type { WorkEntry } from "@/types/work";

// Hero points at the raw transparent PNG on purpose; Hero.tsx paints the backdrop in CSS.
export const contractTemplateManagement: WorkEntry = {
  slug: "contract-template-management",
  title: "Contract Template Management",
  client: "QuintoAndar",
  tags: [
    "UI Design",
    "Systems Thinking",
    "Product Strategy",
    "Stakeholder Management"
  ],
  kind: "case-study",
  card: {
    description: "Contract templates lived in hand-coded HTML, taking engineers weeks to update and leaving one attachment type editable with no audit trail. I designed a system giving the legal team direct control, closing a compliance risk ahead of the company's IPO.",
    image: {
      src: "/images/projects/contract-template-management/hero.png",
      alt: "Contract Template Management screenshot",
      treatment: "framed"
    },
    layout: {
      column: "right",
      colStart: 2,
      colSpan: 2,
      gapTop: 88
    }
  },
  page: {
    heroImage: {
      src: "/images/projects/contract-template-management/hero.png",
      alt: "Contract Template Management, versions list screen"
    },
    intro: [
      "In 2026, QuintoAndar was preparing for its IPO and needed to eliminate compliance risks built up over the years. My team, FR Transact, handled rental transactions from offer to contract signing, and one of the risks we owned was how contract and attachment templates were managed. Reducing it was one of our OKRs for H2 2026.",
      "Legal waited 4 to 6 weeks for engineering to publish any template change, while analysts manually edited the legal text of attachments on 8% of all contracts, with no permissions or audit trail.",
      "This initiative set out to give Legal autonomy over templates, give Operations a simpler and safer way to create attachments, and make every change traceable."
    ],
    rowGap: 72,
    sections: [
      {
        kind: "columns",
        title: "My Role",
        subtitle: "I was the Staff Product Designer on this initiative, leading design from discovery through delivery and working closely with legal, operations and engineering along the way.",
        columns: [
          {
            heading: "Main responsibilities",
            list: [
              "Mapping legal and operations workflows, pain points and workarounds.",
              "Consolidating and sharing findings with the team.",
              "Defining and designing the solution."
            ]
          },
          {
            list: [
              "Building prototypes and validating them with stakeholders.",
              "Handing off to engineering and following implementation through launch."
            ]
          }
        ],
        divider: "dark"
      },
      {
        kind: "chapter",
        title: "Understanding",
        labelWidth: "wide",
        divider: "dark",
        subsections: [
          {
            title: "Process",
            subtitle: "The Legal and Operations teams play a key role in contract templates management, but they were working with processes and tools that didn't support them.",
            topics: [],
            stacked: {
              image: {
                src: "/images/projects/contract-template-management/process-old.png",
                alt: "The old contract and attachment version creation process, from a Google Docs edit through hand-coded HTML to rollout",
                width: 656,
                height: 458
              },
              span: 4
            }
          },
          {
            title: "Pain Points",
            subtitle: "Findings from interviews with Legal and Ops teams.",
            topics: [
              {
                title: "For Legal team",
                list: [
                  "They felt a lack of autonomy, since every version change depended on Engineering, a lack of auditability and a lack of standardization. The last two map directly to compliance.",
                  "Also, because attachments were being edited by hand, they feared that something could end up exposing the company legally."
                ]
              },
              {
                title: "For Operations team",
                list: [
                  "Bureaucratic and manual processes, spread across parallel tools, could lead them to errors that would end up registered in the contract.",
                  "They said they need the freedom to edit attachments, because every negotiation has details a standard template can't cover. That freedom was exactly what created the risk the initiative had to close."
                ]
              }
            ]
          }
        ]
      },
      {
        kind: "columns",
        title: "Problem",
        columns: [
          {
            items: [
              {
                title: "Legal depends on engineering",
                body: "Legal owns the content but can't edit it, every change needs an engineer to rewrite and redeploy the HTML."
              },
              {
                title: "Manual, error-prone handoff",
                body: "Moving text from Google Docs to hand-coded HTML creates room for mistakes in the legal wording, so every change needed extensive testing before release."
              },
              {
                title: "Slow updates",
                body: "Each change took 4 to 6 weeks and had to compete with the rest of engineering's priorities, leaving compliance fixes and clause updates waiting in line."
              }
            ]
          },
          {
            items: [
              {
                title: "Uncontrolled editing of legal content",
                body: "Analysts can rewrite attachment clauses freely, with no permissioning."
              },
              {
                title: "Fragmented, manual process",
                body: "Analysts juggle a spreadsheet, Google Docs and a legacy tool to produce a single attachment."
              },
              {
                title: "No audit trail",
                body: "There's no record of who changed what, which is a serious gap for a company heading into an IPO."
              }
            ]
          }
        ],
        divider: "dark"
      },
      {
        kind: "columns",
        title: "Solution",
        columns: [
          {
            paragraphs: [
              "For this initiative, success meant closing the compliance gap: Legal in control of the content, every change on record and no free editing of legal text.",
              "I designed the full journey, from template registration by the Legal team to its actual use by Ops team in a real contract, working alongside the design team that owns the MagicLink platform to align new structure and components before building anything."
            ]
          },
          {
            paragraphs: [
              "For the Legal team, I built two flows: Contract template management and Attachment template management, each with a list, detail view of templates and new version creation. Giving them autonomy and control over all contract/attachment templates.",
              "For the Operations team, I built a feature in the Contract page where the analyst picks the right template for the negotiation, fills in the variables, sees a preview of the final document and adds it straight to the contract. That replaces a chain of spreadsheets, Google Docs, copy and paste, and free text editing."
            ]
          }
        ],
        divider: "dark",
        subsections: [
          {
            title: "New process",
            layout: {
              contentStart: 3
            },
            topics: [
              {
                body: [
                  "Together with the FR Transact and Legal teams I defined a new process to update contract templates, where the Legal team kept their own actual process of creating and reviewing a new template, but using our new tool to upload the doc."
                ]
              },
              {
                body: [
                  "We agreed that the FR Transact engineering team would still validate the doc - variables, structure, conditions - in the first version of Contract template management. The ideia is to build something even more robust and give even more autonomy to the Legal team in the near future."
                ]
              }
            ],
            flows: [
              {
                src: "/images/projects/contract-template-management/creation-process.webp",
                alt: "The new contract and attachment version creation process, from template upload through review to publication",
                width: 5422,
                height: 1236
              }
            ]
          },
          {
            title: "Contract and attachment template management",
            carousel: {
              slides: [
                {
                  src: "/images/projects/contract-template-management/home.webp",
                  alt: "Contract Template Management, versions list screen",
                  title: "Contract Template Management",
                  caption: "The contract version list: status, type, and who approved each one."
                },
                {
                  src: "/images/projects/contract-template-management/new-version.webp",
                  alt: "Creating a new contract template version",
                  title: "Contract Template Management",
                  caption: "Starting a new version: pick the type, describe the change, and link the spec sheet."
                },
                {
                  src: "/images/projects/contract-template-management/version-details.webp",
                  alt: "Contract template version details and approval status",
                  title: "Contract Template Management",
                  caption: "Reviewing a version: approval status, spec sheet, and who approved it."
                },
                {
                  src: "/images/projects/contract-template-management/attachment-list.png",
                  alt: "Attachment template management, versions list screen",
                  title: "Attachment Template Management",
                  caption: "The attachment version list, on its own tab."
                },
                {
                  src: "/images/projects/contract-template-management/attachment-new.png",
                  alt: "Creating a new attachment template version",
                  title: "Attachment Template Management",
                  caption: "Starting a new version: name it, set the contract type, and link the spec sheet."
                },
                {
                  src: "/images/projects/contract-template-management/attachment-details.png",
                  alt: "Attachment template version details and approval status",
                  title: "Attachment Template Management",
                  caption: "Reviewing an approved attachment: status, description, and linked document."
                }
              ],
              titleAbove: true
            }
          },
          {
            topics: [
              {
                title: "Adding an attachment to a contract",
                body: [
                  "Approved attachment templates become available in contract management, where the analyst chooses the attachment type and fills in only the variables enabled for editing, without touching the body of the attachment. I designed this tool as well.",
                  "This is where the pieces connect and the value is delivered: automation for Legal, ease of use for Operations and less compliance debt."
                ]
              },
              {
                title: "Scaling with AI-assisted tooling",
                body: [
                  "There are about 15 attachment templates already documented and structured by the legal team. I used an internal AI-assisted design tool built by the platform team to turn that into a repeatable routine: upload the legal team's spec document for a given attachment, then make small adjustments from there. That saved building each drawer in MagicLink by hand, one at a time.",
                  "For the property improvements template, I took that further, going from a static design to a functional HTML prototype myself, working out interaction details like conditional field visibility and transitions directly in code, using the same approach to get a working front end into the shared staging environment early, so the backend team can start building against it."
                ]
              }
            ],
            stacked: {
              embed: {
                src: "/files/add-attachment.html",
                title: "Property improvements attachment drawer prototype"
              },
              caption: "Prototype of the property improvements attachment drawer, built from the legal team's spec document."
            }
          }
        ]
      },
      {
        kind: "impact",
        divider: "dark",
        intro: "Success here means the compliance gap closes and the legal team owns something that was always theirs.",
        lists: [
          {
            items: [
              "Closes a concrete compliance risk tied to the company's IPO preparation, shipping a contract template management tool and an attachment template management tool, both for exclusive use by the legal team.",
              "Removes the engineering bottleneck on contract updates. What used to take 4 to 6 weeks is now managed directly by the legal team."
            ]
          },
          {
            items: [
              "Closes the audit and permissioning gap on attachments, previously editable by any analyst.",
              "Sets up the foundation to scale: templates now live as structured data, opening the door to native in-product signing down the line.",
              "Rollout planned across two phases within the same half year, with the RFC reviewed and approved before build started."
            ]
          }
        ]
      },
      {
        kind: "chapter",
        title: "Files and Prototypes",
        titlePlacement: "beside",
        subsections: [
          {
            links: [
              {
                label: "Contract Template Management",
                href: "https://www.figma.com/design/Y3nWK2wDPb1qB9qY4bs1gg/Contract-Template-Management?node-id=0-1&p=f&t=6vIFpxiyDKUWXCJu-0"
              },
              {
                label: "Add Attachment Prototype",
                href: "/files/add-attachment.html"
              }
            ]
          }
        ],
        divider: "dark"
      }
    ]
  }
};
