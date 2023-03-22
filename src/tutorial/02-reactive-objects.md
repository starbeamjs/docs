---
layout: false
title: Reactive Builtins
type: tutorial
---

<script setup lang="ts">
import Tutorial from "@tutorial-vue/Tutorial/Tutorial.vue";
</script>

<Tutorial>

We've seen how you can store individual values in cells.

Starbeam also comes with reactive versions of JavaScript's
builtins like `Array`, `Map`, and `Set`.

:::tip Equivalent Behavior

These reactive builtins work exactly the same way as their
equivalent JavaScript APIs.

:::

## Reactive Objects

!(./-snippets/02-reactive-builtins/index.ts#object)

## Reactive Arrays

!(./-snippets/02-reactive-builtins/index.ts#array)

## Reactive Maps

!(./-snippets/02-reactive-builtins/index.ts#map)

</Tutorial>
