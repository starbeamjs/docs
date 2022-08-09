<script setup lang="ts">
import type { ConstructorFnExport } from "./exports.js";
import Function from "./Function.vue";
import { md } from "./md.js";
import Property from "./Property.vue";
import Section from "./Section.vue";
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

  <div v-if="props.fn.notes" class="notes" v-html="md(props.fn.notes)" />

  <Section
    v-if="props.fn.hasProperties"
    class="properties"
    :level="3"
    :for="{ slug: props.fn.slug }"
  >
    <template #head>Properties</template>
    <template #contents>
      <template v-for="property in props.fn.properties">
        <Property :property="property" />
      </template>
    </template>
  </Section>
  <Section
    v-if="props.fn.hasMethods"
    class="methods"
    :level="3"
    :for="{ slug: props.fn.slug }"
  >
    <template #head>Methods</template>
    <template #contents>
      <template v-for="method in props.fn.methods">
        <Function :fn="method" />
      </template>
    </template>
  </Section>
</template>
