---
dir:
  text: "Reactive Collections"
  collapsable: false
  link: true
  order: 3
index: false
title: JS Builtins
---

::: emphasis
Starbeam's reactive collections have the identical API as the built-in JavaScript APIs they are
based on.
:::

Starbeam ships with a number of built-in reactive collections.

- [Reactive Object](./1-objects.md)
- [Reactive Array](./2-arrays.md)
- [Reactive Map and WeakMap](./3-maps.md)
- [Reactive Set and WeakSet](./4-sets.md)

From a usage perspective, these collections identical to their JavaScript counterparts. Instances of
reactive collections have exactly the same methods as their JavaScript counterparts, and those
methods behave identically.

**The only distinction** is that when you mutate a reactive collection, any formula or resource
that used the collection as an input will invalidate.

::: tip
This is even true in TypeScript: when you use a reactive collection in TypeScript, its type is
literally the same as the JavaScript type.

```ts
import reactive from "@starbeam/js";

const map = reactive.Map<string, number>();
// typeof map is Map<string, number>
```

:::
