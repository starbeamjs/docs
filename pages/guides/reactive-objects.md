The rules for writing reactive code using Starbeam are based on our [guiding principle](./principle).

::: info Starbeam's Core Principle
If you model your reactive data like any other data, you can build reliable reactive UIs with the skills you already have.
:::

A Reactive Object is a JavaScript object that exposes reactive properties and methods for interacting with the data it contains.

You can create reactive objects in two ways:

- Using the `Reactive` function, which return a constructor for your reactive object.
- By writing a normal JavaScript class and the `@reactive` decorator. In this case, the class **is** the constructor for your reactive object.

## The Design

In this example, we'll create a reactive object that represents a formatted date.

To get an idea of what we're working up to, let's look at the code:

```ts
export default Reactive((options: Props<{ locale: string }>) => {
  const date = reactive({ now: new Date() });

  function format(date: Date) {
    return new Intl.DateTimeFormat(options.locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  function refresh() {
    date.now = new Date();
  }

  return {
    get now() {
      return format(date.now);
    },
    refresh,
  };
});
```

### In React

And here's how you'd use it in React:

```tsx
import FormattedDate from "./reactive/date";

const OPTIONS = Intl.DateTimeFormat().resolvedOptions();
const LOCAL_TZ = OPTIONS.timeZone;

export function App() {
  const [locale, setLocale] = useState(LOCAL_TZ);

  function toggleUTC() {
    if (locale === "UTC") {
      setLocale(LOCAL_TZ);
    } else {
      setLocale("UTC");
    }
  }

  const date = useReactive(FormattedDate, { locale });

  return (
    <div>
      <button onClick={toggleUTC}>
        {locale === "UTC" ? "local time" : "UTC"}
      </button>
      <button onClick={date.refresh}>🔃</button>
      <div>{date.now}</div>
    </div>
  );
}
```

### In Svelte

```svelte
<script>
  import { use } from "@starbeam/svelte";
  import { FormattedDate } from "./reactive/date.js";

  const OPTIONS = Intl.DateTimeFormat().resolvedOptions();
  const LOCAL_TZ = OPTIONS.timeZone;

  let locale = LOCAL_TZ;
  const date = use(FormattedDate);

  function toggleUTC() {
    if (locale === "UTC") {
      locale = LOCAL_TZ;
    } else {
      locale = "UTC";
    }
  }

</script>

<div>
  <button on:click={toggleUTC}>
    {locale === "UTC" ? "local time" : "UTC"}
  </button>
  <button on:click={() => $date.refresh()}>🔃</button>
  <div>{$date.now}</div>
</div>
```

::: tip
If you're wondering how to make the clock tick automatically, you're looking for [resources](./resources). Resources are reactive objects that are associated with a parent object and have cleanup logic.

If you want the clock to tick, you'll want to use `setInterval`, and you'll want to automatically clear the interval when the component is unmounted.

Creating a resource is as simple as creating a reactive object and defining its cleanup method, but resources must be associated with an owner before they can be used.

::: details Expand to see the implementation

```tsx{1,12-14,16-18}
export default Resource((options: Props<{ locale: string }>, resource) => {
  const date = reactive({ now: new Date() });

  function format(date: Date) {
    return new Intl.DateTimeFormat(options.locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  const interval = setInterval(() => {
    date.now = new Date();
  }, 1000);

  resource.on.cleanup(() => {
    clearInterval(interval);
  });

  return {
    get now() {
      return format(date.now);
    },
    refresh,
  };
});
```

For more information, check out the [resources](./resources) documentation.
:::

## Getting Started
