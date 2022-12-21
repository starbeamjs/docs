# Cells

The `Cell` is the most basic kind of reactive value. It's a place to store a single value that is updated atomically.

::: tip Atomic Updates
When we say that a `Cell` is updated _atomically_, we mean that updates to the value happen in a single operation, even if the value is a list or object.

This differs from the [reactive collections](../collections.md), which allow you to update a part of the collection at once.
:::

## Creating a Cell

```snippet {#creating}
<!--@include: ./$snippets/cells.ts-->
```

## Updating a Cell

```snippet {#updating-with-set}
<!--@include: ./$snippets/cells.ts-->
```

## Updating Based on the Previous Value

As a convenience, you can use the `update` function to update a cell based on the previous value.

```snippet {#updating-with-update}
<!--@include: ./$snippets/cells.ts-->
```

You don't ever **need** to use it, because this will work just as well:

```snippet {#updating-by-reading}
<!--@include: ./$snippets/cells.ts-->
```

You can even use the `++` shorthand to update `cell.current`:

```snippet {#updating-by-shorthand}
<!--@include: ./$snippets/cells.ts-->
```

::: info
The value of `cell.current` is **always** the value that was last set, immediately after it was set. There is no time delay between when the value is set and when your code sees the update under any circumstances.
:::

## Description

Whenever you create a reactive value in Starbeam, you can specify a `description` property. This is a string that is used to describe the value in the developer tools.

```snippet {#describe-string}
<!--@include: ./$snippets/cell-description.ts-->
```

If you specify an `equals` parameter (see [Equality](#equality) below), you specify the description of the cell as an additional option.

```snippet {#describe-with-equals}
<!--@include: ./$snippets/cell-description.ts-->
```
