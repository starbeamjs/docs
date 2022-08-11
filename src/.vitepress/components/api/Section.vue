<script setup lang="ts">
import { computed } from "vue";

export interface For<T extends string> {
  slug: string;
  tag?: T;
}

const props = defineProps<{
  for: For<any>;
  level: 2 | 3 | 4 | 5 | 6;
  kind?: string;
  class?: string;
}>();

const slug = computed(() => {
  if (props.kind) {
    return props.for.slug + "--" + props.kind;
  } else {
    return props.for.slug;
  }
});
</script>

<template>
  <section :class="[props.kind, props.class]">
    <component class="section-head" :is="`h${props.level}`" :id="slug">
      <slot name="head" />
      <span class="starbeam-tag" v-if="props.for.tag">{{ props.for.tag }}</span>
      <a class="header-anchor" aria-hidden="true" :href="`#${slug}`"> # </a>
    </component>
    <slot name="contents" />
  </section>
</template>
