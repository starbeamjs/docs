import "uno.css";
import "@unocss/reset/normalize.css";
import "./styles/upstream/code.css";
import "./styles/upstream/custom-blocks.css";
import "./styles/upstream/layout.css";
import "./styles/upstream/sidebar-links.css";
import "./styles/upstream/vars.css";

import "./styles/colors.css";
import "./styles/content.css";
import "./styles/typography.css";
import "./styles/schemes/syntax.css";
import "./styles/schemes/light.css";
import "./styles/schemes/dark.css";
import "./styles/schemes/universal.css";

// await import.meta.glob("./styles/upstream/*.css");
// await import.meta.glob("./styles/*.css");

import "../../main.css";

import type { Theme } from "vitepress";
// @ts-expect-error
import Layout from "./Layout.vue";
// @ts-expect-error
import NotFound from "./NotFound.vue";

const theme: Theme = {
  Layout,
  NotFound,
};

export default theme;
