# Getting Started

<script setup lang="ts">
  import * as resources from "../demos/tutorial-1/config.js";
</script>

Welcome to the Starbeam tutorial for TypeScript-flavored React.

This will teach you everything you need to know to build reusable, universal code with Starbeam, and
how to use it in React with TypeScript.

You can also read the docs:

- the [universal docs], which describe Starbeam's API for creating reusable code that works in any
  framework (including React).
- the [React docs], which give you a more in-depth look at how to use Starbeam in React.

## What is Starbeam?

Starbeam is a library for creating reusable reactive code that works in any framework.

We won't waste your time with a long introduction to reactive programming. Let's dive right in and
see how it works.

## What We're Building

In this first example, we'll build a simple counter component. It will have:

- a display that shows the current value of the counter
- a button that increments the counter
- a button that resets it to zero.

<Demo :config="resources" />

Feel free to play around with the example, and mess around with the code in `src/components/Counter.tsx`.

> Future examples will dig into the API in more detail, so don't worry
> if you don't understand everything yet.

## Creating a Counter

We'll use `@starbeam/universal` and `@starbeam/react` to create a reusable counter component.

```snippet
<!--@include: ../demos/tutorial-1/src/components/Counter.tsx-->
```

The easiest way to use Starbeam in a React component is to use the `Component` function. The
function you pass to `Component` (the "setup function") runs once when the component is mounted,
and returns a function that runs every time React renders the component (the "render function").

In this case, the setup function uses `Cell` to create a reactive variable, and the render function
uses it to display the current value of the counter. It also has a button that increments the
counter when clicked.
