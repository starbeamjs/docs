import { defineClientConfig } from "@vuepress/client";
import Code from "./components/Code.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("Code", Code);
  },
  setup() {},
  rootComponents: [],
});
