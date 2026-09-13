export const site = {
  name: "Clóves",
  greeting: "Hi!",
  title: "I'm Clóves.",
  bio: "A Product Designer with over 10 years of experience turning real user problems into experiences that drive business impact.",
};

export interface NavItem {
  label: string;
  href: string;
  /** Extra path prefixes that should also count as active for this item — e.g. individual case studies under Work. */
  activePrefixes?: string[];
}

export const nav: NavItem[] = [
  { label: "Work", href: "/", activePrefixes: ["/work"] },
  { label: "About me", href: "/about" },
];

export interface SecondaryLink {
  label: string;
  href: string;
  /**
   * External links open in a new tab and are used as-is. Internal ones
   * (external: false) go through assetPath() and get a download
   * attribute — the only two shapes this footer group needs.
   */
  external: boolean;
}

export const secondaryLinks: SecondaryLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/clovescardoso", external: true },
  { label: "Resumé", href: "/files/resume.pdf", external: false },
];
