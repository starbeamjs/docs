# Blueprints and Instances

<script setup lang="ts">
  import ReactPreact from '../src/-components/ReactPreact.vue';
</script>

Since Starbeam is a way to write universal reactive code, it
needs a universal way to define constructors for reactive
objects. This is where blueprints come in.

:::tip Isn't this just a class?

You might be thinking: "Isn't this just a class?".

Well, yes and no.

JavaScript frameworks have many different ways to define a
constructor function that can be used to create instances. Some
frameworks use classes, some use functions, while others (such as
React hooks) use more elaborate patterns.

As you'll see, Starbeam's blueprint pattern is a way of writing
universal constructors that can be used in any framework.

:::

## Defining a Blueprint

The most fundamental _blueprint_ is a normal JavaScript function.

```snippet {#blueprint}
<!-- @include: ./-snippets/blueprints.tsx -->
```

Yes, this is just a function that returns a value. What makes
Starbeam blueprints interesting is how they're used with
renderers.

Let's take a look at how we can use this blueprint with a React
renderer.

```snippet {#component}
<!-- @include: ./-snippets/blueprints.tsx -->
```

The `use` function takes a blueprint and returns an instance of
the blueprint. The blueprint is constructed when the component is
mounted. After that, the same instance is returned every time the
component is rendered.

:::tip 💡 React Strict Mode 💡

Critically, when you use a blueprint in React, it is created once
when the component is mounted, and then the same instance is
returned every time the component is rendered.

When React unmounts and then [remounts] a component, the
blueprint is constructed again. This means that Starbeam hooks
are compatible with React strict mode, by default.

If you don't use React, this is an object lesson. Every framework
has its own notion of "component instance", and when you use a
Starbeam blueprint with a renderer, you get a new instance of the
blueprint for each framework-defined instance of the component.

:::

[remounts]: https://github.com/reactwg/react-18/discussions/19

## Blueprints With Parameters

Blueprints can take parameters, just like normal functions.

```snippet {#blueprint}
<!-- @include: ./-snippets/blueprints-with-parameters.tsx -->
```

Let's take a look at how we can use this blueprint in a React
component.

```snippet {#component}
<!-- @include: ./-snippets/blueprints-with-parameters.tsx -->
```

This is one way to pass reactive parameters to a blueprint. But
there's a downside: every time the `start` parameter changes, the
blueprint is created again.

In this case, that means that every time the `CounterComponent`'s
`start` prop changes, the counter will reset.

This **might** be what you want, but what if you want to allow
the `Counter`'s `start` parameter to change without resetting the
counter?

That's a job for reactive parameters.

## Taking Reactive Parameters

Ideally, your blueprint will accept **either** reactive values
**or** normal values as its parameters.

To accomplish this, your function will use the `Reactive.read`
function to read from its parameters.

```snippet {#blueprint}
<!-- @include: ./-snippets/flexible-blueprints.tsx -->
```

:::typescript

The `IntoReactive` type makes it easy to take **either** a `T`
**or** a `Reactive<T>`.

:::

Our universal blueprint can take either a number or a reactive
number, which makes it very flexible. Let's use `Counter` in a
React component to see what this flexibility buys us.

### Using `Counter` in React

:::emphasis Option 1

Passing a regular value and making it a hook dependency.

:::

In this option, we pass `start` as a regular value to `Counter`
and specify it as a dependency to the `use` hook.

```snippet {#component}
<!-- @include: ./-snippets/flexible-blueprints.tsx -->
```

This will run the `Counter` blueprint whenever the `start`
changes, which **also** means that its internal counter will
reset whenever `start` changes.

This is what would probably happen if you implemented `Counter`
using the native React hook APIs.

:::emphasis Option 2

Passing a reactive value directly

:::

If we call `Counter` with a reactive `start`, the counter will
update the `start` value without resetting its internal counter.

```snippet {#reactive-component}
<!-- @include: ./-snippets/flexible-blueprints.tsx -->
```

### Universality

Importantly, we were able to change the way we use `Counter` in
React without changing the universal implementation of `Counter`.

### Adapting Universal Blueprints

In practice, you may want to give your React consumers a
`useCounter` hook that takes `start` as a dependency and
**doesn't** reset the counter when the `start` value changes.

The good news is: you did most of the work when you implemented
the universal blueprint in the first place.

With just a bit of glue code, you can adapt the universal
`Counter` hook into a hook that has the idiomatic React behavior
of your choice.

```tsx
function useCounter(start: number) {
  const reactiveStart = useReactive(start);
  return use(() => Counter(reactiveStart));
}
```

:::tip What the Code is Doing

We use the `useReactive` hook to convert the `start` parameter
into a reactive value that updates whenever the React value
changes.

Now have a reactive number to pass to `Counter`, and the `use`
hook ensures that the `Counter` blueprint is only constructed
once, when the component is mounted.

