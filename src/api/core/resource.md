---
Resource:
  kind: constructor-fn
  generics: ["T"]
  returns: ["Resource"]
  params:
    blueprint: ["(create: ResourceBuilder) => () => T", "A function that sets up a resource and returns a  function that computes the current value of the resource"]
    description: ["string?", "A description of the resource"]
  properties:
    current: [T, "The current value of the resource", readonly]
ResourceBuilder:
  kind: interface
  methods:
    on.setup:
      params:
        setup: ["() => () => void", "A reactive setup function"]
        description: ["string?", "A description of the setup logic"]
      returns: ["Unsubscribe", "An unsubscribe function that can be used to stop the setup function from being called again"]

---

<Api>

# Resources

Resources are the main way to connect Starbeam to external input data.

If you're used to using effects to connect external inputs in other frameworks, resources serve a
similar purpose. The primary difference is that resources expose reactive data, just like
`FormulaFn`.

The author of a resource sets up an imperative subscription, defines the cleanup logic for the
subscription, and returns a function that computes the current value of the resource.

As the resource modifies its internal cells, the value of the resource is always up to date with the
result of the computation.

```ts
const Stopwatch = Resource((resource) => {
  const start = Cell(new Date());

  resource.on.setup(() => {
    const interval = setInterval(() => {
      start.set(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return () => start.current;
});
```

Resources are defined in terms of Starbeam APIs, and then wired into applications through renderers.

For example, you could use the stopwatch in the above example in React by using the `useResource`
hook from `@starbeam/react`.

```tsx
import { useResource } from "@starbeam/react";

function TickingClock() {
  const now = useResource(Stopwatch);

  return <p>{now.toLocaleTimeString()}</p>;
}
```

</Api>