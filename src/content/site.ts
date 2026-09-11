export const site = {
  name: "Clóves",
  greeting: "Hi!",
  title: "I'm Clóves.",
  bio: "A Product Designer with over 10 years of experience turning real user problems into experiences that drive business impact.",
  footer: "Designed by a human.\nBuilt together with AI.",
};

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: "Work", href: "/" },
  { label: "About me", href: "/about" },
];
