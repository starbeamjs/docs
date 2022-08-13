<script setup lang="ts">
import Codicon from "../../Codicon.vue";
import Icon from "../../Icon.vue";
import type { AbstractInterfaceMembers } from "../exports.js";
import Section from "../Section.vue";
import Function from "./Function.vue";
import Property from "./Property.vue";
export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  type: AbstractInterfaceMembers;
}>();
</script>

<template>
  <Section
    v-if="props.type.hasProperties"
    kind="properties"
    class="group"
    :level="3"
    :for="{ slug: props.type.slug }"
  >
    <template #head>
      <Codicon icon="symbol-struct" title="properties" />
      Properties
    </template>
    <template #contents>
      <template v-for="property in props.type.properties">
        <Property :property="property" />
      </template>
    </template>
  </Section>
  <Section
    v-if="props.type.hasMethods"
    kind="methods"
    class="group"
    :level="3"
    :for="{ slug: props.type.slug }"
  >
    <template #head>
      <Icon icon="bolt" title="methods" />
      <!-- <Codicon icon="symbol-class" title="methods" /> -->
      Methods
    </template>
    <template #contents>
      <template v-for="method in props.type.methods">
        <Function :fn="method" />
      </template>
    </template>
  </Section>
</template>
