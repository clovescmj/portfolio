import type { CaseStudy } from "@/types/case-study";

// Hero points at the raw transparent PNG on purpose; Hero.tsx paints the backdrop in CSS.
export const contractTemplateManagement: CaseStudy = {
  slug: "contract-template-management",
  title: "Contract Template Management",
  client: "QuintoAndar",
  tags: [
    "Operational Efficiency",
    "Compliance",
    "UI Design",
    "Systems Thinking"
  ],
  heroImage: {
    src: "/images/projects/contract-template-management/hero.png",
    alt: "Contract Template Management, versions list screen"
  },
  intro: [
    "Rental contract and attachment templates at QuintoAndar carried compliance debt, and reducing it was our OKR. Legal owned the content but depended on Engineering to publish any change, with no record of who changed what, while analysts rewrote attachment text by hand in a legacy editor. I designed an internal platform that puts both template types under Legal's control, with every change tracked and attachments locked to their variables.",
    "A rental contract is generated from a base template, plus attachments for what was negotiated, such as property improvements or item removal. Two teams work on that step: Legal, who owns the content, and Operations analysts, who negotiate day to day and turn each agreement into an attachment.",
    "This was part of QuintoAndar's IPO compliance program. I led design as Staff Product Designer in FR Transact (Q3 2026), working with one PM and five engineers over three months. The RFC was reviewed and approved before build started."
  ],
  rowGap: 72,
  sections: [
    {
      kind: "columns",
      title: "Problem",
      columns: [
        {
          paragraphs: [
            "The rental contract template itself was authored in Google Docs, then hand-coded into HTML by an engineer and saved to an internal service. Every new contract pulled that template and filled it with the real deal data. Any change to the legal text, a clause edit or a compliance update, meant asking an engineer to rewrite and redeploy the template by hand. That took 4 to 6 weeks per change, even though the content itself belonged to legal."
          ]
        },
        {
          paragraphs: [
            "The bigger risk was the attachment. To formalize a negotiation, an analyst logged the deal details in a spreadsheet, pulled a text template from Google Docs, and pasted it into a legacy internal contract generation tool, an old rich text editor old enough that the browser itself flagged it as insecure. There, the analyst could rewrite the legal content of an attachment however they wanted. No permissioning, no audit trail, on 8% of all contracts created."
          ]
        }
      ],
      divider: "dark"
    },
    {
      kind: "columns",
      title: "Understanding",
      subtitle: "Findings from interviews with Legal and Ops teams.",
      columns: [
        {
          items: [
            {
              title: "For Legal team",
              list: [
                "They felt a lack of autonomy, since every version change depended on Engineering, a lack of auditability and a lack of standardization. The last two map directly to compliance.",
                "Also, because attachments were being edited by hand, they feared that something could end up exposing the company legally."
              ]
            }
          ]
        },
        {
          items: [
            {
              title: "For Operations team",
              list: [
                "Bureaucratic and manual processes, spread across parallel tools, could lead them to errors that would end up registered in the contract.",
                "They said they need the freedom to edit attachments, because every negotiation has details a standard template can't cover. That freedom was exactly what created the risk the initiative had to close."
              ]
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
};
