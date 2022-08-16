<script setup lang="ts">
import type { Type as ApiType } from "@starbeam/api-docs";
import Defs from "../../Defs.vue";
import Docs from "../Docs.vue";
import Type from "../Type.vue";
defineProps<{ generics: ApiType[] }>();
</script>

<template>
  <div class="generics">
    <Defs class="docs generics" :defs="generics">
      <template #entry="{ item }: { item: ApiType }">
        <Type>{{ item.name }}</Type>
        <Type v-if="item.extends">
          {{ item.extends }}
        </Type>
      </template>
      <template #definition="{ item }: { item: ApiType }">
        <Docs line>{{ item.docs }}</Docs>
      </template>
    </Defs>
  </div>
</template>
