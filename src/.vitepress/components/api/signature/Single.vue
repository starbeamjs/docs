<script setup lang="ts">
import type { SingleToken } from './Manual.vue.js';

defineProps<{ token: SingleToken }>();
</script>

<template>
  <span v-if="token.length === 2 || token[2] === true" :class="`starbeam-${token[0]}`">
    {{ token[1] }}
  </span>
</template>