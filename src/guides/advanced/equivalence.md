# Equivalence

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
