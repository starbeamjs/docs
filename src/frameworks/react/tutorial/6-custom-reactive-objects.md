# Custom Reactive Objects

<script setup lang="ts">
  import * as resources from "../demos/tutorial-6/config.js";
</script>

You're not limited to using reactive objects and reactive arrays. You can create your own custom reactive objects.

A custom reactive object is a regular JavaScript object returned from a function. The function is called a ==reactive constructor==.

## What We're Building

<Demo :config="resources" />

## The Reactive Constructor

```snippet {#custom}
<!--@include: ../demos/tutorial-6/src/lib/counter.ts-->
```

A reactive constructor is very similar to the `Component` function we've used in previous lessons.

The reactive constructor creates stable reactive values and functions, and returns an object that
provides methods and accessors for interacting with the reactive values.

## Using the Reactive Constructor in a Component

A reactive constructor is _called_ in a setup function and _used_ in a render function.

Here's how we use `CounterData` in our `Counter` component:

```snippet {#counter}
<!--@include: ../$snippets/tutorial-6-component.tsx-->
```

## Using a Native Class as a Reactive Constructor

You can also build custom reactive objects using a native JavaScript class.

:::💡
As a project, Starbeam supports both styles as first-class ways to create custom reactive objects. If you prefer native classes, go for it! On the other hand, if you dislike native classes, you can do everything using normal JavaScript functions. The choice is yours 😁.
:::

Here's the same `CounterData` reactive constructor, but implemented as a native class using private fields:

```snippet {#nativeclass}
<!--@include: ../$snippets/tutorial-6-native-class.ts-->
```

## The Future: JavaScript Decorators

In this lesson, we learned how to use standard JavaScript features to implement custom reactive objects.

At the moment, Starbeam has experimental support for using decorators to streamline the process of building reactive objects using classes.

```snippet {#nativeclass}
<!--@include: ../$snippets/tutorial-6-native-class-stage-1-decorators.ts-->
```

That experimental support uses Stage 1 decorators, because that's what the JavaScript ecosystem supported when we built the feature. However, the JavaScript standards body has now approved decorators as a Stage 3 feature, and TypeScript support for Stage 3 decorators is coming soon.

```js
export class CounterData {
  // Stage 3 decorators support private fields, so we can turn
  // `#counter` into a cell, but only expose a readonly getter
  // as a public property.
  @reactive @exposed accessor #counter = 0;
  readonly label: string;

  constructor(label: string) {
    this.label = label;
  }

  increment = () => this.#counter++;
  reset = () => (this.#counter = 0);
}
```

Stage 3 decorators are more flexible (they support private fields, for example). These flexibility improvements eliminate the biggest caveats with the experimental decorator support, and we're excited to migrate our experimental decorator support to Stage 3 in the coming months.

:::tip Coming Soon to a Starbeam Near You 🚀
Since Stage 3 decorators are coming, but not yet fully supported by the JS ecosystem, we suggest writing custom reactive objects without decorators, as described in this lesson.

Once Stage 3 decorators have landed in TypeScript, we intend to make them a more important part of how we recommend building custom reactive objects using native classes.
:::
