---
layout: false
title: Reactivity
type: tutorial
---

<script setup lang="ts">
import Tutorial from "@tutorial-vue/Tutorial/Tutorial.vue";
</script>

<Tutorial>

We've seen how you can read values from cells and reactive
builtins.

What makes them **reactive** is that renderers automatically
update their output whenever reactive values they depend on
change.

To demonstrate this, we'll use the **debug renderer** to log to
the console whenever a reactive value changes.

## The Debug Renderer

Typically, you'd use your framework's renderer (e.g.
`@starbeam/react` for React) to render a reactive value into the
DOM.

For this tutorial, we'll use the **debug renderer**, a simple
renderer that just calls a callback whenever the reactive value
changes.

This will allow us to see when the reactive value changes, giving
us insight into the behavior of the full-featured framework
renderers.

</Tutorial>
