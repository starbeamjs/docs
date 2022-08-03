# Cells

The `Cell` is the most basic kind of reactive value. It's a place to store a single value that is updated atomically.

::: tip Atomic Updates
When we say that a `Cell` is updated _atomically_, we mean that updates to the value happen in a single operation, even if the value is a list or object.

This differs from the [reactive collections](../collections.md), which allow you to update a part of the collection at once.
:::

## Creating a Cell

;;; ./$snippets/cells.ts#creating

## Updating a Cell

;;; ./$snippets/cells.ts#updating-with-set

## Updating Based on the Previous Value

As a convenience, you can use the `update` function to update a cell based on the previous value.

;;; ./$snippets/cells.ts#updating-with-update

You don't ever **need** to use it, because this will work just as well:

;;; ./$snippets/cells.ts#updating-by-reading

You can even use the `++` shorthand to update `cell.current`:

;;; ./$snippets/cells.ts#updating-by-shorthand

::: info
The value of `cell.current` is **always** the value that was last set, immediately after it was set. There is no time delay between when the value is set and when your code sees the update under any circumstances.
:::

## Description

Whenever you create a reactive value in Starbeam, you can specify a `description` property. This is a string that is used to describe the value in the developer tools.

;;; ./$snippets/cell-description.ts#describe-string

If you specify an `equals` parameter (see [Equality](#equality) below), you specify the description of the cell as an additional option.

;;; ./$snippets/cell-description.ts#describe-with-equals
