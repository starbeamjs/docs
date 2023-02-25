# Reactive Arrays

<script setup lang="ts">
  import * as resources from "../demos/tutorial-5/config.js";
</script>

This lesson builds on the previous lesson, which introduced
reactive arrays.

In this lesson, we'll take advantage of the fact that we're using
an array to add support for an arbitrary number of counters.

This example illustrates how to refactor a component that uses
Starbeam into multiple components.

:::💡

The **TL;DR** is that you break apart components using Starbeam
the same way as you'd break apart any React component.

The main thing to keep in mind is that if you use reactive values
in one of the smaller component, you need to make sure to use
`Component` or `useReactive`.

But don't worry 😄. If you forget, you'll get a clear error
message reminding you of the requirement and pointing you to the
reactive access.

:::

## What We're Building

<Demo :config="resources" />

:::tip Breaking it Apart

This demo expands on the Reactive Arrays lesson, which used a
reactive array to store the counters, and rendered everything in
a single component.

In this bonus lesson, we break the component into smaller
components, and use `reactive.array` to store a richer object for
each counter.

This is a common pattern in React apps, and it's easy to do with
Starbeam. This bonus lesson helps you get your hands dirty with a
multi-component example. Go to town!

:::
