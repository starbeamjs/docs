<script lang="ts" setup>
import { computed, useSlots, VNode, VNodeChild } from "vue";
import { md } from "../md.js";

defineProps<{ line?: boolean }>();

function getSlotChildrenText(children: VNodeChild | undefined): string {
  if (children === undefined) {
    return "";
  }

  if (Array.isArray(children)) {
    return children
      .map((node) => {
        if (Array.isArray(node)) {
          return getSlotChildrenText(node);
        } else {
          return getAtomText(node);
        }
      })
      .join("");
  } else {
    return getAtomText(children);
  }
}

function getAtomText(
  atom: VNode | string | number | boolean | null | undefined | void
): string {
  if (typeof atom !== "object" || atom === null) {
    return String(atom);
  } else {
    const children = atom.children;

    if (typeof children === "string") {
      return children;
    } else if (Array.isArray(children)) {
      return getSlotChildrenText(children);
    } else {
      return "";
    }
  }
}

const slot = useSlots().default;

const docs = computed(() => getSlotChildrenText(slot?.()));
</script>

<template>
  <div v-if="docs" :class="['docs', line ? 'line' : null]" v-html="md(docs)" />
</template>
