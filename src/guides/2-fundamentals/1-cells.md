---
order: 1
---

# Cells

The `Cell` is the most basic kind of reactive value. It's a place to store a single value that is updated atomically.

::: tip Atomic Updates
When we say that a `Cell` is updated _atomically_, we mean that updates to the value happen in a single operation, even if the value is a list or object.

This differs from the [reactive collections](../3-collections/README.md), which allow you to update a part of the collection at once.
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

::: info
The value of `cell.current` is **always** the value that was last set, immediately after it was set. There is no time delay between when the value is set and when your code sees the update under any circumstances.
:::

## Description

Whenever you create a reactive value in Starbeam, you can specify a `description` property. This is a string that is used to describe the value in the developer tools.

;;; ./$snippets/cell-description.ts#describe-string

If you specify an `equals` parameter (see [Equality](#equality) below), you specify the description of the cell as an additional option.

;;; ./$snippets/cell-description.ts#describe-with-equals

## Equality

You can control how the value of a cell is compared to determine if it needs to be updated by specifying an equality function.

;;; ./$snippets/equality.ts#equality

If we update the cell with an equivalent value (according to the `equals` function), the original object will remain in the cell.

;;; ./$snippets/equality.ts#update-with-equivalent

If we update the cell with a non-equivalent value, the value will update.

;;; ./$snippets/equality.ts#update-with-non-equivalent

::: warning
This example using `Object.is` to demonstrate that the original value is still in the cell.

In actual code, if you find yourself caring about the **identity** of the value in the cell, you probably don't want to use an `equals` function that causes objects with new identities to be ignored.
:::
