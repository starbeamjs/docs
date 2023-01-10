# Custom Reactive Objects

## The Setup and Compute Pattern

Reactive objects in Starbeam are all built using the same
pattern: a constructor function that sets up the reactive object,
and a compute function that you call repeatedly to update the
reactive object.

For example, for the builtin `Cell` reactive object, the
constructor function is `Cell` and the compute function is
`read()` (`.current` is an alias of `.read()`).

```snippet {#cells}
<!-- @include: ./$snippets/setup-and-compute.ts -->
```

:::tip Classes or Functions? Your Choice

:::

### Using a Reactive Object in React

The `useSetup` hook is a convenient way to create and use a
reactive object in React. It takes a reactive constructor
function and returns the same reactive object on every render.

```ts
function Counter() {
  const counter = useSetup(() => Cell(0));

  function increment() {
    counter.update((i) => i + 1);
  }

  return useReactive(() => (
    <>
      <p>{counter.count}</p>
      <button onClick={increment}>Increment</button>
    </>
  ));
}
```

:::💡

The function passed to the `useSetup` hook will only run once,
when the component is mounted. Every time the component is
rendered after that, the same reactive object will be returned.

:::

## Other Builtin Reactive Objects

In addition to `Cell`, Starbeam comes with a number of other
builtin reactive objects:

- From `@starbeam/universal`:
  - `Formula` - A reactive object that computes its value from
    other reactive objects and invalidates when any of the
    reactive objects it depends on change.
- From `@starbeam/js`:
  - `reactive.object`
  - `reactive.array`
  - `reactive.Map`
  - `reactive.Set`
  - `reactive.WeakMap`
  - `reactive.WeakSet`

## Creating Custom Reactive Objects

You can easily create your own universal reactive objects in
Starbeam.

```snippet {#custom}
<!-- @include: ./$snippets/custom.tsx -->
```

::: details In React

You can pass a reactive constructor to the `useSetup` hook, and
it will return the same reactive object on every render.

```snippet {#format-component}
<!-- @include: ./$snippets/custom.tsx -->
```

The `useReactive` hook combines the `useSetup` hook with a
reactive

```snippet {#use-reactive}
<!-- @include: ./$snippets/custom.tsx -->
```

You can convert a class into a reactive object by using the
`Reactive.class` function.

```snippet {#class-based}
<!-- @include: ./$snippets/custom.tsx -->
```

:::
