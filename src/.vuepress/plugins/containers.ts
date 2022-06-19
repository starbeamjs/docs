import { container } from "vuepress-plugin-md-enhance/lib/node";
import type { PluginSimple } from "markdown-it";
import { PluginWithParams } from "markdown-it";

export const blockEmphasis: PluginSimple = (md) =>
  container(md, {
    name: "emphasis",
    openRender: () => "<blockquote class='em'>\n",
    closeRender: () => "</blockquote>\n",
  });

export const lightBulb: PluginSimple = (md) =>
  container(md, {
    name: "💡",
    openRender: () => "<div class='lightbulb'>\n",
    closeRender: () => "</div>\n",
  });

export const algorithm: PluginSimple = (md) =>
  container(md, {
    name: "algorithm",
    openRender: () => "<div class='algorithm'>\n",
    closeRender: () => "</div>\n",
  });

export const containers: PluginSimple = (md) => {
  md.use(blockEmphasis);
  md.use(lightBulb);
  md.use(algorithm);
};
