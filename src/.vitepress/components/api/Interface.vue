<script setup lang="ts">
import type { InterfaceExport } from "./exports.js";
import Function from "./Function.vue";
import Property from "./Property.vue";
import Section from "./Section.vue";
export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  type: InterfaceExport;
}>();
</script>

<template>
  <Section :for="props.type" :level="2">
    <template #head>
      <code>{{ props.type.name }}</code>
    </template>
    <template #contents>
      <Section
        v-if="props.type.hasProperties"
        class="properties"
        :level="3"
        :for="{ slug: props.type.slug }"
      >
        <template #head>Properties</template>
        <template #contents>
          <template v-for="property in props.type.properties">
            <Property :property="property" />
          </template>
        </template>
      </Section>
      <Section
        v-if="props.type.hasMethods"
        class="methods"
        :level="3"
        :for="{ slug: props.type.slug }"
      >
        <template #head>Methods</template>
        <template #contents>
          <template v-for="method in props.type.methods">
            <Function :fn="method" />
          </template>
        </template>
      </Section>
    </template>
  </Section>
</template>
