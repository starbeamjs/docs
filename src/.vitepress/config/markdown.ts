import { markdownItShikiTwoslashSetup } from "markdown-it-shiki-twoslash";
import {
  codeTabs,
  mark,
  mermaid,
  normalDemo,
  tabs,
} from "vuepress-plugin-md-enhance/lib/node/index.js";
import { snippets } from "../packages/vitepress-snippets/build.js";
import { containers } from "../plugins/containers.js";
import { fences } from "../plugins/fences.js";
import { flowchart } from "../plugins/flowchart.js";
import type { Config } from "./types.js";

// const { default: shikiTwoslash } = await import("markdown-it-shiki-twoslash");
const shiki = await markdownItShikiTwoslashSetup({
  themes: ["github-dark", "github-light"],
  wrapFragments: true,
});

export const MARKDOWN: Config["markdown"] = {
  config: (md) => {
    md.use(snippets);
    md.use(shiki, {
      themes: ["github-dark", "github-light"],
    });
    md.use(containers);
    md.use(mermaid);
    md.use(flowchart);
    md.use(mark);
    md.use(normalDemo);
    md.use(tabs);
    md.use(codeTabs);
    md.use(fences);
  },
  toc: {
    level: [2, 3, 4],
  },
};
