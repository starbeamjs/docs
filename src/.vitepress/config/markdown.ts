import type MarkdownIt from "markdown-it";

import { resolve } from "node:path";
import ts from "typescript";
import { snippets } from "../packages/vitepress-snippets/build.js";
import { codeTabs } from "../plugins/code-tabs/code-tabs.js";
import { containers } from "../plugins/containers/containers.js";
import { fences } from "../plugins/fences.js";
import { mark } from "../plugins/mark/mark.js";
import { flowchart } from "../plugins/mermaid/flowchart.js";
import { mermaid } from "../plugins/mermaid/mermaid.js";
// import { tabs } from "../plugins/tabs/tabs.js";
import { markdownItShikiTwoslashSetup } from "./syntax-highlight/setup.js";
import type { Config } from "./types.js";
import { root } from "./vite.js";

const Shiki = await markdownItShikiTwoslashSetup({
  themes: ["github-dark", "github-light"],
  wrapFragments: true,
  includeJSDocInHover: true,
  disableImplicitReactImport: true,
  vfsRoot: resolve(root, "packages/twoslash"),
  ignoreCodeblocksWithCodefenceMeta: ["no-shiki"],
});

const OPTIONS: ts.CompilerOptions = {
  experimentalDecorators: true,
  target: ts.ScriptTarget.ESNext,
};

const shiki = (md: MarkdownIt) =>
  Shiki(md, {
    themes: ["github-dark", "github-light"],

    vfsRoot: resolve(root, "packages/twoslash"),
    defaultCompilerOptions: OPTIONS,
    ignoreCodeblocksWithCodefenceMeta: ["no-shiki"],
  });

export const MARKDOWN: Config["markdown"] = {
  lineNumbers: false,
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  config: (md) => {
    md.use(shiki);
    md.use(fences);
    md.use(snippets);
    md.use(containers);
    md.use(mermaid);
    md.use(flowchart);
    md.use(mark);
    //   // md.use(tabs);
    md.use(codeTabs);
  },
  toc: {
    level: [2, 3, 4],
  },
};
