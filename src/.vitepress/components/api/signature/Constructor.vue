<script setup lang="ts">
import type { ConstructorFn } from "@starbeam/api-docs";
import { md } from "../md.js";
import Section from "../Section.vue";
import Function from "./Function.vue";
import InterfaceMembers from "./InterfaceMembers.vue";
export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  fn: ConstructorFn;
}>();
</script>

<template>
  <Function :fn="props.fn" />

  <section v-if="props.fn.export.notes" class="card">
    <div class="notes" v-html="md(props.fn.export.notes)" />
  </section>

  <InterfaceMembers :type="props.fn.members" />
</template>
