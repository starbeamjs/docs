import type { ThemeConfig } from "./types.js";

export const NAV: ThemeConfig["nav"] = [
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

export const SOCIAL: ThemeConfig["socialLinks"] = [
  { icon: "github", link: "https://github.com/starbeamjs/starbeam" },
];
