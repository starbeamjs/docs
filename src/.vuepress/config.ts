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

export default defineUserConfig({
  lang: "en-US",
  title: "Starbeam Documentation",
  base: "/docs/",

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

  bundler: viteBundler({
    viteOptions: {
      build: {
        target: "esnext",
      },
      esbuild: {
        target: "node18",
      },
    },
  }),

  theme: hopeTheme({
    navbar: [
      "/guides/README.md",
      "/api/README.md",
      {
        text: "Frameworks",
        icon: "style",
        children: [
          {
            text: "React",
            link: "/frameworks/react/1-getting-started.md",
          },
          "/frameworks/svelte/README.md",
          "/frameworks/vue/README.md",
          "/frameworks/ember/README.md",
        ],
      },
      "/demos/README.md",
      "/details/README.md",
    ],
    sidebar: {
      "/guides/": "structure",
      "/api/": "structure",
      "/frameworks/react/": "structure",
      "/frameworks/svelte/": "structure",
      "/frameworks/vue/": "structure",
      "/frameworks/ember/": "structure",
      "/demos/": "structure",
      "/details/": "structure",
    },
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
