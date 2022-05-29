import { defineConfig } from "vitepress";

import * as project from "./project.json" assert { type: "json" };

export default defineConfig({
  title: "Starbeam",
  description: "Universal Reactivity",
  head: [
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    [
      "link",
      {
        rel: "alternate icon",
        href: "/favicon.ico",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    [
      "meta",
      {
        name: "author",
        content: `${project.name} contributors`,
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "vitest, vite, test, coverage, snapshot, react, vue, preact, svelte, solid, lit, ruby, cypress, puppeteer, jsdom, happy-dom, test-runner, jest, typescript, esm, tinypool, tinyspy, c8, node",
      },
    ],
    ["meta", { property: "og:title", content: project.name }],
    ["meta", { property: "og:description", content: project.description }],
    ["meta", { property: "og:url", content: project.url }],
    ["meta", { property: "og:image", content: project.images.preview }],
    ["meta", { name: "twitter:title", content: project.name }],
    ["meta", { name: "twitter:description", content: project.description }],
    ["meta", { name: "twitter:image", content: project.images.preview }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["link", { href: project.font, rel: "stylesheet" }],
    ["link", { rel: "mask-icon", href: "/logo.svg", color: "#ffffff" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  ],

  themeConfig: {
    sidebar: {
      "/": [
        { text: "Why Starbeam", link: "/pages/guides/why" },
        {
          text: "Guides",
          children: [
            {
              text: "Getting Started",
              link: "/pages/guides/getting-started",
            },
            {
              text: "Guiding Principles",
              link: "/pages/guides/principles",
            },
          ],
        },
      ],
    },
  },
});
