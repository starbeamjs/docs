---
order: 2
---

# Validate-on-Demand

One of the most important concepts in Starbeam reactivity is "invalidation".

This page goes into more detail about how invalidation **works**, but the basic concept is simple:
when a cell used by a rendered function is updated, the rendered function is invalidated.

::: emphasis
Invalidation occurs when a cell used by a rendered function is updated.
:::

That should be enough for you to understand the rest of the concepts in the fundamentals section.
You can read more if you're curious, or come back later once you feel more comfortable with the concepts.

## Validate-on-Demand

Starbeam's reactivity is based on the concept of =="validate-on-demand"==. This means that when you
change a cell, Starbeam simply notes that the cell changed, and does **not** immediately notify any
other code about the change.

When a reactive computation that **uses** a cell attempts to recompute its value, it will first
check whether any of the cells it used in its last evaluation have changed. If so, it will
re-evaluate the computation, remembering the new cells that it used.

Importantly, this means that it is possible to determine whether a reactive computation is valid
==without recomputing it.==

::: note
This differs from most other reactive systems, which determine whether a
computation is valid by recomputing it and checking whether the result is ["referentially equal"](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect).
:::

Because Starbeam uses a validate-on-demand approach, you can build reactive computations using
normal functions, methods and getters. Those functions are just normal functions, not "computed
properties", "memos", "derived stores" or anything like that.

The [table demo] is a good demonstration of the power of this approach. In that demo, we use a
single reactive `Map` as our root state, and build a sortable, filterable table based on it.

::: details Validate-on-Demand vs. Push-Based Reactivity

Most other reactive systems use a push-based approach, which requires you to help the reactive
system build a "dependency graph" of some kind.

In a push-based reactive system, computations that _use_ a piece of reactive state _register_
themselves with that state. Computations that build on those computations register _themselves_.

==Push-based reactivity prevents you from using simple functions to build reactive computations==,
because you can't push notifications through simple functions.

In contrast, validate-on-demand reactivity doesn't build a dependency **graph** at all. Instead, when
you access a cell during the execution of a rendered function, that cell becomes a dependency of the
rendered function. It doesn't matter how indirectly the cell was accessed.

To determine whether a rendered function is valid, Starbeam simply checks whether any of those
dependencies have changed, which does not require recomputing any part of the computation, or even
knowing anything about how the computation was built.
:::

[table demo]: /demos/table/README.md
[use normal functions]: /guides/2-fundamentals/2-functions.md

## Rendering

You may be wondering: if Starbeam doesn't push changes through computations, how does the DOM get
updated?

The answer is that you **[render]** a function to synchronize its return value
with a part of your output using a Starbeam renderer. We call these functions "rendered functions".

::: info In Your Framework
Typically, you use a renderer like [@starbeam/react] or [@starbeam/svelte], which renders a reactive
computation using the framework's native rendering system.
:::

[render]: /guides/5-advanced/1-renderer.md

## Invalidation

Let's take a closer look at how invalidation works.

### Cells

Cells invalidate whenever their value is updated.

::: details More Detail: Cells with custom equality
If you specified an `equals` parameter when you created a cell, that cell won't invalidate if the
new value is equivalent to the old value according to the specified `equals`.
:::

### Reactive Collections

For the purpose of invalidation, [Reactive collection]s are basically a convenient collection of
cells, so that accessing a part of a reactive collection invalidates when that part changes. The
basic gist is this:

- A collection's "iteration" invalidates whenever new entries are added or removed from the
  collection. An iteration is _accessed_ when you iterate over the collection (e.g. using `for/of`
  syntax directly or using methods like `map` and `filter`).
- Each element of a collection invalidates whenever its value is updated (e.g. using `set` on a
  `Map`, `add` on a `Set`, or using `[]` notation on an object or array).

This means, for example, that a reactive function that filters a reactive array will invalidate when
you push onto the reactive array.

### Rendered Functions

A _rendered function_ is a function rendered by a Starbeam renderer.

A rendered function invalidates whenever any of the cells that it accesses are updated. Even if your
rendered function uses other functions, methods or resources, it will still invalidate when cells
that they use are updated.

::: emphasis
Invalidation occurs when a cell used by a rendered function is updated.
:::

==You don't need to wire anything up== to make this work. Any cell that was accessed while a
rendered function was running will invalidate.

