---
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
    current:
      kind: "rw"
      type: "T"
  methods:
    update:
      kind: method
      params:
        updater: ["(prev: T) => T", "A function that takes the previous value of the cell and returns the new value"]
      returns: ["boolean", "true if the value changed, false otherwise"]
    set:
      kind: method
      params:
        value: ["T", "The new value of the cell"]
      returns: ["boolean", "true if the value changed, false otherwise"]
---

# @starbeam/core

<script setup>
  import Api from './$components/Api.vue';
</script>

<Api />
