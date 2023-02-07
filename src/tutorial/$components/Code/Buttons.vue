<script setup lang="ts">
import { computed } from "vue";
import type { ConsoleData } from "./code/console.js";

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
  <button v-on:click="props.source.toggle" class="toggle-button">
    {{ props.source.text }}
  </button>
  <button
    v-on:click="props.console.toggle"
    class="toggle-button"
    :data-count="consoleCount"
  >
    {{ props.console.text }} <span class="count">{{ consoleCount }}</span>
  </button>
</template>
