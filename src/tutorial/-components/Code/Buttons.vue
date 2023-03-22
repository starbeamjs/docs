<script setup lang="ts">
import type { ConsoleData } from "@tutorial-lib/console.js";
import { computed } from "vue";

const props = defineProps<{
  consoleData: ConsoleData;

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
  <button
    v-on:click="props.console.toggle"
    class="toggle-button counted"
    :data-count="consoleCount"
  >
    <span>{{ props.console.text }}</span>
    <span class="count">{{ consoleCount }}</span>
  </button>
</template>

<style scoped lang="postcss">
button.toggle-button {
  font-family: var(--t-font-em);
  background-color: hsl(var(--hue), var(--saturation), var(--bg-lightness));
  color: hsl(var(--hue), var(--saturation), var(--fg-lightness));

  border-radius: 1em;
  padding-inline: var(--t-ui-gap-xs);
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out, width 0.1s ease-in-out;

  --hue: 0;
  --saturation: 0%;

  --fg-lightness: var(--sb-fg-lightness-brighter);
  --bg-lightness: var(--sb-bg-lightness-brighter);
}

button.toggle-button.counted {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  column-gap: var(--t-ui-gap-xxs);

  span.count {
    display: grid;
    transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;

    --fg-lightness: var(--sb-fg-lightness-brighter);
    --bg-lightness: var(--sb-bg-lightness-brightest);

    background-color: hsl(var(--hue), var(--saturation), var(--bg-lightness));
    color: hsl(var(--hue), var(--saturation), var(--fg-lightness));

    aspect-ratio: 1 / 1;
    align-items: center;
    padding-inline: 0.5em;
    border-radius: 50%;
  }
}

button.toggle-button:hover {
  --fg-lightness: var(--sb-fg-lightness-normal);
  --bg-lightness: var(--sb-bg-lightness-brightest);

  span.count {
    --fg-lightness: var(--sb-fg-lightness-brightest);
    --bg-lightness: var(--sb-bg-lightness-pure);
  }
}

button.toggle-button:active {
  --fg-lightness: var(--sb-fg-lightness-brighter);
  --bg-lightness: var(--sb-bg-lightness-brighter);

  span.count {
    --fg-lightness: var(--sb-fg-lightness-bright);
    --bg-lightness: var(--sb-bg-lightness-bright);
  }
}
</style>
