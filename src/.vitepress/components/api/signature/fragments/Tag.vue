<script lang="ts" setup>
defineProps<{ tag: string | undefined }>();
</script>

<template>
  <span class="starbeam-tag" v-if="tag">{{ tag }}</span>
</template>
