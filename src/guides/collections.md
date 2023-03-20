# Reactive Collections

```md em
Starbeam's reactive collections have the identical API as the
built-in JavaScript APIs they are based on.
```

Starbeam ships with a number of built-in reactive collections.

- Reactive Object
- Reactive Array
- Reactive Map and WeakMap
- Reactive Set and WeakSet

From a usage perspective, these collections identical to their
JavaScript counterparts. Instances of reactive collections have
exactly the same methods as their JavaScript counterparts, and
those methods behave identically.

**The only distinction** is that when you mutate a reactive
collection, any formula or resource that used the collection as
an input will invalidate.

```md tip
This is even true in TypeScript: when you use a reactive
collection in TypeScript, its type is literally the same as the
JavaScript type.
```

!(ts:./universal/-snippets/collections.ts#collection)
