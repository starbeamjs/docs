# Formula Functions

While you can always use normal functions to compute values based on cells, you can also turn functions into formulas:

1. Formulas recompute only when any reactive state used in the formula changes.
2. You can render a formula into the DOM. Check out the [Rendering](../5-advanced/1-renderer.md) section for more information.

::: tip
In practice, it's very uncommon for the overhead of formula functions to outweigh the cost of JavaScript functions, even if they iterate a medium-sized list and do some work for each entry.
:::

To create a formula, pass a function to `Formula`.

;;; ./$snippets/formulas.ts#create-formula

And you use the formula the same way as a function.

;;; ./$snippets/formulas.ts#use-the-same-way

## With Props

You can also pass props into formula functions. The props are passed into the formula function as the first argument, and the formula function will invalidate:

1. When any reactive state used in the formula changes.
2. When the props aren't the same as the props the last time you called the function.

::: tip
_You can customize this behavior by specifying an `equals` option._ See [Equality](#equality) below.
:::

;;; ./$snippets/formulas-with-props.ts#create-formula

If you call the same formula function with the same props, it will return the same value.

;;; ./$snippets/formulas-with-props.ts#use-the-same-way

### Equality

If you want to control how the props are compared to determine if the formula needs to be invalidated, you can specify an `equals` option.

;;; ./$snippets/formulas-with-props.ts#with-equals

::: warning
As with the [equality example in Cells](../2-fundamentals/1-cells.md#equality), this example using `Object.is` to demonstrate when the formula is invalidated.

In actual code, it is unlikely that you should care about the identity of a formula's return value. If you **do** care about a formula's identity, there's a good chance that you want a [Resource](../2-fundamentals/4-resources.md), which are like formulas, but with explicit control over the identity of the value and its cleanup.
:::
