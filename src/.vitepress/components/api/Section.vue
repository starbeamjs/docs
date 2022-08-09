<script setup lang="ts">
import { computed } from "vue";

export interface For<T extends string> {
  slug: string;
  tag?: T;
}

const props = defineProps<{
  for: For<any>;
  level: 2 | 3 | 4 | 5 | 6;
  class?: string;
}>();

const slug = computed(() => {
  if (props.class) {
    return props.for.slug + "--" + props.class;
  } else {
    return props.for.slug;
  }
});
</script>

<template>
  <section :class="props.class">
    <component :is="`h${props.level}`" :id="slug">
      <slot name="head" />
      <span class="starbeam-tag" v-if="props.for.tag">{{ props.for.tag }}</span>
      <a class="header-anchor" aria-hidden="true" :href="`#${slug}`"> # </a>
    </component>
    <slot name="contents" />
  </section>
</template>
