<script setup lang="ts">
import { computed } from "vue";
import type { TokensBuilder } from "./tokens.js";

const props = defineProps<{ tokens: TokensBuilder }>();

const body = computed(() => {
  const out: string[] = [];

  for (const token of props.tokens.done()) {
    if (token.condition === undefined || token.condition === true) {
      const classes = [`starbeam-${token.kind}`];
      if (token.class) {
        classes.push(token.class);
      }
      out.push(`<span class="${classes.join(" ")}">${token.text}</span>`);
    }
  }

  return `<div class="line">${out.join("")}</div>`;
});
</script>

<template>
  <div class="language-ts">
    <pre class="manual"><code v-html="body" /></pre>
  </div>
</template>
