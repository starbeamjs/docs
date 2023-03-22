<script setup lang="ts">
import { toSandpackDeps, toSandpackFiles, toSandpackOptions } from "@tutorial-lib/sandpack.js";
import type { ExampleConfig } from "@tutorial-lib/tree.js";
import { SandpackProvider } from "sandpack-vue3";
import { useData } from "vitepress";
import { reactive } from "vue";
import DemoBody from "./CodeExample.vue";
const { config } = defineProps<{
  config: ExampleConfig;
}>();

const data = reactive(useData());
const versions = data.frontmatter["@starbeam:versions"];
const filename = data.page.relativePath;

const files = toSandpackFiles(config.files);
const options = toSandpackOptions(config);
const dependencies = toSandpackDeps({
  versions,
  dependencies: config.dependencies,
  filename,
});
</script>

<template>
  <div class="code">
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

<style scoped lang="postcss">
.code,
:deep(.sp-wrapper) {
  display: contents;
}
</style>
