<script setup lang="ts">
import type {
  ConstExport,
  ConstructorFnExport,
  InterfaceExport,
} from "../exports.js";
import Section from "../Section.vue";
import InterfaceMembers from "./InterfaceMembers.vue";
export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  type: InterfaceExport | ConstExport | ConstructorFnExport;
}>();
</script>

<template>
  <Section :for="props.type" :level="2">
    <template #head>
      <code>{{ props.type.name }}</code>
    </template>
    <template #contents>
      <InterfaceMembers :type="props.type" />
    </template>
  </Section>
</template>
