import { ThemeConfig } from "./types.js";

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
    ],
  },
];
