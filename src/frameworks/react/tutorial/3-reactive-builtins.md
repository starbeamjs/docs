# Reactive Builtins

<script setup lang="ts">
  import * as resources from "../demos/tutorial-3/config.js";
</script>

In the previous lesson, we created a second cell to hold our
second counter. This works, but there's a nicer way to create
multiple pieces of state: reactive builtins.

Reactive builtins are objects that have the same API as builtin
JavaScript objects, but they're reactive.

In this lesson, we'll move both counters into a single _reactive
object_.

## What We're Building

<Demo :config="resources" />

## The Code

By moving the two counters into a single reactive object, we can
use normal JavaScript property syntax to read and write them. And
the code is just as reactive as before.

```md tip Astute Readers
If you're wondering why we didn't use an array here, you're ahead
of the game! We'll cover reactive arrays in the next lesson.
```

!(../demos/tutorial-3/src/components/Counter.tsx#counter)
