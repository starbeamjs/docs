import { searchPlugin } from "@vuepress/plugin-search";
import { defineUserConfig, HeadConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { buildMdEnhance } from "./config/markdown";
import { Nav } from "./config/nav";
import { sidebarFrom } from "./config/sidebar";
import { vite } from "./config/vite";
import { containers } from "./plugins/containers";
import { fences } from "./plugins/fences";
import { flowchart } from "./plugins/flowchart";
import { snippetPlugin } from "./plugins/snippet";
import project from "./project.json" assert { type: "json" };

export type Flags = {
  [key: string]: "disabled" | "ready" | "enabled";
};

const navbar = Nav.fromJSON(project.nav).toConfig(
  project.flags as Flags
);
const sidebar = sidebarFrom(project.sidebar);
const mdEnhance = buildMdEnhance(project.markdown);
const base =
  (project.base as "/" | `/${string}/` | undefined) ?? "/";

export default defineUserConfig({
  lang: project.lang,
  title: project.title,
  description: project.description,
  base,

  head: [
    font("Readex Pro", { weight: "160..700" }),
    font("Baloo 2", { weight: "400..800" }),
    font("Expletus Sans", { weight: "400..700" }),
    font("Azeret Mono", { weight: "100..900" }),
    font("Comfortaa", { weight: "400..700" }),
  ],
  extendsMarkdown: (md, app) => {
    md.use(snippetPlugin(app));
    md.use(containers);
    md.use(flowchart);
    md.use(fences);
  },
  markdown: {
    importCode: false,
    extractHeaders: {
      level: [2, 3, 4, 5, 6],
    },
  },

  bundler: vite,

  theme: hopeTheme({
    navbar,
    sidebar,
    headerDepth: 1,
    iconAssets: "iconfont",
    plugins: {
      components: ["StackBlitz"],
      mdEnhance,
    },
  }),

  plugins: [
    searchPlugin({
      hotKeys: [
        {
          key: "k",
          ctrl: true,
        },
      ],
    }),
  ],
});

function font(
  family: string,
  { weight }: { weight: string }
): HeadConfig {
  return [
    "link",
    {
      rel: "stylesheet",
      href: `https://fonts.googleapis.com/css2?family=${family.replaceAll(
        " ",
        "+"
      )}:wght@${weight}&display=block`,
    },
  ];
}
