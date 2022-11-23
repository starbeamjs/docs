# Getting Started

The best way to get started with Starbeam is by using the Starbeam renderer for your framework.

This section of the guides describes Starbeam's universal reactivity system that works with any
framework, and is a great resource to learn all about Starbeam once you've gotten up and running.

- [Getting Started with React](/frameworks/react/)
- [Getting Started with Preact](/frameworks/preact/)

## What is Starbeam?

Starbeam is a library that allows you to write reactive code in a framework agnostic way. This means
that you can write your code once, and use it with any framework that has a Starbeam renderer.

At the moment, Starbeam has renderers for React and Preact. We've also built a proof of concept
renderer for Svelte and we're working on a Vue renderer.

## What is Universal Reactivity?

Starbeam is a _universal reactivity_ system. If you're familiar with React hooks, you can think of
Starbeam as a way of writing **universal hooks**.

Unlike a lot of other reactivity libraries, Starbeam's reactivity system goes beyond reactive data.

Starbeam provides four universal building blocks:

- [Reactive data](/guides/fundamentals/data.md): simple values, computed values, and reactive
  versions of JavaScript's built-in data structures (added in 0.5).
- [Reactive resources](/guides/fundamentals/resources.md): reactive values with lifecycle. You can
  use these to create reactive data sources, like a WebSocket connection or a fetch request (added
  in 0.6).
- [Reactive services](/guides/fundamentals/services.md): reactive application state. Services are
  resources that are set up once per app instance, and cleaned up when the application root is
  unmounted. You can use these to create reactive data sources that are shared across components
  without relying on module-level state and mocking (added in 0.8).
- [Reactive modifiers](/guides/fundamentals/modifiers.md): reactive DOM modifiers. You can use these
  to define DOM behavior that is based on reactive data, and whose setup and cleanup behavior is
  tied to an element in the DOM (prototyped in the repo, coming in 0.10).

:::💡
When you write code using these universal building blocks, you use the Starbeam libraries and
**don't** reference any specific framework.

Starbeam is expressive enough to allow you to write code that builds on powerful framework features
such as React's concurrent APIs and Preact's signals, but you don't need to know about the details
of these features to use them.

When we say that Starbeam is a **universal reactivity** framework, we **don't** mean that Starbeam
is a lowest-common-denominator library.

Instead, _we_ jump through hoops to find streamlined APIs that are expressive enough to take
advantage of advanced framework features and ergonomic enough to use in any framework environment so
_you_ don't have to.
:::
