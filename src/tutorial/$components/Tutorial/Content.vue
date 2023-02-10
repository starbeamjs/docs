<script setup lang="ts">
import { modules } from "@tutorial-lib/modules.js";
import type { Example } from "@tutorial-lib/tree.js";
import Code from "@tutorial-vue/Code/Code.vue";
import Tabs from "@tutorial-vue/Tabs/Tabs.vue";
import { useData } from "vitepress";
import { computed, useSlots, type Slot } from "vue";

const page = useData().page.value;
const title = page.title;

const relative = page.relativePath.replace(/^tutorial\//, ``).replace(/\.md$/, ``);

const module = modules[relative];

if (module === undefined) {
  throw Error(`Tutorial ${relative} not found`);
}

const config = (await module()) as Example;

const slots = useSlots() as { default: Slot };

const content = computed(() => slots.default());
</script>

<template>
  <Tabs title="Tutorial" columns="50ch 1fr">
    <template #description>
      <title>Description</title>
      <h1>{{ title }}</h1>
      <slot />
    </template>
    <template #code>
      <title>Hands On</title>
      <Code :config="{ ...config.initial }" />
    </template>
  </Tabs>
</template>

<style scoped lang="scss">
:deep(section.code) {
  display: contents;
}
section.description {
  display: block;
  overflow: auto;
  padding-inline: 1rem;
}

:deep(section.description) {
  .code-container {
    display: block;
  }
}
</style>
