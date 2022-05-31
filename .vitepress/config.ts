import { defineConfig, type HeadConfig } from "vitepress";

import project from "./project.json" assert { type: "json" };
import { container } from "./theme/container.js";
import { GoogleFonts, type SpecifiedFont } from "./theme/fonts/google.js";
const root = process.env.VITE_ROOT || process.cwd();
import "prismjs";
import "prism-svelte";
import type { DefaultTheme } from "vitepress";

const FONTS = fonts();

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
    ["link", { rel: "mask-icon", href: "/logo.svg", color: "#ffffff" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    FONTS,
  ],

  themeConfig: {
    sidebar: {
      "/": sidebar(),
    },
  },

  markdown: {
    config: (md) => {
      container("philosophy")(md);
    },
  },
});

function sidebar() {
  const sidebar = project.sidebar;

  return entries(sidebar).map(([key, value]): DefaultTheme.SideBarItem => {
    const pages = entries(value.pages as Record<string, string>);

    if (pages.length === 1) {
      return {
        text: key,
        link: `/pages/${value.root}/${pages[0][1]}`,
      };
    } else {
      return {
        text: key,
        children: pages.map(([key, child]) => ({
          text: key,
          link: `/pages/${value.root}/${child}`,
        })),
      };
    }
  });
}

function fonts(): HeadConfig {
  const fonts = GoogleFonts.from(project.fonts as SpecifiedFont[]);

  return [
    "link",
    {
      rel: "stylesheet",
      href: fonts.toURL(),
    },
  ];
}

type Entry<R> = {
  [P in keyof R]: [P, R[P]];
}[keyof R];

function entries<R extends Record<string, unknown>>(object: R): Entry<R>[] {
  return Object.entries(object) as Entry<R>[];
}
