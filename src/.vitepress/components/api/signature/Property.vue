<script setup lang="ts">
import type { Property } from "@starbeam/api-docs";
import { md } from "../md.js";
import Section from "../Section.vue";
import Tag from "./fragments/Tag.vue";
import Manual from "./Manual.vue";
import { tokens } from "./tokens.js";
export type TypeDoc = [type: string, docs: string];

export interface FormattedType {
  type: string;
  docs?: string;
  optional: boolean;
}

const props = defineProps<{
  property: Property;
}>();

const signature = tokens()
  .add((t) => {
    if (props.property.modifiers) {
      for (const modifier of props.property.modifiers) {
        t.add("kind", modifier);
        t.add(" ");
      }
    }
  })
  .add("name", props.property.name)
  .add(": ")
  .add("type", props.property.type.name)
  .add(";");
</script>

<template>
  <Section
    class="card-container"
    kind="property"
    :level="4"
    :for="props.property"
  >
    <template #head>
      <code>{{ props.property.name }}</code>
      <Tag v-for="tag in props.property.tags" :tag="tag" />
    </template>
    <template #contents>
      <section class="card">
        <Manual :tokens="signature" />
        <slot></slot>
        <div v-if="props.property.docs" v-html="md(props.property.docs)" />
      </section>
    </template>
  </Section>
</template>
