### Properties

```toml {def=member}
name = "current"
type = { type = "T", docs = "The current value of the cell" }
for = "Cell"
```

### Methods

```toml {def=method}
name = "set"
placement = {for="Cell", at="instance"}

returns = {type = "boolean", docs = "`true` if the value changed, `false` otherwise"}

[params]
value = {type= "T", docs = "The new value of the cell"}
```

```toml {def=method}
docs = """
Update the value of the cell based on the previous value.
"""

name = "update"
placement = {for="Cell", at="instance"}

[params]
updater = {type= "(prev: T) => T", docs = "A function that computes the new value of the cell from its previous value."}
```

:::tip 💡PROTIP💡

The `update` method updates the cell's value **without** "consuming" the previous value. This
is useful in advanced patterns where you are trying to carefully control the consumption of values.
It is generally not important in high-level usage.

:::

## Hello

## `FormulaFn`

The `FormulaFn` API allows you to cache the result of computing a value based on other reactive
values.

If you call the formula function a second time, it will return the same value as long as the
cells used in the last computation are still valid.

If any of the dependencies change and you call the formula function again, it will compute a new
value. This effectively means that the behavior of the formula function is equivalent to the
behavior of the function it wraps, **except for object identity**.

This also means that subscribers to a formula will be notified whenever any of its dependencies change.

::: api

```ts:signature
/**
 * @param {"() => T"} callback The function that reads from reactive values and computes a value.
 * @param {"string"} description A description of the formula.
 * @returns {"FormulaFn<T>"} A reactive version of the formula function.
 */
function FormulaFn(callback, description) {}
```
