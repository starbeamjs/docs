<script setup lang="ts">
import Icon from "../Icon.vue";
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

  <section v-if="props.fn.notes" class="card">
    <div class="notes" v-html="md(props.fn.notes)" />
  </section>

  <Section
    v-if="props.fn.hasProperties"
    kind="properties"
    class="group"
    :level="3"
    :for="{ slug: props.fn.slug }"
  >
    <template #head><Icon icon="feed" />Properties</template>
    <template #contents>
      <template v-for="property in props.fn.properties">
        <Property :property="property" />
      </template>
    </template>
  </Section>
  <Section
    v-if="props.fn.hasMethods"
    kind="methods"
    class="group"
    :level="3"
    :for="{ slug: props.fn.slug }"
  >
    <template #head><Icon icon="bolt" />Methods</template>
    <template #contents>
      <template v-for="method in props.fn.methods">
        <Function :fn="method" />
      </template>
    </template>
  </Section>
</template>
