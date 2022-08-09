<script setup lang="ts">
import { computed } from "@vue/runtime-dom";
import { useData } from "vitepress";
import Constructor from "./Constructor.vue";
import { Exports } from "./exports.js";
import Function from "./Function.vue";
import type { YamlExports } from "./interface.js";
const data = useData();
console.log(data.frontmatter.value);

const exports = computed(
  () => new Exports(data.frontmatter.value as YamlExports)
);
</script>

<template>
  <template v-for="[kind, group] in exports.grouped()">
    <template v-for="e in group">
      <template v-if="e.kind === 'constructor-fn'">
        <Constructor :fn="e" />
      </template>
      <template v-else>
        <Function :fn="e" />
      </template>
    </template>
  </template>
</template>
