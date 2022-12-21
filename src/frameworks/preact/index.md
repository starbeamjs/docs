# Getting Started with Preact

<script setup lang="ts">
  import * as resources from "./demos/resources/config.js";
</script>

<Demo :config="resources" />

Start by installing the Preact renderer into your app.

```npm
@starbeam/preact @starbeam/universal @starbeam/js
```

## Using Starbeam

```snippet {#app}
<!--@include: ./$snippets/quickstart.tsx-->
```

This is the most basic way to use Starbeam in a Preact app.

## The `use` Hook

The `@starbeam/preact` renderer also includes a `use` hook, which allows you to attach
Starbeam resources into a Preact app. Resources are instantiated when the component is mounted, and
cleaned up when the component is unmounted.

To get an idea for how it works, we'll integrate the Stopwatch resource from the [Guides](/guides/fundamentals/resources) section
into Preact.

As a quick refresher, here's what the resource looks like:

```snippet {#stopwatch}
<!--@include: ./$snippets/resources.tsx-->
```

The resource creates a cell that holds the current date, but waits to set up the interval until the
component that uses the resource is mounted.

Once the component is **mounted**, the resource creates an timer that will update the `time` cell once
per second. It also specifies a cleanup function that will run when the component that uses the
resource is **unmounted**.

Next, we'll use the `use` hook to integrate it into a Preact component.

```snippet {#component}
<!--@include: ./$snippets/resources.tsx-->
```

The `use` hook constructs the resource for us and integrates it into the component's
lifecycle. ==That's the magic of Starbeam resources: they're written without any special knowledge of
the quirks of any particular framework, but they can be deeply integrated into any framework.==
