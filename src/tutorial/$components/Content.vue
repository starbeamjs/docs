<script setup lang="ts">
import { useData } from "vitepress";
import { reactive } from "vue";
import Code from "./Code/Code.vue";
import type { Example } from "./code/tree.js";

const { page, site, frontmatter } = reactive(useData());
const title = page.title;

const relative = page.relativePath
  .replace(/^tutorial\//, `${site.base}tutorial/code/`)
  .replace(/\.md$/, `/config.ts`);

const config = (await import(relative)) as Example;
console.log({ config });
</script>

<template>
  <section class="description">
    <h1>{{ title }}</h1>

    <slot></slot>
  </section>
  <section class="code">
    <Code :config="{ ...config.initial }" />
  </section>
</template>

<style scoped>
section.description {
  display: grid;
  padding-inline: 1rem;
}
</style>
