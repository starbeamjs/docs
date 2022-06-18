import type Token from "markdown-it/lib/token";
import { hash } from "@vuepress/utils";
import { PluginSimple } from "markdown-it";
import { RenderRule } from "markdown-it/lib/renderer.js";

const CSS = `* { box-sizing: border-box }`;

const theme = {
  theme: "neutral",
  themeVariables: {
    fontSize: "0.75rem",
    fontFamily: "Azeret Mono",
  },
  flowchart: { curve: "linear" },
  themeCSS: CSS,
};

export const deps: PluginSimple = (md) => {
  // Handle ```flow and ```flowchart blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const token = tokens[index];
    const realInfo = token.info.split(":", 2)[0];

    if (realInfo === "deps") {
      token.info =
        "mermaid" + token.info.slice(realInfo.length);

      token.content = `%%{init: ${JSON.stringify(
        theme
      )}}%%\nflowchart BT\n${indent(token.content)}`;
    }

    return fence!(...args);
  };
};

function indent(str: string): string {
  return str
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");
}
