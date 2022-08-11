---
ResourceList:
  kind: constructor-fn
  generics:
    T: input values
    U: output values
  returns: ["ResourceListBlueprint"]
  params:
    items: ["Iterable<T>", "An iterable of input values"]
    options:
      - "@options"
      - key: ["(item: T) => any", "A function that returns a unique key for each item"]
        create: ["(item: T) => ResourceBlueprint<U>", "A function that creates a resource for each item"]
    description: ["string?", "A description of the resource"]
  properties:
    current: ["U[]", "A list of the current values of the resources in the list", readonly]
ResourceListBlueprint:
  kind: interface
  methods:
    create:
      params:
        "options":
          - "@options"
          - owner: [object]
      returns: ["ResourceList"]
---

<Api>

# Resource Lists

Resource lists map a list of reactive inputs to a list of resources.

When an item is added to the list, a resource is created for it and set up. When an item is removed
from the list, the resource is cleaned up.

Resource lists use key functions to identify when items are added or removed, which allows efficient
diffing.

A resource list is itself a reactive value. Its value is an array of the current value of each
resource in the list.

</Api>