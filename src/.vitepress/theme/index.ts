/// <reference types="@vue/runtime-dom" />

import { Uid } from "@shimyshack/uid";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import theme from "vitepress/theme";
import type { App } from "vue";
import Demo from "../components/Demo/Demo.vue";
import StackBlitz from "../components/StackBlitz.vue";
// import CodeTabs from "../components/Tabs/CodeTabs.vue";
// import Tabs from "../components/Tabs/Tabs.vue";
import Api from "../components/api/Api.vue";
// import Language from "../components/code/Language.vue";
import { Code } from "@starbeam-docs/snippets";
import { CustomBlock } from "@starbeam-docs/custom-block";
import { Layout } from "@starbeam-docs/theme";
import "./index.css";

const encode = globalThis.btoa;
const decode = globalThis.atob;

export default {
  ...theme,
  Layout,
  async enhanceApp({ app }: { app: App }) {
    app.mixin({
      methods: {
        encode: (s: string) => encode(s),
        decode: (s: string) => decode(s),
      },
    });
    app.directive("uid", Uid);
    app.component("Code", Code);
    app.component("CustomBlock", CustomBlock);
    // app.component("Language", Language);
    app.component("StackBlitz", StackBlitz);
    app.component("Demo", Demo);
    // app.component("Tabs", Tabs);
    // app.component("CodeTabs", CodeTabs);
    app.component("Api", Api);
    enhanceAppWithTabs(app);
  },
};
