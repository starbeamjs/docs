/// <reference types="@vue/runtime-dom" />

import theme from "vitepress/theme";
import type { App } from "vue";
import Code from "../components/code/Code.vue";
import CodeDemo from "../components/code/CodeDemo.js";
import Mermaid from "../components/Mermaid.js";
import StackBlitz from "../components/StackBlitz.vue";
import CodeTabs from "../components/Tabs/CodeTabs.vue";
import Tabs from "../components/Tabs/Tabs.vue";
import "./index.scss";

export default {
  ...theme,
  enhanceApp({ app }: { app: App }) {
    app.component("Code", Code);
    app.component("StackBlitz", StackBlitz);
    app.component("CodeDemo", CodeDemo);
    app.component("Mermaid", Mermaid);
    app.component("Tabs", Tabs);
    app.component("CodeTabs", CodeTabs);
  },
};
