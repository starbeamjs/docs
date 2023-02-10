import type MarkdownIt from "markdown-it";
import { resolve } from "node:path";
import type { MarkdownOptions } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { snippets } from "../packages/vitepress-snippets/build.js";
import { codeTabs } from "../plugins/code-tabs/code-tabs.js";
import { containers } from "../plugins/containers/containers.js";
import { fences } from "../plugins/fences.js";
import { mark } from "../plugins/mark/mark.js";
import { flowchart } from "../plugins/mermaid/flowchart.js";
import { mermaid } from "../plugins/mermaid/mermaid.js";
import { highlight as createHighlight } from "./syntax-highlight/highlight.js";
import { markdownItShikiTwoslashSetup } from "./syntax-highlight/setup.js";
import { root } from "./vite.js";

const Shiki = await markdownItShikiTwoslashSetup({
  themes: ["github-dark", "github-light"],
});

console.log({ root: resolve(root, "packages/twoslash") });

const shiki = (md: MarkdownIt) => {
  return Shiki(md, {
    includeJSDocInHover: true,

    ignoreCodeblocksWithCodefenceMeta: ["no-shiki"],
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
    md.use(shiki);
    md.use(fences);
    md.use(snippets);
    md.use(containers);
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
