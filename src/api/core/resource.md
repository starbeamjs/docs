---
layout: doc
<!-- @include: ./$api/resource.yml -->
---

<!-- generated file -->
<Api>

# Resources

Resources are the main way to connect Starbeam to external input
data.

If you're used to using effects to connect external inputs in
other frameworks, resources serve a similar purpose. The primary
difference is that resources expose reactive data, just like
`FormulaFn`.

The author of a resource sets up an imperative subscription,
defines the cleanup logic for the subscription, and returns a
function that computes the current value of the resource.

As the resource modifies its internal cells, the value of the
resource is always up to date with the result of the computation.

```snippet {#resource}
<!--@include: ./-snippets/resource.tsx-->
```

Resources are defined in terms of Starbeam APIs, and then wired
into applications through renderers.

For example, you could use the stopwatch in the above example in
React by using the `useResource` hook from `@starbeam/react`.

```snippet {#react}
<!--@include: ./-snippets/resource.tsx-->
```

</Api>