## Example

To illustrate how invalidation works, we'll create a function that turns a reactive array into a
comma-separated string containing their names.

;;; ./$snippets/collection-invalidation.ts#array-dependency

If we render `list` and then push a _new_ person onto the array, the rendered function will invalidate.

;;; ./$snippets/collection-invalidation.ts#invalidation

### Checking for Invalidation using the Debug Renderer

Normally, you'd render `list` using a framework renderer, but we just want to take a peek at when
`list` invalidates. That's what the built-in debug renderer is for.

;;; ./$snippets/collection-invalidation.ts#debug-renderer

#### Demo

::: normal-demo

```html
<ol id="output"></ol>
<form id="add">
  <input type="text" name="name" />
  <button type="submit">Add Person</button>
</form>
```

```js
const output = document.querySelector("#output");
const addForm = document.querySelector("#add");

async function main() {
  const { reactive, DEBUG_RENDERER } = await import(
    "/starbeam.js"
  );

  const people = reactive.array([
    { name: "John" },
    { name: "Jane" },
    { name: "Bob" },
  ]);

  function list() {
    return people.map((person) => person.name).join(",");
  }

  DEBUG_RENDERER.render({
    render: list,
    debug: (commaSeparatedList) => {
      output.innerHTML += `<li>${commaSeparatedList}</li>`;
    },
  });

  // Whenever the form is submitted, add a new person to
  // the list.
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;

    const data = Object.fromEntries(
      new FormData(form).entries()
    );
    people.push(data);
    form.reset();
  });
}

main();
```

::::

### A Bit More

Let's add some a bit functionality to our example to see how more functions affects invalidation.

First, we'll add a `location` to our people list, and a function called `newYorkers` that filters
the people list to only show people from New York.

;;; ./$snippets/collection-multi-layer-invalidation.ts#array-dependency

Next, we'll add a function that converts an array of people into a comma-separated string, and another
function that uses that function to creates a comma-separated list of just New Yorkers.

;;; ./$snippets/collection-multi-layer-invalidation.ts#layers

If we then render `newYorkersString`, we'll see that it invalidates whenever the people array
changes.

#### Demo

::: normal-demo

```html
<p>
  Try adding a new person with the city "New York", and
  another person with a different city.
</p>

<form id="add">
  <label>
    <span>Name</span>
    <input type="text" name="name" />
  </label>
  <label>
    <span>City</span>
    <input type="text" name="location" />
  </label>
  <button type="submit">Add Person</button>
</form>

<div id="renders">
  <h2>Renders</h2>
  <ol id="output"></ol>
</div>
```

```css
form {
  display: grid;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  grid-template-columns: max-content 1fr;
}

#renders {
  padding-inline: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-block-start: 1rem;
}

label {
  display: contents;
}

button {
  grid-column: 1 / span 2;
}
```

```js
const output = document.querySelector("#output");
const addForm = document.querySelector("#add");

async function main() {
  const { reactive, DEBUG_RENDERER } = await import(
    "https://assets.codepen.io/1630871/starbeam.js"
  );

  const people = reactive.array([
    { name: "John", location: "New York" },
    { name: "Jane", location: "Paris" },
    { name: "Bob", location: "London" },
    { name: "Tom", location: "New York" },
  ]);

  function newYorkers() {
    return people.filter(
      (person) => person.location === "New York"
    );
  }

  function commaSeparated(list) {
    return list.map((person) => person.name).join(",");
  }

  function newYorkersString() {
    return commaSeparated(newYorkers());
  }

  DEBUG_RENDERER.render({
    render: newYorkersString,
    debug: (newYorkers) => {
      output.innerHTML += `<li>${newYorkers}</li>`;
    },
  });

  // Whenever the form is submitted, add a new person to
  // the list.
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;

    const data = Object.fromEntries(
      new FormData(form).entries()
    );
    people.push(data);
    form.reset();
  });
}

main();
```

::::

The cool thing here is that we used a bunch of normal JavaScript functions to build up our output. ==Nothing in between the reactive array and the renderer needs to understand that anything reactive is going on==.

In fact, you could have gotten `commaSeparated` from a third-party library, and everything would
still have worked.

[@starbeam/react]: /frameworks/react/README.md
[@starbeam/svelte]: /frameworks/svelte/README.md
[reactive collection]: /guides/3-collections/README.md
