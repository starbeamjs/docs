# Formula Functions

While you can always use normal functions to compute values based
on cells, you can also turn functions into formulas:

1. Formulas recompute only when any reactive state used in the
   formula changes.
2. You can render a formula into the DOM using a Starbeam
   renderer.

```md tip
In practice, it's very uncommon for the overhead of formula
functions to outweigh the cost of JavaScript functions, even if
they iterate a medium-sized list and do some work for each entry.
```

To create a formula, pass a function to `Formula`.

![#create-formula](./-snippets/formulas.ts)

And you use the formula the same way as a function.

![#use-the-same-way](./-snippets/formulas.ts)
