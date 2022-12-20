import { markdownItShikiTwoslashSetup } from "markdown-it-shiki-twoslash";
import { resolve } from "node:path";
import { snippets } from "../packages/vitepress-snippets/build.js";
import { codeTabs } from "../plugins/code-tabs/code-tabs.js";
import { containers } from "../plugins/containers/containers.js";
import { fences } from "../plugins/fences.js";
import { mark } from "../plugins/mark/mark.js";
import { flowchart } from "../plugins/mermaid/flowchart.js";
import { mermaid } from "../plugins/mermaid/mermaid.js";
import { tabs } from "../plugins/tabs/tabs.js";
import type { Config } from "./types.js";
import { root } from "./vite.js";

const shiki = await markdownItShikiTwoslashSetup({
  themes: ["github-dark", "github-light"],
  wrapFragments: true,
  includeJSDocInHover: true,
  disableImplicitReactImport: true,
  vfsRoot: resolve(root, "packages/twoslash"),
});

export const MARKDOWN: Config["markdown"] = {
  config: (md) => {
    md.use(snippets);
    md.use(shiki, {
      themes: ["github-dark", "github-light"],
      vfsRoot: resolve(root, "packages/twoslash"),
      defaultCompilerOptions: {
        experimentalDecorators: true,
        target: "esnext",
      },
    });
    md.use(containers);
    md.use(mermaid);
    md.use(flowchart);
    md.use(mark);
    md.use(tabs);
    md.use(codeTabs);
    md.use(fences);
  },
  toc: {
    level: [2, 3, 4],
  },
};
