import MarkdownIt, { PluginSimple } from "markdown-it";

const CSS = `* { box-sizing: border-box } foreignObject {  display: block; } span {  all:revert; font-display: block;  text-size-adjust: 100%; font-size: 1rem; line-height: 1.4; box-sizing: border-box; display: inline-block; white-space: nowrap; } b { font-weight: normal; color: #666; } span.nodeLabel { width: max-content; max-width:60ch; white-space:normal; overflow-wrap: break-word;  } .lifecycle span span.nodeLabel, span.edgeLabel, g.node.note foreignObject div span.nodeLabel { line-height: 1.35;  padding:0  }  g.node.lifecycle span.nodeLabel { font-weight: bold; }  .lifecycle span.nodeLabel { color: #a00 }  .lifecycle span.nodeLabel span { font-size: 80%; font-weight: bold; padding-inline: 0.5rem; padding-block-end: 0.2rem; border-radius: 0.5ch; background-color: #eb9; color: #975; } span.edgeLabel:not(:empty) { padding: 0.5rem; color: #999; background-color: #eee }`;

const theme = {
  theme: "neutral",
  themeVariables: {
    fontFamily: "Azeret Mono",
  },
  flowchart: {
    curve: "linear",
    htmlLabels: true,
  },
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

export const lifecycle: PluginSimple = (md) => {
  // Handle ```lifecycle
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const token = tokens[index];
    const [realInfo, options] = token.info.split(":", 2);

    if (realInfo === "lifecycle") {
      token.info = "mermaid";

      token.content = `%%{init: ${JSON.stringify(
        theme
      )}}%%\nflowchart ${
        options ? options : "TB"
      }\n${indent(token.content)}`;
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
