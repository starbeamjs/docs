# The Tutorial

This tutorial teaches you what you need to know to:

1. Build React applications using Starbeam
2. Build reusable Starbeam code that you could use in React or
   any other framework with a Starbeam renderer.

## Lessons

1. [Getting Started]: Build a simple counter using
   `@starbeam/react`.
2. [Computed Data]: Learn how to use normal JavaScript functions
   to compute data and use them in your React components. We'll
   add a second counter to our example and show the sum of the
   two counters.
3. [Reactive Builtins]: Learn how to use `reactive.object` to
   group multiple reactive values together in an object that has
   the same API as a normal JavaScript object. We'll update our
   counters to use a reactive object to store their state.
4. [Reactive Arrays]: Learn how to use `reactive.array` to create
   a reactive array. We'll update our counters to use an array to
   store their state.
   - [Reactive Arrays Bonus]: This bonus lesson builds on the
     reactive arrays lesson to add support for an arbitrary
     number of counters, and a way to add new counters.
5. [Custom Reactive Objects]{.coming-soon}: Learn how to create
   your own reactive objects. We'll create a reactive object that
   stores the state of a counter, and use it in our counter
   component.
6. [Custom Reactive Objects Using a Class]{.coming-soon}: Learn
   how to create your own reactive objects using a native
   JavaScript class. This is the same as the previous lesson, but
   uses a class instead of a plain object. We support both
   styles, and you can choose whichever you prefer.
7. [Resources]{.coming-soon}: Learn how to create custom reactive
   objects that need to be cleaned up when they're no longer
   needed. In this example, we'll switch gears and build a simple
   component that shows a clock that updates every second. Under
   the hood, it will use a `Clock` resource that will keeps
   itself up to date using a `setInterval`, and automatically
   clean itself up when the component is unmounted. Buckle in,
   this is where it starts to get interesting!

[getting started]: ./1-getting-started.md
[computed data]: ./2-computed-data.md
[reactive builtins]: ./3-reactive-builtins.md
[reactive arrays]: ./4-reactive-arrays.md
[reactive arrays bonus]: ./5-reactive-arrays-bonus.md
