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

const TS = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 17.5c.32.32.754.5 1.207.5h.543c.69 0 1.25-.56 1.25-1.25v-.25a1.5 1.5 0 0 0-1.5-1.5a1.5 1.5 0 0 1-1.5-1.5v-.25c0-.69.56-1.25 1.25-1.25h.543c.453 0 .887.18 1.207.5M9 12h4m-2 0v6"/><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/></g></svg>`;

export const SOCIAL: SocialLink[] = [
  { icon: "github", link: "https://github.com/starbeamjs/starbeam" },
  { icon: { svg: TS }, link: "https://www.typescriptlang.org/" },
];
