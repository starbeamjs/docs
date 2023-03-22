import type MarkdownIt from "markdown-it";
import { resolve } from "node:path";
import type { MarkdownOptions } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import fencedContainer from "@starbeam-docs/fenced-container";
import { snippets } from "@starbeam-docs/snippets/mdit-plugin";
import { codeTabs } from "../plugins/code-tabs/code-tabs.js";
import { containers } from "../plugins/containers/containers.js";
import { fences } from "../plugins/fences.js";
import { mark } from "../plugins/mark/mark.js";
import d2, { DarkTheme, LightTheme, type D2Options } from "./d2/d2.js";
import { highlight as createHighlight } from "./syntax-highlight/highlight.js";
import { markdownItShikiTwoslashSetup } from "./syntax-highlight/setup.js";
import bracketedSpans from "markdown-it-bracketed-spans";
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
    md.use(bracketedSpans);
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
    md.use(mark);
    md.use(tabsMarkdownPlugin);
    md.use(codeTabs);
  },
  toc: {
    level: [2, 3, 4],
  },
};
