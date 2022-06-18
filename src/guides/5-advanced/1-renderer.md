---
order: 1
---

# Rendering

You can render a reactive value using the `TIMELINE.render` function.

::: tip What is a reactive value?

- Cell
- Formula
- Formula List
- Resource
- Resource List

Under the hood, a reactive value implements `ReactiveProtocol`, which means that it can _produce a correct
list of dependencies_ on demand.
:::

;;; ./$snippets/rendering.ts#render-cell

Here's an example of rendering a cell into the DOM using vanilla JavaScript:

::: normal-demo

```html
<p id="output"></p>
<button>Increment</button>
```

```js
async function main() {
  const { Cell, Resource, TIMELINE, LIFETIME } =
    await import(
      "https://assets.codepen.io/1630871/starbeam-core.js"
    );

  const counter = Cell(0);

  const output = document.querySelector("#output");
  const button = document.querySelector("button");

  button.addEventListener("click", () => {
    counter.set(counter.current + 1);
  });

  TIMELINE.render(counter, () => {
    output.innerText = counter.current;
  });
}

main();
```

::::

::: tip
In real code, you would probably use a JavaScript framework with one of Starbeam's framework
libraries to render the value.

This example demonstrates the low-level primitive (`TIMELINE.render`)
that framework adapters are implemented with.
:::

## A More Elaborate Example
