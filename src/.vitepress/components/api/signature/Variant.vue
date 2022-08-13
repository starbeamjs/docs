<script setup lang="ts">
import { computed } from "vue";
import type { Property, Variant } from "../exports.js";
import Section from "../Section.vue";
import Docs from "./Docs.vue";
import Manual from "./Manual.vue";
import { tokens, TokensBuilder } from "./tokens.js";

const props = defineProps<{ variant: Variant }>();

function properties(
  tokens: TokensBuilder,
  properties: Record<string, Property>
): TokensBuilder {
  return tokens.indent((t) => {
    for (const [name, property] of Object.entries(properties)) {
      tokens
        .dim((t) => t.add(", "))
        .add("\n")
        .add("key", name)
        .add(": ")
        .add("type", property.type.name);
      // tokens.add(name, property.type, property.docs);
    }
  });
}

const signature = computed(() =>
  tokens()
    .add("{ ")
    .dim((t) => {
      if (props.variant.properties) {
        t.indent((t) => {
          t.add("\n").add("key", "type").add(": ").string(props.variant.name);
        });
      } else {
        t.add("key", "type").add(": ").string(props.variant.name);
      }
    })
    .add((t) => {
      if (props.variant.properties) {
        properties(t, props.variant.properties);
        t.add("\n");
      } else {
        t.add(" ");
      }
    })
    .add("}")
);
</script>
<template>
  <Section :for="variant" class="card" :level="4">
    <template #head>
      <code>{{ variant.name }}</code>
    </template>
    <template #contents>
      <Manual :tokens="signature" />
      <Docs line v-if="variant.docs">{{ variant.docs }}</Docs>
    </template>
  </Section>
</template>
