<script setup lang="ts">
import { computed } from "vue";
import type { ConsoleData } from "./demo.js";

const props = defineProps<{
  consoleData: ConsoleData;
  source: {
    toggle: () => void;
    text: string;
  };
  console: {
    toggle: () => void;
    text: string;
  };
}>();

const consoleCount = computed(() => {
  return props.consoleData.logs.value.length;
});
</script>

<template>
  <button v-on:click="props.source.toggle" class="toggle-button toggle-source">
    {{ props.source.text }}
  </button>
  <button
    v-on:click="props.console.toggle"
    class="toggle-button toggle-console"
    :data-count="consoleCount"
  >
    {{ props.console.text }} <span class="count">{{ consoleCount }}</span>
  </button>
</template>
