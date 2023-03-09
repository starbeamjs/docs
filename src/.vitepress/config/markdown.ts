import type MarkdownIt from "markdown-it";
import { resolve } from "node:path";
import type { MarkdownOptions } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import fencedContainer from "../packages/fenced-container/index.js";
import { snippets } from "../packages/vitepress-snippets/build.js";
import { codeTabs } from "../plugins/code-tabs/code-tabs.js";
import { containers } from "../plugins/containers/containers.js";
import { fences } from "../plugins/fences.js";
import { mark } from "../plugins/mark/mark.js";
import { flowchart } from "../plugins/mermaid/flowchart.js";
import { mermaid } from "../plugins/mermaid/mermaid.js";
import d2, { DarkTheme, LightTheme, type D2Options } from "./d2/d2.js";
import { highlight as createHighlight } from "./syntax-highlight/highlight.js";
import { markdownItShikiTwoslashSetup } from "./syntax-highlight/setup.js";
import { root } from "./vite.js";

const Shiki = await markdownItShikiTwoslashSetup({
  themes: ["github-dark", "github-light"],
});

const shiki = (md: MarkdownIt) => {
  return Shiki(md, {
    ignoreCodeblocksWithCodefenceMeta: ["no-shiki"],
    vfsRoot: resolve(root, "packages/twoslash"),
    defaultCompilerOptions: {
      moduleResolution: 100,
    },
  });
};

const THEME = {
  dark: "github-dark",
  light: "github-light",
};

const highlight = await createHighlight(THEME, "typescript");

export const MARKDOWN: MarkdownOptions = {
  lineNumbers: false,
  theme: THEME,
  highlight,
  config: (md) => {
    md.use(snippets);
    md.use(shiki);
    md.use(fencedContainer);
    md.use(fences);
    md.use(containers);
    md.use(d2, {
      layout: {
        type: "elk",
        padding: {
          block: 20,
          inline: 20,
        },
      },
      pad: 20,
      theme: LightTheme.EarthTones,
      darkTheme: DarkTheme.DarkMauve,
    } satisfies D2Options);
    md.use(mermaid);
    md.use(flowchart);
    md.use(mark);
    md.use(tabsMarkdownPlugin);
    md.use(codeTabs);
  },
  toc: {
    level: [2, 3, 4],
  },
};
