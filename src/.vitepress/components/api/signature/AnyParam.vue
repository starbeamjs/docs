<script lang="ts" setup>
import type { Parameter } from "@starbeam/api-docs";
import Param from "./Param.vue";

defineProps<{ param: Parameter }>();
</script>

<template>
  <template v-if="param.options" v-for="option in param.options">
    <Param :param="option" />
  </template>
  <template v-else>
    <Param :param="param" />
  </template>
</template>
