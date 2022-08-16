<script setup lang="ts">
import { api as docs, Exports } from "@starbeam/api-docs";
import { useData } from "vitepress";
import { computed, useSlots } from "vue";
import Constructor from "./signature/Constructor.vue";
import Function from "./signature/Function.vue";
import Interface from "./signature/Interface.vue";
import Variants from "./signature/Variants.vue";
import Toc from "./Toc.vue";
const data = useData();

const api = computed(() => {
  const frontmatter = data.frontmatter.value as docs.Apis;
  return Exports.from({
  apis: frontmatter,
  package: "todo",
  title: "todo",
  url: "todo"
});

});

const slots = useSlots();
</script>

<template>
  <Toc :api="api" />

  <section class="head-notes" v-if="slots.default">
    <slot></slot>
  </section>

  <template v-for="[, group] in api.grouped()">
    <template v-for="e in group">
      <template v-if="e.kind === 'fn:constructor'">
        <Constructor :fn="e" />
      </template>
      <template v-else-if="e.kind === 'fn:util'">
        <Function :fn="e" />
      </template>
      <template v-else-if="e.kind === 'interface' || e.kind === 'const'">
        <Interface :name="e.name" :type="e.members" />
      </template>
      <template v-else-if="e.kind === 'variants'">
        <Variants :type="e" />
      </template>
    </template>
  </template>
</template>
