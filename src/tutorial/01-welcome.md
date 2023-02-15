---
layout: false
title: Welcome to Starbeam
type: tutorial
---

<script setup lang="ts">
import Tutorial from "@tutorial-vue/Tutorial/Tutorial.vue";
</script>

<Tutorial>

Welcome to the Starbeam tutorial!

This tutorial will get you comfortable with Starbeam's universal
reactivity system. It will teach you everything you need to know
to build reactive systems that work with every framework.

## Basic Reactivity

In Starbeam, reactive data is stored in _cells_. A cell is a
JavaScript object that you can store data in and read from.

![#cell](./-snippets/01-welcome/index.ts)

The first thing to understand about reactive data in Starbeam is
that you read from cells and write to cell in the same way that
you interact with a normal JavaScript object.

## How to Use This Tutorial

:::warning Assumptions

This tutorial assumes that you have a working knowledge of
JavaScript and the DOM.

:::

</Tutorial>
