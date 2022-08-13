<script lang="ts" setup>
import Codicon from "../../Codicon.vue";
import type { VariantsExport } from "../exports.js";
import Section from "../Section.vue";
import Variant from "./Variant.vue";

defineProps<{ type: VariantsExport }>();
</script>

<template>
  <Section :for="type" :level="2">
    <template #head>
      <Codicon icon="symbol-enum" />
      <code>{{ type.name }}</code>
    </template>
    <template #contents>
      <Section
        :for="{ slug: type.slug }"
        :level="3"
        kind="variants"
        class="group"
      >
        <template #head> Variants </template>
        <template #contents>
          <template v-for="variant in type.variants">
            <Variant :variant="variant" />
          </template>
        </template>
      </Section>
    </template>
  </Section>
</template>
