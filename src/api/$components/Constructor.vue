<script setup lang="ts">
import type { ConstructorFnExport } from "./exports.js";
import Function from "./Function.vue";

export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  fn: ConstructorFnExport;
}>();
</script>

<template>
  <Function :fn="props.fn" />

  <template v-for="method in props.fn.methods">
    <Function :fn="method" />
  </template>
</template>
