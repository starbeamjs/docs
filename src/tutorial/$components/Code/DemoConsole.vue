<script lang="ts"></script>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Console, ConsoleItem, DataAPI, Encode } from "vue-console-feed";
import { ConsoleData, isArrayLogMethod } from "./code/console.js";

const { consoleData, isVisible } = defineProps<{
  consoleData: ConsoleData;
  isVisible: boolean;
}>();
const API = new DataAPI(true, 0);

const offset = ref(0);

watch([consoleData.logs, offset], ([allLogs, currentOffset]) => {
  if (allLogs.length === 0 && currentOffset === 0) {
    API.clear();
    return;
  }

  const consoleLogs = allLogs;
  const logs = consoleLogs.slice(currentOffset);
  offset.value = consoleLogs.length;

  for (const log of logs) {
    if (log.method === "assert") {
      API.error(Encode("Console.assert is not supported"));
      continue;
    }

    const method = log.method;
    if (Array.isArray(log.data)) {
      if (isArrayLogMethod(method)) {
        API[method](...log.data.map((data, i) => Encode(data, false, i === 0)));
        continue;
      }
    }

    API[method](Encode(log.data));
  }
});

function reset() {
  offset.value = 0;
  consoleData.reset();
}
</script>

<template>
  <div class="demo-console" v-show="isVisible">
    <button class="clear" v-on:click="reset" data-logs="">
      <span class="icon">clear_all</span> Clear Logs
    </button>
    <Console v-if="API.value.length > 0" :data="API.value" />
    <template v-else>
      <ConsoleItem
        class="empty"
        :data="Encode('No logs yet')"
        :no-location="true"
        type="log"
      />
    </template>
  </div>
</template>

<style lang="scss" scopes>
@use "vue-console-feed/style.css";

div.demo-console {
  display: grid;
  grid-template-columns: 1fr;

  button.clear {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: var(--sp-space-1);
    align-items: end;
    justify-self: end;
    margin-block: var(--sp-space-1);
    color: var(--sp-colors-clickable);

    &:hover {
      color: var(--sp-colors-hover);
    }

    &:active {
      color: var(--sp-colors-base);
    }
  }

  div.console-item.empty {
    display: grid;
    color: var(--sp-colors-disabled);
    justify-items: center;
  }
}
</style>
