<template>
  <h2>Cell</h2>
  <h3>Constructor</h3>

  <Function
    name="Cell"
    kind="function"
    prefix="function"
    :generics="['T']"
    :returns="['Cell', 'A cell with the given initial value']"
    :params="{
      value: ['T', 'The initial value of the cell'],
      description: ['string?', 'An optional description for the cell'],
    }"
  >
    The `Cell` API is the fundamental storage building block of Starbeam.
  </Function>

  <h3>Methods</h3>

  <Function
    name="update"
    kind="method"
    :params="{
      value: ['T', 'The initial value of the cell'],
      description: ['string?', 'An optional description for the cell'],
    }"
    :returns="['Cell', 'A cell with the given initial value']"
  >
    The `Cell` API is the fundamental storage building block of Starbeam.
  </Function>
</template>
