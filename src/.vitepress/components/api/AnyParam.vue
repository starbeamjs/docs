<script lang="ts" setup>
import type { Parameter } from "./exports.js";
import Param from "./Param.vue";

defineProps<{ param: Parameter }>();
</script>

<template>
  <template v-if="param.hasOptions()" v-for="option in param.options()">
    <Param :param="option" />
  </template>
  <template v-else-if="param.hasBareType()">
    <Param :param="param" />
  </template>
</template>
