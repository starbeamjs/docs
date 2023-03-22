# Computed Data

<script setup lang="ts">
  import * as resources from "../demos/tutorial-2/config.js";
</script>

Storing your data in cells is great, but real apps need to use
that data to compute things.

## What We're Building

<Demo :config="resources" :size="500" />

## Adding Two Counters

In this step, we'll slightly modify the example we built in the
previous step to create a second counter, and then show the total
of both counters.

When using Starbeam reactivity, you use a regular JavaScript
function to compute values from other reactive values.

!(../demos/tutorial-2/src/components/Counter.tsx#counter)
