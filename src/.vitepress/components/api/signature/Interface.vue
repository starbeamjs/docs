<script setup lang="ts">
import type { InterfaceMembers as InterfaceMembersApi } from "@starbeam/api-docs";
import Section from "../Section.vue";
import InterfaceMembers from "./InterfaceMembers.vue";
export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  type: InterfaceMembersApi;
  name: string;
}>();
</script>

<template>
  <Section :for="props.type" :level="2">
    <template #head>
      <code>{{ props.name }}</code>
    </template>
    <template #contents>
      <InterfaceMembers :type="props.type" />
    </template>
  </Section>
</template>
