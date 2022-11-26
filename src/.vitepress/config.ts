import { defineConfig } from "vitepress";
import { HEAD } from "./config/head.js";
import { MARKDOWN } from "./config/markdown.js";
import { NAV, SOCIAL } from "./config/Nav.js";
import { SIDEBAR } from "./config/Sidebar.js";
import { BUILD_HOOKS, CONFIG, SITE } from "./config/Site.js";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { VITE } from "./config/vite.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  ...CONFIG,
  ...BUILD_HOOKS,
  head: HEAD,
  outDir: path.resolve(dirname, "../../docs"),
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
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
});
