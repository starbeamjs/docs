<script lang="ts" setup>
defineProps<{ optional: boolean }>();
</script>

<template>
  <code v-bind="$attrs" class="starbeam-inline starbeam-bg-dark">
    <span class="starbeam-name"><slot /></span>
    <span v-if="optional" class="starbeam-punct">?</span>
  </code>
</template>
