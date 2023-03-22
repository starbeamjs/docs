import { defineConfig } from "vitepress";
import { NAV, SOCIAL } from "./config/Nav.js";
import { SIDEBAR } from "./config/Sidebar.js";
import { BUILD_HOOKS, CONFIG, SITE } from "./config/Site.js";
import { HEAD } from "./config/head.js";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { MARKDOWN } from "./config/markdown.js";
import { VITE } from "./config/vite.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  ...CONFIG,
  ...BUILD_HOOKS,
  head: HEAD,
  cleanUrls: false,
  outDir: path.resolve(dirname, "../../docs"),
  srcDir: path.resolve(dirname, "../../src"),
  base: "/",
  markdown: MARKDOWN,

  themeConfig: {
    nav: NAV,
    sidebar: SIDEBAR,
    socialLinks: SOCIAL,
    editLink: {
      pattern: "https://github.com/starbeamjs/docs/edit/main/src/:path",
      text: "Edit this page on GitHub",
    },
    ...SITE,
  },
  vite: VITE,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.includes("-"),
      },
    },
  },
});
