import type { CaseStudy } from "@/types/case-study";

export const contractTemplateManagement: CaseStudy = {
  slug: "contract-template-management",
  title: "Contract Template Management",
  client: "QuintoAndar",
  tags: ["Operational Efficiency", "Compliance", "UI Design", "Systems Thinking"],
  heroImage: {
    src: "/images/projects/contract-template-management.png",
    alt: "Contract Template Management, versions list screen",
  },
  intro: [
    "A rental contract at QuintoAndar is the outcome of a longer journey: a renter submits a proposal, sends documentation, goes through credit analysis, pays the deposit, and only then does the contract get drafted and signed. That drafting step is where legal text and attachments come together.",
    "Two teams live inside that step. The legal team owns the contract's content: clauses, legal text, compliance requirements. They had no way to update any of it without going through engineering. Operations analysts handle the negotiation day to day, then have to turn each agreement into an actual contract attachment.",
    "This project set out to fix that step, as part of QuintoAndar's broader IPO compliance program. I led design over three months, working with one PM and five engineers.",
  ],
  problem: [
    [
      "The contract template itself was authored in Google Docs, then hand-coded into HTML by an engineer and saved to an internal service. Every new contract pulled that template and filled it with the real deal data. Any change to the legal text, a clause edit or a compliance update, meant asking an engineer to rewrite and redeploy the template by hand. That took 4 to 6 weeks per change, even though the content itself belonged to legal.",
      "The bigger risk was the attachment. To formalize a negotiation, an analyst logged the deal details in a spreadsheet, pulled a text template from Google Docs, and pasted it into a legacy internal contract generation tool, an old rich text editor old enough that the browser itself flagged it as insecure. There, the analyst could rewrite the legal content of an attachment however they wanted. No permissioning, no audit trail, on 8% of all contracts created.",
    ],
    [
      "I mapped this from both sides. Legal's biggest frustration was the lack of autonomy: every version change depended on engineering, alongside a real fear that something in an attachment could end up exposing the company legally. Operations' process was fully manual and split across parallel tools, with real room for error.",
      "Analysts said they need the freedom to edit, because every negotiation has details a standard template can't cover. That freedom in the attachment text was exactly what created the risk the initiative needed to close.",
    ],
  ],
  solution: [
    [
      "I designed the full journey, from template registration by the legal team to its actual use inside a real contract, working alongside the design team that owns the MagicLink platform to validate structure and component use before building anything.",
    ],
    [
      "Two flows came out of it, contract template management and attachment template management, each with a list and detail view of active templates, new version creation with a change summary and a link to a standardized spreadsheet, an approval flow with a permission screen and confirmation, and loading, error, empty, and no-permission states.",
    ],
  ],
  carousel: [
    {
      src: "/images/projects/contract-template-management-home.png",
      alt: "Contract Template Management, versions list screen",
      caption:
        "The approval process behind both template types. A new version or attachment gets created, reviewed by the legal team, submitted with a linked spec document, tested in staging, and only goes live once it is explicitly approved.",
    },
    {
      src: "/images/projects/contract-template-management-new-version.png",
      alt: "Creating a new contract template version",
      caption:
        "Starting a new version of a contract template. From the version list, the legal team picks the type of contract, defines whether it is a simple fix or a broader revision, and links the standardized spreadsheet before sending it for approval.",
    },
    {
      src: "/images/projects/contract-template-management-version-details.png",
      alt: "Contract template version details and approval status",
      // No matching slide in the Figma file (it only mocks the first two) —
      // placeholder copy, needs a real caption from Clóves.
      caption:
        "Reviewing a version in progress: its approval status, the linked spreadsheet, and who created and approved each change.",
    },
  ],
  approvalFlow: {
    intro: "Two flows, contract template management and attachment template management, each with:",
    list: [
      "A list and detail view of active templates.",
      "New version creation, with a change summary and a link to a standardized spreadsheet.",
      "An approval flow, with a permission screen and confirmation.",
      "Loading, error, empty, and “no permission” states covered.",
    ],
  },
  attachmentLibrary: {
    body: [
      "I built a library of multiple attachment templates, each pre-built for a specific type of situation (item removal and property improvements are two examples among several). Each template only exposes what actually needs to vary in that case: responsible party, items, rooms, deadline, reimbursement agreement, value cap. The clause text itself stays fixed.",
      "The analyst picks the right template for the negotiation, fills in the variables, sees a preview of the final document, and adds it straight to the contract, from the deal page itself. That replaces the spreadsheet, Google Docs, copy-paste, free text editing chain.",
    ],
  },
  scaling: [
    "There are about 15 attachment templates already documented and structured by the legal team. I used an internal AI-assisted design tool built by the platform team to turn that into a repeatable routine: upload the legal team's spec document for a given attachment, then make small adjustments from there. That saved building each drawer in MagicLink by hand, one at a time.",
    "For the property improvements template, I took that further, going from a static design to a functional HTML prototype myself, working out interaction details like conditional field visibility and transitions directly in code, using the same approach to get a working front end into the shared staging environment early, so the backend team can start building against it.",
  ],
  embed: {
    src: "/files/drawer-anexo.html",
    caption:
      "Working prototype of the property improvements attachment drawer, built from the legal team's spec document, with conditional fields and transitions.",
  },
  impact: {
    intro:
      "Success here means the compliance gap closes and the legal team owns something that was always theirs.",
    itemsLeft: [
      "Closes a concrete compliance risk tied to the company's IPO preparation, shipping a contract template management tool and an attachment template management tool, both for exclusive use by the legal team.",
      "Removes the engineering bottleneck on contract updates. What used to take 4 to 6 weeks is now managed directly by the legal team.",
    ],
    itemsRight: [
      "Closes the audit and permissioning gap on attachments, previously editable by any analyst.",
      "Sets up the foundation to scale: templates now live as structured data, opening the door to native in-product signing down the line.",
      "Rollout planned across two phases within the same half year, with the RFC reviewed and approved before build started.",
    ],
  },
};
