# Reactive Arrays

<script setup lang="ts">
  import * as resources from "../demos/tutorial-4/config.js";
</script>

Reactive objects are nice, but in this case, we're really storing
an array of values.

For this situation, it makes more sense to use `reactive.array`.
Just like `reactive.object`, a reactive array has the same API as
a normal JavaScript array.

Updates to the reactive array are reactive, which means that our
component's render function will automatically update when the
array changes.

## What We're Building

<Demo :config="resources" :size="600" />

## The Code

!(../demos/tutorial-4/src/components/Counter.tsx)

## A Bonus Lesson

Since we've put the counters into an array, it makes sense to
extract the counter buttons into their own component, and to
support an arbitrary number of counters.

If you're interested, check out the Reactive Arrays bonus lesson!
