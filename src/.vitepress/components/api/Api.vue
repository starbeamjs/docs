<script setup lang="ts">
import type { Apis } from "@starbeam/api-docs";
import { useData } from "vitepress";
import { computed, useSlots } from "vue";
import { PublicApi } from "./exports.js";
import Constructor from "./signature/Constructor.vue";
import Function from "./signature/Function.vue";
import Interface from "./signature/Interface.vue";
import Variants from "./signature/Variants.vue";
import Toc from "./Toc.vue";
const data = useData();

const api = computed(() => new PublicApi(data.page.value.frontmatter as Apis));
console.log(api.value);
const slots = useSlots();
</script>

<template>
  <Toc :api="api" />

  <section class="head-notes" v-if="slots.default">
    <slot></slot>
  </section>

  <template v-for="[, group] in api.grouped()">
    <template v-for="e in group">
      <template v-if="e.kind === 'constructor-fn'">
      <Constructor :fn="e" />
      </template>
      <template v-else-if="e.kind === 'util-fn'">
        <Function :fn="e" />
      </template>
      <template v-else-if="e.kind === 'interface' || e.kind === 'const'">
        <Interface :type="e" />
      </template>
      <template v-else-if="e.kind === 'variants'">
        <Variants :type="e" />
      </template>
    </template>
  </template>
</template>
