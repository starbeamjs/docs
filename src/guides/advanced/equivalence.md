# Equivalence

You can control how the value of a cell is compared to determine if it needs to be updated by specifying an equality function.

```snippet {#equality}
<!--@include: ./$snippets/equality.ts-->
```

If we update the cell with an equivalent value (according to the `equals` function), the original object will remain in the cell.

```snippet {#update-with-equivalent}
<!--@include: ./$snippets/equality.ts-->
```

If we update the cell with a non-equivalent value, the value will update.

```snippet {#update-with-non-equivalent}
<!--@include: ./$snippets/equality.ts-->
```

::: warning
This example using `Object.is` to demonstrate that the original value is still in the cell.

In actual code, if you find yourself caring about the **identity** of the value in the cell, you probably don't want to use an `equals` function that causes objects with new identities to be ignored.
:::
