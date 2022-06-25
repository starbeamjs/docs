import { searchPlugin } from "@vuepress/plugin-search";
import { defineUserConfig, HeadConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { buildMdEnhance } from "./config/markdown";
import { Nav } from "./config/nav";
import { sidebarFrom } from "./config/sidebar";
import { vite } from "./config/vite";
import { containers } from "./plugins/containers";
import { fences } from "./plugins/fences";
import { deps } from "./plugins/flowchart";
import { snippetPlugin } from "./plugins/snippet";
import project from "./project.json" assert { type: "json" };

const navbar = Nav.fromJSON(project.nav).toConfig();
const sidebar = sidebarFrom(project.sidebar);
const mdEnhance = buildMdEnhance(project.markdown);

export default defineUserConfig({
  lang: "en-US",
  title: "Starbeam",
  description: "Reactivity Made Simple and Fun ✨",
  base: "/",

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
    md.use(deps);
    md.use(fences);
  },
  markdown: {
    importCode: false,
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
      )}:wght@${weight}&display=swap`,
    },
  ];
}
