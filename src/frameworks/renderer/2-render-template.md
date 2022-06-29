---
order: 2
---

# Rendering Into a Template

The second kind of renderer is a Render-Into-Template renderer.

This kind of renderer is for components that create some sort of data structure on initial render,
and then use it to efficiently update the output when the inputs change.

For a "Render-Into-Template" renderer, you need to:

1. Identify distinct framework-provided hooks for:
   1. Before initial render
   2. After initial render
   3. Before update
   4. After update
2. Figure out how to notify the framework that you want it to re-render.
3. Figure out how to get a representation of the "component instance", which you will link resource
   lifetimes to.

Importantly, the hooks you identify should surround **all reads** from reactive values, but **none
of the writes** to reactive values, which logically happen during the Starbeam action phase.

The [svelte renderer] is a good example of this kind of renderer.

[svelte renderer]: https://github.com/chiragpat/starbeam-svelte
