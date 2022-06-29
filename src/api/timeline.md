---
order: 1
headerDepth: 5
title: "@starbeam/timeline"
---

# @starbeam/timeline

Exports:

- [export const LIFETIME]
- [export const TIMELINE]

## `export const LIFETIME`

[export const lifetime]: #export-const-lifetime

`LIFETIME` provides a mechanism for _structured cleanup_ of objects.

::: info

_Structured cleanup_ means linking the cleanup of an object to the lifetime of its _owner_, and the
ability to register cleanup handlers for objects.

:::

### Events

::: api

#### on.cleanup

Register a cleanup handler for an object. This function is called when the object is [finalized].

```ts:signature
/**
 * @param {"() => void"} handler The function that should run when this object is cleaned up.
 * @returns {"Unsubscribe"} A function that can be used to unregister the cleanup handler.
 */
function cleanup(handler) {}
```

:::

### Methods

::: api

#### link

Link an object to its owner. When an object's owner is [finalized], it will be [finalized].

```ts:signature
/**
 * @param {"object"} parent The object to link the child to.
 * @param {"object"} child The object to be linked.
 * @returns {"Unsubscribe"} A function that can be used to unlink the child from the parent, which will prevent it from being cleaned up when the parent is cleaned up.
 */
function link(parent, child) {}
```

:::

::: api

#### finalize

[finalize]: #finalize
[finalized]: #finalized

Finalize an object. The object's cleanup handlers will be called, and all linked objects will be
finalized.

```ts:signature
/**
 * @param {"object"} object The object that should be cleaned up.
 */
function finalize(object) {}
```

:::

## `export const TIMELINE`

[export const timeline]: #export-const-timeline

### Description

[after render]: #description

```lifecycle:RL
classDef idle fill:#999;

Idle
subgraph Repeat [ ]
  direction LR
  subgraph Body ["When a reactive value changes..."]
    Actions --> Render --> AfterRender
    Actions:::state
    Render:::state
    AfterRender:::state
  end

  Body:::subgraphBody

  Description["The render phase may repeat if<br>AfterRender mutates a reactive<br> dependency of any renderer"]
end

Description:::DescBox
Idle:::idle
Idle --> Repeat
Repeat --> Idle
Idle(((Idle)))
Actions[[Actions Phase]]
Render[[Render Phase]]
AfterRender[[After Render]]
```

### Properties

::: api

```ts:signature
/**
 * @property {"Timestamp"} now The current timestamp.
 * @for TIMELINE
 */
let now;
```

:::

### Events

::: api

#### `on.rendered`

Registers a function to be executed during each [after render] phase.

```ts:signature
/**
 * @param {"() => void"} handler The function that should run during each <a href="#description">after render</a> phase.
 * @returns {"Unsubscribe"} A function that can be used to unregister the after-render handler.
 */
function rendered(handler) {}
```

:::

### Methods

::: api

#### `render`

```ts:signature
/**
 * @param {"Reactive<T>"} reactive The reactive value that should be rendered.
 * @param {"() => void"} render The function that should be called to render the reactive value.
 * @param {"string"} [description] A description of the reactive value, for debugging.
 * @returns {"RenderedValue<T>"} An <a href="#rendered-value">RenderedValue</a> that can be used to clean up the rendered value, and to attach a debugger to it.
 */
function render(input, render, description) {}
```

:::

::: api

#### `nextIdle`

A promise that resolves after the next render completes.

```ts
function nextIdle(): Promise<void>;
```

<dl class="signature">
  <dt>returns</dt>
  <dd>
    <code>Promise&lt;void&gt;</code>
    <span>A promise that resolves after the next render completes.</span>
  </dd>
</dl>

:::

::: api

#### `enqueueAction`

Enqueue a function to be executed _asynchronously_ in the _action_ phase. The action phase is the
first phase of rendering. Code that runs in the action phase is allowed free access to reactive
values (both reads and writes).

```ts
function enqueueAction(...notifications): void;
```

<dl class="signature">
  <dt>notifications</dt>
  <dd>
    <code>Array&lt;() =&gt; void&gt;</code>
    <span>The notifications to enqueue.</span>
  </dd>
</dl>

:::

::: api

#### `enqueueRender`

Enqueue a function to be executed _asynchronously_ in the _render_ phase. The render phase is the
second phase of rendering. Code that runs in the action phase is allowed to **read** reactive
values, but may not **write** to them.

```ts
function enqueueRender(...notifications): void;
```

<dl class="signature">
  <dt>notifications</dt>
  <dd>
    <code>Array&lt;() =&gt; void&gt;</code>
    <span>The notifications to enqueue.</span>
  </dd>
</dl>

:::

:::: api

#### `enqueueAfterRender`

Enqueue a function to be executed _asynchronously_ after the _render_ phase. This code runs after
all render functions have finished.

```ts
function enqueueAfterRender(...notifications): void;
```

<dl class="signature">
  <dt>notifications</dt>
  <dd>
    <code>Array&lt;() =&gt; void&gt;</code>
    <span>The notifications to enqueue.</span>
  </dd>
</dl>

::: tip Multi-Phase Rendering

You can use `afterRender` to implement a multi-phase rendering algorithm, but you
should be careful to make sure to avoid creating infinite loops.

This API is a power tool, and you should make sure there's not a one-pass way to accomplish your
goal before resorting to it.

:::

::::

## Interfaces

::: api

#### `Unsubscribe`

[unsubscribe]: #unsubscribe

A function returned from subscription functions that can be used to unsubscribe the original
subscription.

:::
