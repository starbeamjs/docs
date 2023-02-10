import type { NavItem, SocialLink } from "./types.js";

export const NAV: NavItem[] = [
  {
    text: "Guides",
    link: "/guides/",
  },
  {
    text: "API",
    link: "/api/",
  },
  {
    text: "Frameworks",
    items: [
      {
        text: "React",
        link: "/frameworks/react/",
      },
      {
        text: "Preact",
        link: "/frameworks/preact/",
      },
    ],
  },
];

export const SOCIAL: SocialLink[] = [
  { icon: "github", link: "https://github.com/starbeamjs/starbeam" },
];
