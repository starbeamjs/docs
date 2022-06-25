import { searchPlugin } from "@vuepress/plugin-search";
import {
  defineUserConfig,
  HeadConfig,
  viteBundler,
} from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { containers } from "./plugins/containers";
import { deps } from "./plugins/flowchart";
import { fences } from "./plugins/fences";
import { snippetPlugin } from "./plugins/snippet";
import project from "./project.json" assert { type: "json" };
import { Nav } from "./config/nav";
import { vite } from "./config/vite";
import { sidebarFrom } from "./config/sidebar";

const navbar = Nav.fromJSON(project.nav).toConfig();
const sidebar = sidebarFrom(project.sidebar);

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
      mdEnhance: {
        gfm: true,
        container: true,
        sup: true,
        sub: true,
        footnote: true,
        tex: true,
        flowchart: true,
        stylize: [],
        mark: true,
        imageMark: true,
        tabs: true,
        codetabs: true,
        mermaid: true,
        vpre: true,
        demo: true,
      },
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
