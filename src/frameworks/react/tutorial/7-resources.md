# Resources

<script setup lang="ts">
  import * as resources from "../demos/tutorial-7/config.js";
</script>

So far, all of our reactive objects have been in-memory values that the garbage collector can clean up without any extra work.

But we sometimes have values that represent a live resource that needs to be cleaned up once it's no longer used.

For example, when you use `setInterval` to start a ticking clock, you need to call `clearInterval` once you no longer need it, or your timers will keep running in the background (a "leak").

In this example, we're creating a `Clock`: a custom reactive object whose value is the current time.

## What We're Building

<Demo :config="resources" />

## The Code: `Clock` Implementation

```snippet {#clock}
<!--@include: ../demos/tutorial-7/src/lib/clock.ts-->
```

The `Clock`:

- uses `Cell` to create a reactive variable that holds the current time
- sets up an interval to update the time every second
- registers an `on.cleanup` handler to clear the interval when the `Clock` is no longer used.
- returns an object with a `display` property that formats the time nicely.

The `Clock` is written using Starbeam's _universal_ APIs, which means it will work in any framework with a Starbeam renderer (like React).

The function passed to the `Resource` function is called the "resource constructor". It is called
when the component that uses the `Clock` is mounted, and whenever any reactive values used in the
constructor change.

:::tip What are resources?

Resources can:

- create stable values (like cells and functions)
- register `on.cleanup` handlers, which run when the resource is cleaned up
- return reactive values or functions that read from the stable reactive values created in the resource constructor.

Resources are cleaned up when:

- React unmounts the component that used the resource (including temporary unmounting in React 18)
- Any reactive values used in the resource constructor change.

A _resource_ is a self-contained way of creating a custom reactive object that needs to be cleaned
up.

Once a resource is `use`d, it behaves like any other reactive value. For example, you could access
its properties in a function that's used in a component's render function, and the component would
re-render whenever the resource's properties change.

:::

## The Code: Using `Clock` in React

```snippet {#usage}
<!--@include: ../$snippets/tutorial-7-resources.tsx-->
```

You can use the `Clock` in a React component by calling `use` with the `Clock` resource. The `use`
function returns a reactive values (just like a `Cell`), and you can use it alongside other reactive
values.

## Using the `Clock` as a Reactive Value

Instead of returning a formatted string, our resource returns the cell that holds the raw date.

```snippet {#clock}
<!--@include: ../$snippets/tutorial-7-resources-reactive-usage.tsx-->
```

In the component's setup function, we call `use(Clock)`, as before, write a function that
formats the time nicely, and use it in the component's render function.

```snippet {#usage}
<!--@include: ../$snippets/tutorial-7-resources-reactive-usage.tsx-->
```

:::💡

When a resource returns a reactive value, you don't need to call `.current` twice to get the value.
The resource's `.current` value is the current value of the reactive value it returns.

:::

The takeaway here is that resources are just a way of creating custom reactive objects that need to
be cleaned up. ==Once you've created a resource, you can use it just like any other reactive value.==

This is powerful, because it allows you to freely compose reactive values, regardless of whether
they need to be cleaned up or not.

## Thinking in Resources

Resources are a different way of thinking about most "effects".

For example, instead of thinking about `setInterval` as a side effect, you think about the current
time as a reactive value that changes over time, and which has cleanup logic.

The only difference between a resource and any other custom reactive object is that you need to
instantiate it with `use` rather than just calling a function, but once you've done that, you can
use it just like any other reactive value.
