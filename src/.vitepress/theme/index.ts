/// <reference types="@vue/runtime-dom" />

import theme from "vitepress/theme";
import type { App } from "vue";
import Api from "../components/api/Api.vue";
import Demo from "../components/Demo/Demo.vue";
import Mermaid from "../components/Mermaid.js";
// import Mermaid from "../components/Mermaid.js";
import StackBlitz from "../components/StackBlitz.vue";
import CodeTabs from "../components/Tabs/CodeTabs.vue";
import Tabs from "../components/Tabs/Tabs.vue";
import { Code } from "../packages/vitepress-snippets/browser.js";
import "./index.pcss";
import Layout from "./Layout.vue";
export default {
  ...theme,
  Layout,
  async enhanceApp({ app }: { app: App }) {
    app.component("Code", Code);
    app.component("StackBlitz", StackBlitz);

    app.component("Demo", Demo);
    app.component("Mermaid", Mermaid);
    app.component("Tabs", Tabs);
    app.component("CodeTabs", CodeTabs);
    app.component("Api", Api);
  },
};
