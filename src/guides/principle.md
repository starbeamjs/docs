# Our Guiding Principle

```md em
Untitled
```

```md em Titled
Testing
```

```md tip
If you model your reactive data like any other data, you can
build reliable reactive UIs with the skills you already have.
```

```md details
Untitled
```

```md details Some Title
Titled
```

**We believe that reactive programming should feel exactly like
regular programming.**

Reactive UI frameworks have a way of describing reactive inputs
and a way of describing an output in terms of those inputs, which
the framework automatically keeps up to date.

Starbeam's APIs for input data are annotated versions of normal
JavaScript data structures, and you use normal JavaScript
functions for all of your computation.

## What That Means in Practice

Here are some examples of how Starbeam's principles work in
practice, especially in ways that might be different from other
reactive frameworks you're familiar with.

### Data Updates Happen Immediately

When you update a reactive value, the reactive update happens
immediately. ==Any code that accesses the reactive value will see
the new value.==

There are no exceptions.

This means that you can write elaborate abstractions or libraries
that are built on reactive values, and they will behave exactly
as you expect regardless of how they're used by app code.

### You Derive State Using Normal Functions

If you want to compute a value from reactive values, you just use
functions.

You can also use getters, methods, and the new private versions
of those features to access the reactive values. You can mix and
match JavaScript features however you want. Once you've used a
reactive value to store your state, ==you don't have to think
about reactivity as you compute values.==

````md details Example
![#reactive-class](./-snippets/items.ts)

In this example, we built a `People` class that stores a list of
people. We used a [private field] to store a reactive array.

```md info
We could have stored it some other way (like a public field or
even in a `WeakMap`) and everything would have worked just as
well.
```

We created a `byLocation` method that uses a normal JavaScript
`filter` function to filter the array by location. And we use the
somewhat obscure `findIndex` method to find the person we're
updating, and updated the array by replacing the item at that
index.

At this point, we have a very normal JavaScript library that
completely hides the reactivity at its core.

If we then **render** the result of `byLocation`, the renderer
will update the output whenever `update` is called.

**The bottom line is**: While Starbeam's reactive values and
rendering concept may feel analogous to the reactive systems
you're used to, the similarities end with those concepts. All
other reads and writes to those reactive values are normal
JavaScript.
````

[private field]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
