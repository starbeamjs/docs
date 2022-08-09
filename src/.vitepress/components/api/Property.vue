<script setup lang="ts">
import type { Property } from "./exports.js";
import { md } from "./md.js";
import Section from "./Section.vue";
export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  property: Property;
}>();
</script>

<template>
  <Section :level="4" :for="props.property">
    <template #head>
      <code>{{ props.property.name }}</code>
    </template>
    <template #contents>
      <div class="language-ts">
        <pre class="manual">
      <code>
        <span class="starbeam-kind">{{props.property.prefix}} </span>
        <span class="starbeam-name">{{ props.property.name }}</span>
        <span class="starbeam-punct">: </span>
        <span class="starbeam-type">{{ props.property.type.name }}</span>
        <span class="starbeam-punct">;</span>
      </code>
    </pre>
      </div>

      <slot></slot>

      <div v-if="props.property.docs" v-html="md(props.property.docs)" />
    </template>
  </Section>
</template>
