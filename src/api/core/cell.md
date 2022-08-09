---
layout: doc
Cell:
  kind: constructor-fn
  generics: ["T"]
  returns: ["Cell", "A cell with the given initial value"]
  params:
    value: ["T", "The initial value of the cell"]
    description: ["string?", "A description of the cell"]
  docs:
    The `Cell` API is the fundamental storage building block of Starbeam.
  properties:
    current: ["T", "The current value of the cell"]
  methods:
    update:
      params:
        updater: ["(prev: T) => T", "A function that takes the previous value of the cell and returns the new value"]
      returns: ["boolean", "true if the value changed, false otherwise"]
    set:
      params:
        value: ["T", "The new value of the cell"]
      returns: ["boolean", "true if the value changed, false otherwise"]
    freeze:
      tag: "optimization"
      docs:
        The `freeze` method prevents the cell from updating. This allows for Starbeam's internals to avoid checking if the cell has changed when it's used in a formula.
---

<Api />
