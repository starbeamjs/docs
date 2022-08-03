# Consumption and Validation

All of Starbeam's reactivity is based on around two concepts: consumption and validation.

When you render a computation, the rendered function _consumes_ all of the cells that were used in the computation.

If you update one of the cells used in the computation, the cell is invalidated, and any rendered
functions that consumed that cell in the past are invalidated.

Crucially, it doesn't matter how the rendered function consumed the cells, and how the code used by
the rendered function is structured. You use normal functions, getters and methods to build up your
rendered value, and ==none of that code needs to be aware of reactivity at all==.

::: info

Reactive collections, like `Map`s and `Set`s, work exactly the same way.

For example, if you `get` a value from a reactive map in a rendered function, the rendered function
_consumes_ the cell for that map entry. If you `set` the value later, that cell is invalidated.

And if a rendered function iterates over a reactive `Map`, it consumes a cell for the **iteration**.
If you later set a value, delete an entry or clear the map, the iteration cell is invalidated, which
invalidates your rendered function.

:::

To demonstrate this point, let's create an object that uses a reactive array under the hood, but
exposes a normal JavaScript API.

;;; ./$snippets/indirect-consumption.ts#indirect-consumption

We want to render a comma-separated list of people from New York, using `people.byLocation("New York")`.

;;; ./$snippets/indirect-consumption.ts#rendering-indirect-consumption

How does `byLocation` **consume** reactive cells?

1. It accessed the reactive `#people` array, stored in a private field
2. It used `Array`'s `filter` method to iterate the array

Next, we'll add some people to the array.

;;; ./$snippets/indirect-consumption.ts#adding-people

And how did this code **update** reactive cells?

1. It calls `push` on the `People` class
2. The `push` method accessed the reactive `#people` array
3. It used `Array`'s `push` method to add items to the array

This invalidated the array's **iteration**, which invalidated the rendered function.

Finally, since invalidation simply schedules revalidation, our renderer only ran once.

::: normal-demo

```html
<ul id="output"></ul>
<button id="add-people">Add some people</button>
```

```js
const button = document.querySelector("#add-people");
const output = document.querySelector("#output");

async function main() {
  const { reactive, DEBUG_RENDERER } = await import(
    "https://assets.codepen.io/1630871/starbeam.js"
  );

  class People {
    #people = reactive.array([]);

    push(person) {
      this.#people.push(person);
    }

    [Symbol.iterator]() {
      return this.#people[Symbol.iterator]();
    }

    byLocation(location) {
      return this.#people.filter((person) => person.location === location);
    }
  }

  const people = new People();

  DEBUG_RENDERER.render({
    render: () => people.byLocation("New York"),
    debug: (people) => {
      output.innerHTML += `<li>${JSON.stringify(
        people.map((person) => person.name)
      )}</li>`;
    },
  });

  button.addEventListener(
    "click",
    () => {
      people.push({ name: "John", location: "New York" });
      people.push({ name: "Jane", location: "New York" });
      people.push({ name: "Joe", location: "London" });
    },
    3000
  );
}

main();
```

::::

There's no need to do any kind of additional batching, debouncing or scheduling, since no values are
pushed through the system that need to be intercepted and massaged.

In fact, if the rendered function was removed before the revalidation occurred, nothing at all would
happen! Again, that's because the invalidation simply scheduled the renderer to revalidate, and by
the time it was ready to revalidate, it didn't exist anymore.

This may seem like a subtle point, but it's very important. It's what makes it possible to
use ==normal tools of JavaScript composition and abstraction== to build reactive systems without
even thinking about reactivity, and still have them behave correctly.
