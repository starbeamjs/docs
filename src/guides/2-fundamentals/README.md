---
dir:
  order: 2
  text: "Fundamentals"
  collapsable: false
  link: true
index: false
title: Starbeam Fundamentals
---

# Fundamentals

This section covers the fundamental building blocks of Starbeam reactivity.

::: tip Starbeam's Core Principle
If you model your reactive data like any other data, you can build reliable reactive UIs with the skills you already have.
:::

## Fundamental Kinds of Data

- [Cells](./1-cells.md), a place to store a single value that is updated atomically.
- [Resources](./4-resources.md), a reactive computation that is linked to an owner and automatically cleaned up.
- [Resource Lists](./5-resource-lists.md), a way to convert a reactive list into a list of resources
  that are automatically constructed and cleaned up as items are added and removed from the source
  list.

## Rendering

Once you have a reactive value, you can render it using the framework of your choice.

Starbeam ships with framework adapters for popular frameworks, and they're all built on the [Rendering](../5-advanced/1-renderer.md) API.
