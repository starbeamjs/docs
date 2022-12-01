import type { PluginSimple } from "markdown-it";
import { container } from "./container.js";

export const blockEmphasis: PluginSimple = (md) =>
  container(md, {
    name: "emphasis",
    openRender: () => "<blockquote class='em'>\n",
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

export const containers: PluginSimple = (md) => {
  md.use(hack);
  md.use(blockEmphasis);
  md.use(lightBulb);
  md.use(construction);
  md.use(algorithm);
  md.use(api);
};
