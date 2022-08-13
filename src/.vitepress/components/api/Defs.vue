<script lang="ts" setup>
import Def from "./Def.vue";
const props = defineProps<{ class: string; defs: any[] }>();
</script>

<template>
  <dl :class="props.class ?? null">
    <Def v-for="def in props.defs">
      <template #entry>
        <slot name="entry" :item="def" />
      </template>
      <template #definition>
        <slot name="definition" :item="def" />
      </template>
    </Def>
  </dl>
</template>
