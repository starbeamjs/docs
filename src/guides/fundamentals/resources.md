---
order: 4
---

# Resources

A resource is a reactive computation that needs to be cleaned up when it is no longer used.

Resources are created with an owner, and whenever the owner is cleaned up, the resource is also
cleaned up. This is called _ownership linking_.

Typically, a component in your framework will own your resources. The framework renderer will make
sure that when your component is _unmounted_, its associated resources are cleaned up.

[validated on demand]: ./3-validation.md

## Example: Ticking Stopwatch

Let's illustrate the idea of a resource by creating a stopwatch that uses a `setInterval` to tick.
By using a Starbeam resource, we can ensure that the stopwatch is stopped when the owner is cleaned up.

<!-- ;;; ./$snippets/resources.ts#stopwatch -->

::: 💡
A resource's return value is a function that computes the value of the resource whenever its
dependencies change.
:::

### <strong class="marker">demo</strong> rendering the stopwatch

::: normal-demo

```html
<p id="output"></p>
<button id="finalize">Finalize the Stopwatch</button>
```

```js
const button = document.querySelector("#finalize");
const output = document.querySelector("#output");

async function main() {
  const { Cell, Resource, TIMELINE, LIFETIME } = await import(
    "https://assets.codepen.io/1630871/starbeam.js"
  );

  const Stopwatch = Resource((r) => {
    const time = Cell(new Date());

    const interval = setInterval(() => {
      time.set(new Date());
    }, 1000);

    r.on.cleanup(() => clearInterval(interval));

    return () => {
      const now = time.current;

      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).format(now);
    };
  });

  // Instantiate the Stopwatch with an owner. We will
  // later finalize the owner to clean up the resource.
  // In this case, that will clear the interval and
  // stop the watch from ticking.
  const owner = {};
  const stopwatch = Stopwatch.create({
    owner,
  });

  // Render the stopwatch into the DOM. The `render`
  // callback will be called whenever the stopwatch's
  // value changes.
  //
  // In this case, that will happen whenever the `time`
  // cell in the resource is set.
  TIMELINE.render(stopwatch, () => {
    output.innerHTML = `The current time is: ${stopwatch.current}`;
  });

  button.addEventListener(
    "click",
    () => {
      LIFETIME.finalize(owner);
    },
    3000
  );
}

main();
```

::::

## Lifecycle

Let's take a look at an example of a resource that receives messages on a channel, and returns a
string representing the last message it received.

::: info
In this example, the channel name that we're subscribing to is dynamic, and we want to unsubscribe
from the channel whenever the channel name changes, but _not_ when we get a new message.
:::

;;; ./$snippets/resource-lifecycle.ts#define-resource

`ChannelResource` is a JavaScript function that takes the channel name as a reactive input and
returns a resource constructor.

That resource constructor starts by subscribing to the current value of the `channelName`, and then
telling starbeam to unsubscribe from the channel when the resource is cleaned up.

It then creates a cell that holds the last message it received on the channel, and returns a
function that returns that message as a formatted string (or a helpful message if the channel hasn't
received any messages yet).

At this point, let's take a look at the dependencies:

```deps
resource:::chart-resource

channelName
subgraph resource [ChannelResource]
lastMessage
end
resource --> channelName
Output --> channelName
Output --> lastMessage
```

Our output depends on the channel name and the last message received on that channel. The
`lastMessage` depends on the channel name as well, and whenever the channel name changes, the
resource is cleaned up and the channel is unsubscribed.

**If we receive a new message**, the `lastMessage` cell is set to the new message. This invalidates
`lastMessage` and therefore the output as well.

```deps
resource:::chart-resource

channelName
subgraph resource [ChannelResource]
lastMessage:::invalidated
end
Output:::invalidated
resource
resource --> channelName
Output --> channelName
Output --> lastMessage
```

However, this does **not** invalidate the resource itself, so the channel subscription remains
active.

On the other hand, **if we change the `channelName`**, that invalidates the `ChannelResource`
itself.

```deps
resource:::chart-resource
classDef default font-family:monospace

channelName:::invalidated
subgraph resource [ChannelResource]
  lastMessage:::inactive
end
Output:::inactive
resource:::invalidated
resource --> channelName
Output --> channelName
Output --> lastMessage
```

As a result, the resource will be cleaned up and the channel unsubscribed. After that, the resource
will be re-created from the new `channelName`, and the process will continue.

::: emphasis
From the perspective of the creator of a resource, the resource represents a stable reactive value.
:::

::: details Under the Hood
Under the hood, the internal `ChannelResource` instance is cleaned up and recreated whenever **its** inputs
change. However, the resource you got back when you `create`d it remains the same.

That's what makes it possible to pass a resource to `TIMELINE.render` and have it continue to work
even when the internal resource is torn down and recreated.
:::
