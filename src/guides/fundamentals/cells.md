# Cells

The `Cell` is the most basic kind of reactive value. It's a place
to store a single value that is updated atomically. Updates to
cells take effect immediately.

```md details type="deep-dive" title="Atomic, Immediate Updates"
<dl>
  <dt>Immediate Updates</dt>
  <dd>

The value of `cell.current` is **always** the value that was last
set, immediately after it was set. There is no time delay between
when the value is set and when your code sees the update under
any circumstances.

</dd>

<dt>Atomic Updates</dt>
<dd>

When we say that a `Cell` is updated _atomically_, we mean that
updates to the value happen in a single operation, even if the
value is a list or object.

This differs from the [reactive collections](../collections.md),
which allow you to update a part of the collection at once.

</dd>
</dl>
```

## Creating a Cell

You create a cell with the `Cell` function, passing in the cell's
initial value.

!(./-snippets/cells.ts#creating)

Once you've created a cell, you can immediately access its value
using the cell's `current` property.

```md details type="protip" title="You Probably Don't Want Cell(null)"
In Starbeam, you rarely initialize a cell to `null`. Since the
value of a cell is always updated immediately, you don't need to
use `null` to represent the time before the value is set.

If you use TypeScript, that means that you typically won't need
to worry about `null` checks in situations where `null` is
logically impossible.
```

## Updating a Cell

You update a cell by modifying its `current` property.

!(./-snippets/cells.ts#updating-with-set)

Once you've updated a cell, you can immediately access its value
using the cell's `current` property.

### Updating Based on the Previous Value {.protip title="Protip"}

As a convenience, you can use the `update` function to update a
cell based on the previous value.

!(./-snippets/cells.ts#updating-with-update)

You don't ever _need_ to use it, because this will work just as
well:

!(./-snippets/cells.ts#updating-by-reading)

You can even use the `++` shorthand to update `cell.current`:

!(./-snippets/cells.ts#updating-by-shorthand)

```md info Updates Take Effect Immediately
No matter which of these methods you use to update a cell, the
value of the cell will always update immediately.
```

## Adding a Debug Description {.protip}

Whenever you create a reactive value in Starbeam, you can specify
a `description` property. This is a string that is used to
describe the value in the developer tools.

!(./-snippets/cell-description.ts#describe-string)

If you specify an `equals` parameter (see [Equality](#equality)
below), you specify the description of the cell as an additional
option.

!(./-snippets/cell-description.ts#describe-with-equals)
