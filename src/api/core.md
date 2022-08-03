# @starbeam/core

[[TOC]]

## `Cell`

The `Cell` API is the fundamental storage building block of Starbeam.

::: api

```ts:signature
/**
 * @param {"T"} value The initial value of the cell.
 * @param {"string"} [description] (optional) A description of the cell.
 * @returns {"Cell<T>"} A cell with the given initial value.
 */
function Cell(value, description) {}
```

:::

### Properties

#### `current` (read-write)

:::api

```ts:signature
/**
 * @property {"T"} current the current value of the cell.
 * @for cell
 */
let current;
```

:::

### Methods

#### `set`

:::api

```ts:signature
/**
 * @param {"T"} value The new value of the cell.
 * @returns {"boolean"} `true` if the value changed, `false` otherwise.
 */
function set(value) {}
```

:::

#### `update`

Update the value of the cell based on the previous value.

:::tip 💡PROTIP💡

The `update` method updates the cell's value **without** "consuming" the previous value. This
is useful in advanced patterns where you are trying to carefully control the consumption of values.
It is generally not important in high-level usage.

:::

:::api

```ts:signature
/**
 * @param {"(prev: T) => T"} updater A function that computes the new value of the cell from its previous value.
 * @returns {"boolean"} `true` if the value changed, `false` otherwise..
 */
function update(updater) {}
```

:::

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
