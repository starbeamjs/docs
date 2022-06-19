---
order: 1
---

# Reactive Objects

Reactive objects behave just like regular objects, so this page describes how invalidation works.

Cells in a reactive object:

- `object->keys`: an iteration over the keys of the object
- `object->entries[property]` (for each _accessed_ property)

An entry has:

- `entry->presence`: whether the property is present in the object
- `entry->value`: the last update of the property's value

## Accesses

### Checking for Property Membership (`has`)

The `has` operation occurs when property membership is **checked**:

1. Using `Reflect.has`
2. Using `in`

| Reflect Operation                |
| -------------------------------- |
| [`[[HasProperty]]`][hasproperty] |

::: algorithm

`presence` is `true` if the property is present in the object, and `false` otherwise.

1. If `object->entries[property] as entry` exists:
   1. consume `entry->presence`
2. Otherwise,
   1. `object->entries[property] = Entry(presence: presence) as entry`
   2. consume `entry->presence`

:::

[hasproperty]: https://262.ecma-international.org/#sec-ordinary-object-internal-methods-and-internal-slots-hasproperty-p

### Accessing a Property (`get`)

The `get` operation occurs when a property is **accessed**:

1. Using `Reflect.get`
2. Using `.` or `[]` notation

| Spec Operation   |
| ---------------- |
| [`[[Get]]`][get] |

::: algorithm

`presence` is `true` if the property is present in the object, and `false` otherwise.

1. If `object->entries[property] as entry` exists:
   1. consume `entry->presence`
   1. consume `entry->value`
2. Otherwise,
   1. `object->entries[property] = Entry(value: undefined) as entry`
   2. consume `entry->presence`
   3. consume `entry->value`

:::

[get]: https://262.ecma-international.org/#sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver

### Accessing the Keys (`ownKeys`)

The `ownKeys` operation occurs when the keys of a property are **accessed**:

1. `Reflect.ownKeys`
2. `Object.keys`
3. `Object.getOwnPropertyNames`
4. `Object.getOwnPropertySymbols`
5. `Object.getOwnPropertyDescriptors`

| Spec Operation                           |
| ---------------------------------------- |
| [`[[OwnPropertyKeys]]`][ownpropertykeys] |

[ownpropertykeys]: https://262.ecma-international.org/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys

::: algorithm

1. consume `object->keys`

:::

## Mutations

### Defining a property

A property is **defined** when it is added to an object **when it is not already an own property of
the object**, by:

1. `Object.defineProperty` / `Reflect.defineProperty`
2. `Object.defineProperties`
3. `Reflect.set`
4. dot or bracket notation

| Spec Operation                               | Conditions                          |
| -------------------------------------------- | ----------------------------------- |
| [`[[DefineOwnProperty]]`][defineownproperty] | The property does not already exist |

::: algorithm

1. If `object->entries[property]` exists:
   1. `entry.presence = true`
2. Otherwise,
   1. Create a new entry for the property (`presence = true`)
3. update `object.keys`

:::

### Updating a Property

A property is **updated** when it already existed on the object, and its value is changed, by:

1. `Object.defineProperty` / `Reflect.defineProperty`
2. `Object.defineProperties`
3. `Reflect.set`
4. dot or bracket notation

| Spec Operation                               | Conditions                  |
| -------------------------------------------- | --------------------------- |
| [`[[DefineOwnProperty]]`][defineownproperty] | The property already exists |

::: algorithm

1. If an `entry` for the property already exists:
   1. update `entry.value`
2. update `object.keys`

:::

[defineownproperty]: https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-defineownproperty-p-desc

### Deleting a property

A property is **deleted** when it is removed from an object, by:

1. `Reflect.deleteProperty`
2. The `delete` operator

| Spec Operation         | Conditions          |
| ---------------------- | ------------------- |
| [`[[Delete]]`][delete] | The property exists |

::: algorithm

1. If an `entry` for the property already exists:
   1. `entry->presence = false`
2. update `object.keys`

:::

[delete]: https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-delete-p

### Sealing an Object

An object is **sealed** when:

- `Object.seal` is called on the object
- `Object.freeze` is called on the object
- `{Object,Reflect}.preventExtensions` is called on the object and all remaining properties are
  non-configurable

Sealing an object updates the object's `keys` iteration:

::: algorithm

1. freeze `object->keys`

:::

::: note
The `keys` iteration represents the list of enumerable, own keys of the object. This is what the `{ ...spread }` operator uses to spread the object's properties, it's what `Object.keys` uses to
produce the list of keys, and its what `Reflect.ownKeys` uses.

If an object is **sealed**, the list of keys cannot be changed, and (critically), the enumerability
of the remaining keys cannot be changed.

However, when `preventExtensions` is called, the keys remain configurable, which means that they can
be adjusted to be non-enumerable.
:::

### Updating an Object's Prototype

This operation is currently not supported on reactive objects.
