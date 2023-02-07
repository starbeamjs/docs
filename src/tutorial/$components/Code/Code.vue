<script setup lang="ts">
import { SandpackProvider } from "sandpack-vue3";
import { useData } from "vitepress";
import { reactive } from "vue";
import {
  toSandpackDeps,
  toSandpackFiles,
  toSandpackOptions,
} from "./code/sandpack.js";
import type { ExampleConfig } from "./code/tree.js";
import DemoBody from "./DemoBody.vue";
const { config } = defineProps<{
  config: ExampleConfig;
}>();

const data = reactive(useData());
const versions = data.frontmatter["@starbeam:versions"];
const filename = data.page.relativePath;

console.log({ config });

const files = toSandpackFiles(config.files);
const options = toSandpackOptions(config);
const dependencies = toSandpackDeps({
  versions,
  dependencies: config.dependencies,
  filename,
});
</script>

<template>
  <div class="demo">
    <SandpackProvider
      :files="files"
      :options="options"
      :custom-setup="{ dependencies }"
      template="vanilla-ts"
    >
      <DemoBody />
    </SandpackProvider>
  </div>
</template>
