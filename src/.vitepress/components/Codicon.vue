<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{ icon: string; title?: string }>();

const title = computed(() => props.title ?? inferTitle());

function inferTitle() {
  if (props.icon.startsWith("symbol-")) {
    return props.icon.substring("symbol-".length);
  } else {
    return props.icon.replaceAll("-", " ");
  }
}
</script>
<template>
  <span
    :class="['codicon', `codicon-${icon}`]"
    :title="title"
    aria-hidden="true"
  />
</template>
