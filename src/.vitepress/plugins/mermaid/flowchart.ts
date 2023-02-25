import type MarkdownIt from "markdown-it";
import type { PluginSimple } from "markdown-it";
import type { MermaidConfig } from "mermaid";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const styles = readFileSync(
  path.resolve(dirname, "../mermaid.css"),
  "utf-8"
);

const theme: MermaidConfig = {
  theme: "neutral",
  themeVariables: {
    fontFamily: "var(--starbeam-font-mono)",
    fontSize: "12px",
  },
  flowchart: {
    curve: "linear",
    htmlLabels: true,
  },
  themeCSS: styles.replace(/\s+/g, " "),
};

export const deps: PluginSimple = (md) => {
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const token = tokens[index]!;
    const realInfo = token.info.split(":", 2)[0];

    if (realInfo === "deps") {
      token.info = "mermaid" + token.info.slice(realInfo.length);

      token.content = `%%{init: ${JSON.stringify(
        theme
      )}}%%\nflowchart BT\n${indent(token.content)}`;
    }

    return fence!(...args);
  };
};

export const lifecycle: PluginSimple = (md) => {
  // Handle ```lifecycle
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const token = tokens[index]!;
    const [realInfo, options] = token.info.split(" ", 2);

    if (realInfo === "lifecycle") {
      const attrs = Object.fromEntries(token.attrs ?? []);
      const direction = Object.keys(attrs)[0] ?? "TB";
      token.info = "mermaid";

      token.content = `%%{init: ${JSON.stringify(
        theme
      )}}%%\nflowchart ${direction}\n${indent(token.content)}`;
    }

    return fence!(...args);
  };
};

export const flowchart = (md: MarkdownIt) => {
  md.use(deps);
  md.use(lifecycle);
};

function indent(str: string): string {
  return str
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");
}
