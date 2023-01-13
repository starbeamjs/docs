# Universal Concepts

- Component instances
  - Component mounting and unmounting
  - Layout and idle Timing
- Reactive Rendering
- Application instances

## Components and Their Instances

Components look wildly different across frameworks, but when you
get down to the core, they are all doing the same thing.

Most generally, a component is a constructor that
<span class="li"><span>takes <em>reactive
props</em>,</span><span>has access to a <em>component
instance</em>, and</span><span>returns a <em>render
function</em></span></span>.

### Component Instances

Let's take a look at this concept across a number of frameworks.

<!-- prettier-ignore-start -->

:::=tabs=frameworks
::react

```tsx
export default function Counter() { // [!code ann]
  const [count, setCount] = useState(0); // [!code ann]

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

1. The component function is the component's _constructor_{.kw}.
2. `useState` allows you to associate _user state_{.kw} with a _component
  instance_{.kw}.

{.annotation}

Internally, When React creates a component instance, it creates an _internal state object_, and hooks like
`useState` access that state object.

When React later **updates** the component, it calls the component's render function again, and
causes `useState` and other hooks to refer to the _same internal instance_.

::vue

### Using the Composition API

```vue
<script setup> // [!code script:3]
// [!code ann]
const count = ref(0); // [!code ann]
</script>

<template> // [!code template-tag:8]
  <div>
    <p>Count: {count}</p>
    <button @click="() => count++">
      Increment
    </button>
  </div>
</template>
```

1. The body of the `<script setup>` tag is the component's _constructor_{.kw}.
2. `ref` allows you to associate _user state_{.kw} with a _component
  instance_{.kw}.

{.annotation}

### Using the Options API

```vue
<script> // [!code script:14]
export default {
  data() { // [!code ann]
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  }
}
</script>

<template> // [!code template-tag:8]
  <div>
    <p>Count: {count}</p>
    <button @click="increment">
      Increment
    </button>
  </div>
</template>
```

1. The `data` method is the component's _constructor_{.kw}. The return value of `data` is the
   component's _instance_{.kw}.

{.annotation}

::ember

```glimmer
export default class extends Component { // [!code ann]
  @tracked count = 0; // [!code ann]

  increment = () => this.count++;

  <template> // [!code template-tag:8]
    <div>
      <p>Count: {this.count}</p>
      <button {{on "click" this.increment}}>
        Increment
      </button>
    </div>
  </template>
}
```

1. Since an Ember component is a _class_{.kw}, its constructor is the _component's
  constructor_{.kw}, and its instances are the _component's instances_{.kw}.
2. To associate _user state_{.kw} with a component instance, you use _fields_{.kw} on the class.

{.annotation}

::svelte

```svelte
<script> // [!code script:6]
  // [!code ann]
  let count = 0; // [!code ann]

  const increment = () => count++;
</script>

<div> // [!code template:6]
  <p>Count: {count}</p>
  <button on:click={increment}>
    Increment
  </button>
</div>
```

1. The body of the `<script>` tag is the component's _constructor_{.kw}.
2. To associate _user state_{.kw} with a component instance, you use `let` variables in the
   `<script>` tag.

{.annotation}

:::

<!-- prettier-ignore-end -->

:::warning Observation

There are three styles of component instantiation:

### ==_➊_{.annotation} An explicit constructor==

(Vue Options API and Ember)

Explicit constructors run once when the component is instantiated
and make it possible to directly assign things onto the component
instance.

In this situation, you can run code "once per instance" and
associate it with the component instance by simply running the
code in the constructor.

### ==_➋_{.annotation} An implicit constructor==

(Vue `<script setup>` and Svelte)

Implicit constructors run once when the component is
instantiated, but don't expose a function signature or a way to
access the current component instance directly.

### ==_➌_{.annotation} A dual-purpose constructor and render function==

(React and React-like frameworks like Preact)

:::
