import type { PluginSimple } from "markdown-it";
import { container } from "./container.js";

export const blockEmphasis: PluginSimple = (md) =>
  container(md, {
    name: "emphasis",
    openRender: (tokens, idx) => {
      const token = tokens[idx];
      const info = token.info.trim().slice("emphasis".length).trim();

      return `<blockquote class='em'><p class='title'>${
        info || "Key Point"
      }</p>\n`;
    },
    closeRender: () => "</blockquote>\n",
  });

export const hack: PluginSimple = (md) =>
  container(md, {
    name: "hack",
    openRender: () => "<div style='display:none'>\n",
    closeRender: () => "</div>\n",
  });

export const lightBulb: PluginSimple = (md) =>
  container(md, {
    name: "💡",
    openRender: () => "<div class='lightbulb'>\n",
    closeRender: () => "</div>\n",
  });

export const reactPreact: PluginSimple = (md) =>
  container(md, {
    name: "react-preact",
    openRender: () => "<div class='react-preact'>\n",
    closeRender: () => "</div>\n",
  });

export const typescript: PluginSimple = (md) =>
  container(md, {
    name: "typescript",
    openRender: () => "<Language><template #ts>\n",
    closeRender: () => "</template></Language>\n",
  });

export const javascript: PluginSimple = (md) =>
  container(md, {
    name: "javascript",
    openRender: () => "<Language><template #js>\n",
    closeRender: () => "</template></Language>\n",
  });

export const construction: PluginSimple = (md) =>
  container(md, {
    name: "🚧",
    openRender: () => "<div class='construction'>\n",
    closeRender: () => "</div>\n",
  });

export const algorithm: PluginSimple = (md) =>
  container(md, {
    name: "algorithm",
    openRender: () => "<div class='algorithm'>\n",
    closeRender: () => "</div>\n",
  });

export const api: PluginSimple = (md) =>
  container(md, {
    name: "api",
    openRender: () => "<div class='api'>\n",
    closeRender: () => "</div>\n",
  });

export const docs: PluginSimple = (md) =>
  container(md, {
    name: "docs",
    openRender: () => "<div class='vp-doc VPDoc'>\n",
    closeRender: () => "</div>\n",
  });

export const containers: PluginSimple = (md) => {
  md.use(hack);
  md.use(typescript);
  md.use(javascript);
  md.use(reactPreact);
  md.use(blockEmphasis);
  md.use(lightBulb);
  md.use(construction);
  md.use(algorithm);
  md.use(api);
  md.use(docs);
};
