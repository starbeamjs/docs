The rules for writing reactive code using Starbeam are based on our [guiding principle](./principle).

::: info Starbeam's Core Principle
If you model your reactive data like any other data, you can build reliable reactive UIs with the skills you already have.
:::

## Just Use JavaScript Builtins

1. Reactive data is stored in object properties, class fields, and other built-in JavaScript data structures.
2. You read and write reactive data using built-in JavaScript syntax and APIs.
3. You compute derived state using normal, unannotated functions, methods or getters.
4. That's it.

## Just Use Functions

**In Starbeam, you don't need a special API for creating reactive computations. You just use functions.**

These functions can be refactored and composed without thinking about reactivity at all.

```ts
import { reactive } from "@starbeam/core";

const date = reactive({ now: new Date() });

function format(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
```

You may be thinking: <q>How is that reactive?</q>. Let's turn it into a reactive object and use it in a React component.

### A Reactive Object

```ts
import { Reactive, reactive } from "@starbeam/core";

const FormattedDate = Reactive(() => {
  const date = reactive({ now: new Date() });

  function format(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  function refresh() {
    date.now = new Date();
  }

  return {
    get now() {
      return format(date.now);
    },
    refresh,
  };
});
```

### As a Class

You can also implement `FormattedDate` as a class using the `@reactive` decorator.

```ts
class FormattedDate {
  @reactive #date = new Date();

  get now() {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(this.#date);
  }

  refresh() {
    this.now = new Date();
  }
}
```

::: info No Superclass
We support JavaScript classes because they're a convenient way to describe some state, methods that operate on that state, and a constructor that initializes that state.

You don't need to use a special superclass, and it's fully reactive no matter how you instantiate it. If you prefer to use classes, go ahead and use them. If you prefer to avoid classes, you can use the `Reactive` function to create reactive objects.

Either way, it's just JavaScript.
:::

### In a React Component

Once you've created a reactive object, you can use it in your framework. Let's start with React.

```tsx
import { useReactive } from "@starbeam/react";
import { FormattedDate } from "./reactive/date.js";

export default function UpdatableDate() {
  const { format, refresh } = useReactive(FormattedDate);

  return (
    <>
      <button onClick={() => refresh()}>🔃</button>
      <div>{format()}</div>
    </>
  );
}
```

### In a Svelte Component

But the cool thing about Starbeam is that same reactive object works perfectly in other frameworks. Here's how you'd use it in Svelte.

```svelte
<script>
  import { use } from "@starbeam/svelte";
  import { FormattedDate } from "./reactive/date.js";

  const date = use(FormattedDate);
</script>

<button on:click={() => date.refresh()}>🔃</button>
<div>{date.now}</div>
```

### In a Vue Component

What about Vue? Why not!

```vue
<script setup lang="ts">
import { use } from "@starbeam/vue";
import { FormattedDate } from "./reactive/date.js";

const date = use(FormattedDate);
</script>

<template>
  <button @click="date.refresh">🔃</button>
  <div>{date.now}</div>
</template>
```

### In Ember :open_mouth:

If you can believe it, the exact same reactive object works in Ember too!

```tsx
import Component from "@glimmer/component";
import { use } from "@starbeam/ember";

export default class extends Component {
  @use(FormattedDate) date;

  <template>
    <button {{on "click" this.date.refresh}}>🔃</button>
    <div>{{this.date.now}}</div>
  </template>
}
```

## Summary

We believe that reactive programming should feel like regular programming. We also believe in making it possible to take advantage of Starbeam in your existing framework.

In this guide, we used a simple example to demonstrate the rules of Starbeam reactivity:

1. You store reactive data in object properties, class fields, and other built-in JavaScript data structures.
2. You read and write reactive data using built-in JavaScript syntax and APIs.
3. You compute derived state using normal functions, methods or getters.

We also showed how you can use reactive objects created in Starbeam and use them in your framework.

With that introduction out of the way, you're ready to start writing reactive code.

In the next section, we'll flesh out this example by letting `FormattedDate` take a locale as a parameter, and show how you can use it with your framework's existing data flow.

After that, you'll learn how to make the clock tick automatically using [resources](./resources) a powerful kind of reactive object that will allow us to create a `setInterval` and clean it up when the resource is no longer needed.

As you've seen, you will be able to use the same resource in a component in any framework, and it will automatically be cleaned up when your framework unmounts the component.

Let's go!
