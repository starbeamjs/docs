# Functions

In the [previous section](./cells.md), we kept repeating that
updates to cells take effect immediately. That will start to
matter once we build functions that compute values based on the
value of a cell.

```md info Compute Values Using Functions
In Starbeam, there is no special concept such as "derived state"
or "computed property" that you use to compute a value from
reactive values.

Instead, you use JavaScript's built-in mechanism for computing
values based on other values: functions.
```

## A Simple Function

!(./-snippets/functions.ts#simple-function)

## Calling the Function

To get the computed value, you call the function.

!(./-snippets/functions.ts#use-as-normal)

Because updates to cells take effect immediately, calling a
function immediately after updating a cell will always return an
up-to-date result.

```md tip A Weird Feeling
You might be getting the feeling that you're being tricked and
there's nothing reactive about what we're doing.

That's what we mean when we say that reactivity in Starbeam feels
like normal JavaScript.

But don't worry! You'll soon see how these seemingly normal
JavaScript functions can reactively update the DOM.
```

## Passing Cells as Arguments

You can also pass cells into functions as arguments.

!(./-snippets/functions.ts#cells-as-arguments)

And then use the function as normal.

!(./-snippets/functions.ts#use-cell-arguments-as-normal)

````md persona power-user
## Optionally Reactive Arguments {.protip}

You may want to write a function that is _able_ to take a
reactive value as an argument, but will also accept a normal
value as well.

```md 💡
This is especially important when writing universal code (code
that is intended to work across multiple frameworks).
```

Instead of reading the cell by accessing its `current` property,
you can use the `read` function to read its value. If you call
`read` with a non-reactive value, it will return the value you
passed it.

```md lang-ts
Instead of taking a `Reactive<T>` as an argument, you can take an
`IntoReactive<T>`.
```

!(./-snippets/functions.ts#into-reactive)

When you pass a non-reactive value in, the function behaves as if
you had passed in a reactive value that never changes.

!(./-snippets/functions.ts#calling-into-reactive)
````

## Optimizing Expensive Computations {.optimization}

So far, we've seen that you can use normal functions to compute
values.

When these functions are rendered using a Starbeam renderer, any
changes to cells used by the function will result in rerendering.

You might be worried about the fact that the function is executed
every time it's used, even if that happens multiple times in your
app for the same render.

```md em Key Point
In most cases, the cost of maintaining a cache of a computation
is more expensive than the computation itself.
```

However, it is definitely possible to have a computation that is
very expensive to compute, and is worth caching.

You can learn more about this in the [Optimizing Expensive
Computations] guide.

[Optimizing Expensive Computations]: ../optimization/formulas.md
