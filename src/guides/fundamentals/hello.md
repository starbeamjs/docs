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
