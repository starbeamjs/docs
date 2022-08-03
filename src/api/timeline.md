# @starbeam/timeline

[[TOC]]

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

## `export const ReactiveProtocol`

[export const reactiveprotocol]: #export-const-reactiveprotocol

`ReactiveProtocol` provides introspection tools for values implementing `ReactiveProtocol`.

### Methods

::: api

#### debug

Return a pretty-printed list of the reactive value's dependencies.

```ts:signature
/**
 * @param {"ReactiveProtocol"} reactive An object that implements ReactiveProtocol.
 * @param {"object"} options The object to be linked.
 * @option {"boolean"} options.implementation Whether to include the reactive value's implementation.
 * @option {"boolean"} options.source Whether to include the reactive value's source.
 * @returns {"Unsubscribe"} A function that can be used to unlink the child from the parent, which will prevent it from being cleaned up when the parent is cleaned up.
 */
function link(reactive, options) {}
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

#### now

::: api

```ts:signature
/**
 * @property {"Timestamp"} now The current timestamp.
 * @for TIMELINE
 */
let now;
```

:::

## Interfaces

::: api

#### `Unsubscribe`

[unsubscribe]: #unsubscribe

A function returned from subscription functions that can be used to unsubscribe the original
subscription.

:::
