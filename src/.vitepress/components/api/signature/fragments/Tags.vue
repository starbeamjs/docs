<script lang="ts" setup>
import type * as api from "@starbeam/api-docs";
defineProps<{ tags: api.Tag[] }>();
</script>

<template>
  <span class="starbeam-tag">{{ tags.join(", ") }}</span>
</template>