:::

## Native Parameters vs. Reactive Parameters

### Native Parameters

<!-- prettier-ignore-start -->

:::code-group

```tsx [react]
function Component({ start }: Props) {
  const counter = use(() => Counter(start), [start]);

  return useFormula(() => <div>{counter.count}</div>); // [!code react]
}

interface Props { // [!code types:3]
  start: number;
}
```

```tsx [preact]
function Component({ start }: Props) {
  const counter = use(() => Counter(start), [start]);

  return <div>{counter.count}</div>; // [!code preact]
}

interface Props { // [!code types:3]
  start: number;
}
```

```vue [vue]
<script setup lang="ts"> // [!code script:9]
const props = defineProps<{ start: number }>();

const counter = computed(() => Counter(props.start));

interface Props { // [!code types:3]
  start: number;
}
</script>

<template> // [!code template-tag:3]
  <div>{counter.count}</div>
</template>
```

```svelte [svelte]
<script> // [!code script:5]
export let start;

$: counter = Counter(start);
</script>

<div>{counter.count}</div> // [!code template]
```

```glimmer [ember]
export default class extends Component<Args> {
  counter = use(() => Counter(this.args.start));

  <template> // [!code template-tag:3]
    <div>{{this.counter.count}}</div>
  </template>
}

interface Args {
  start: number;
}
```

:::

<!-- prettier-ignore-end -->

<ReactPreact />

### Reactive Parameters

<!-- prettier-ignore-start -->

:::code-group

```tsx [react]
function Component(props: Props) {
  const start = useReactive(props.start);
  const counter = use(() => Counter(start));

  return useFormula(() => <div>{counter.count}</div>); // [!code react]
}

interface Props { // [!code types:3]
  start: number;
}
```

```tsx [preact]
function Component(props: Props) {
  const start = useReactive(props.start);
  const counter = use(() => Counter(start));

  return <div>{counter.count}</div>; // [!code preact]
}

interface Props { // [!code types:3]
  start: number;
}
```

```vue [vue]
<script setup lang="ts"> // [!code script:9]
const props = defineProps<{ start: number }>();

const counter = Counter(useFormula(() => props.start))

interface Props { // [!code types:3]
  start: number;
}
</script>

<template> // [!code template-tag:3]
  <div>{counter.count}</div>
</template>
```

```svelte [svelte]
<script> // [!code script:5]
import { toStore } from "@starbeam/svelte";

export let start;

// convert the prop into a store
const store = writable(start);
$: $store.set(start);

const counter = Counter(start);
</script>

<div>{counter.count}</div> // [!code template]
```

```glimmer [ember]
export default class extends Component<Args> {
  counter = use(() => Counter(this.args.start));

  <template> // [!code template-tag:3]
    <div>{{this.counter.count}}</div>
  </template>
}

interface Args {
  start: number;
}
```

:::

<!-- prettier-ignore-end -->

<ReactPreact />

## Classes as Blueprints

At the beginning of this article, we noted that JavaScript
classes look exactly like what we need to define a universal
constructor that can be used in any framework.

Well, if you like classes, you can just use them as blueprints.

```snippet {#blueprint}
<!-- @include: ./-snippets/classes-blueprints.tsx -->
```

And if you need parameters, you can use constructor parameters as
you'd expect.

```snippet {#with-params}
<!-- @include: ./-snippets/classes-blueprints.tsx -->
```

This example uses the `Reactive.from` function to convert the
`start` parameter into a reactive value rather than using
`Reactive.read` in `count` and `increment()`.

Both approaches have equivalent behavior.

:::💡

If you pass a regular value to `Reactive.from`, it returns a
special kind of reactive value called `Static`. A `Static` value
has the same API as any other reactive value, but will never
become a dependency of any other reactive value.

:::

### How Functions And Classes Compare

The `Counter` class is almost identical to the `Counter`
function, with the expected differences:

- The `Counter` function takes parameters directly, while the
  `Counter` class takes parameters in its constructor.
- The `Counter` function stores its state in a closure, while the
  `Counter` class stores its state in class fields.
- The `Counter` function returns an object with methods and
  getters that close over the state, while the `Counter` class
  declares its methods and getters and accesses the state from
  its fields.

### Using the `Counter` Class in React

You use the `Counter` class in React as you'd expect: by calling
`new Counter()` in a `use()` call.

As with the function-based blueprint, you could pass a regular
value to the `Counter` constructor, and then specify it as a
dependency to the `use` hook.

```snippet {#component}
<!-- @include: ./-snippets/classes-blueprints.tsx -->
```

As before, if `start` changes, the `Counter` instance will be
created anew, and the counter will reset.

But as before, you could pass a reactive value directly to the
`use` hook, which would allow the counter to update without
resetting.

```snippet {#reactive-component}
<!-- @include: ./-snippets/classes-blueprints.tsx -->
```
