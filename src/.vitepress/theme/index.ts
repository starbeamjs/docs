/// <reference types="@vue/runtime-dom" />

import { Uid } from "@shimyshack/uid";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import theme from "vitepress/theme";
import type { App } from "vue";
import Demo from "../components/Demo/Demo.vue";
import Mermaid from "../components/Mermaid.js";
import StackBlitz from "../components/StackBlitz.vue";
import CodeTabs from "../components/Tabs/CodeTabs.vue";
import Tabs from "../components/Tabs/Tabs.vue";
import Api from "../components/api/Api.vue";
import Language from "../components/code/Language.vue";
import { Code } from "../packages/vitepress-snippets/browser.js";
import Layout from "./Layout.vue";
import "./static/lch.postcss";
import "./index.postcss";

export default {
  ...theme,
  Layout,
  async enhanceApp({ app }: { app: App }) {
    app.directive("uid", Uid);

    app.component("Code", Code);
    app.component("Language", Language);
    app.component("StackBlitz", StackBlitz);

    app.component("Demo", Demo);
    app.component("Mermaid", Mermaid);
    app.component("Tabs", Tabs);
    app.component("CodeTabs", CodeTabs);
    app.component("Api", Api);
    enhanceAppWithTabs(app);
  },
};
