<script setup lang="ts">
import Defs from "../../Defs.vue";
import type { Generic } from "../../exports.js";
import Docs from "../Docs.vue";
import Type from "../Type.vue";
defineProps<{ generics: Generic[] }>();
</script>

<template>
  <div class="generics">
    <Defs class="docs generics" :defs="generics">
      <template #entry="{ item }: { item: Generic }">
        <Type class="generic">{{ item.name }}</Type>
        <Type class="kw-extends" v-if="item.extends">
          {{ item.extends }}
        </Type>
      </template>
      <template #definition="{ item }: { item: Generic }">
        <Docs line>{{ item.docs }}</Docs>
      </template>
    </Defs>
  </div>
</template>
