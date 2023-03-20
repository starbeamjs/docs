# Resources

<script setup lang="ts">
  import * as resources from "./demos/resources/config.js";
</script>

```md em
A resource is a reactive function with cleanup logic.
```

Resources are created with an owner, and whenever the owner is
cleaned up, the resource is also cleaned up. This is called
_ownership linking_.

Typically, a component in your framework will own your resources.
The framework renderer will make sure that when your component is
_unmounted_, its associated resources are cleaned up.

```md details type="deep-dive" title="Resources Convert Processes Into Values"
Typically, a resource converts an imperative, stateful
**process**, such as an asynchronous request or a ticking timer,
into a **reactive value**.

That allows you to work with a _process_ just like you'd work
with _any other reactive value_.

This is a very powerful capability, because it means that adding
cleanup logic to an existing reactive value doesn't change the
code that works with the value.

The only thing that changes when you convert a reactive value
into a resource is that it must be instantiated with an owner.
The owner defines the resource's lifetime. Once you've
instantiated a resource, the value behaves like any other
reactive value.

In TypeScript, the type of a resource is `Reactive<T>`, just like
a cell or formula.
```

## A Very Simple Resource

To illustrate the concept, let's create a simple resource that
represents the current time.

!(./-snippets/simple-resource.ts#time)

```md 💡
A resource's return value is a reactive value. If your resource
represents a single cell, it's fine to return it directly. It's
also common to return a `Formula` that depends on reactive state
that you created inside the resource constructor.
```

When you use the `Now` resource in a component in your framework,
it will automatically get its lifetime linked to the component.
In this case, that means that the interval will be cleaned up
when the component is unmounted.

The `Resource` function creates a _Resource Constructor_. A
resource constructor:

1. Sets up _internal reactive state_ that changes over time.
2. Sets up the _external process_ that needs to be cleaned up.
3. Registers the _cleanup code_ that will run when the resource
   is cleaned up.
4. Returns a reactive value that represents the current state of
   the resource _as a value_.

In this case:

| internal state | external process | cleanup code    | return value       |
| -------------- | ---------------- | --------------- | ------------------ |
| `Cell<number>` | `setInterval`    | `clearInterval` | `Reactive<number>` |

```md details type="deep-dive" title="Resources Values Are Immutable"
When you return a reactive value from a resource, it will always
behave like a generic, immutable reactive value. This means that
if you return a `Cell` from a resource, the resource's value will
have `.current` and `.read()`, but not `.set()`, `.update()` or
other cell-specific methods.

If you _want_ your resource to return a value that can support
mutation, you can return a JavaScript object with accessors and
methods that can be used to mutate the value.

This is an advanced use-case because you will need to think about
how external mutations should affect the running process. Check
out the
[React Query demo](https://github.com/starbeamjs/starbeam/tree/main/demos/react-query)
in the Starbeam codebase for a good example.
```

### A Ticking Stopwatch {.decor .demo}

To see how lifetime linking works, here's a simple demo of a
Stopwatch resource using the `DEBUG_RENDERER`.

The code instantiates the stopwatch using an owner it creates
locally. When you press the "Finalize the Stopwatch" button, the
owner is finalized, which will clean up the stopwatch.

<Demo :config="resources" />

A description of the `Stopwatch` resource:

| internal state | external process | cleanup code    | return value       |
| -------------- | ---------------- | --------------- | ------------------ |
| `Cell<Date>`   | `setInterval`    | `clearInterval` | `Reactive<string>` |

The internals of the `Stopwatch` resource behave very similarly
to the `Now` resource. The main difference is that the
`Stopwatch` resource returns the time as a formatted string.

From the perspective of the code that _uses_ the stopwatch, the
return value is a normal reactive string.

## The `use` Method: Reusing the `Now` Resource in `Stopwatch`

You might be thinking that `Stopwatch` reimplements a whole bunch
of `Now`, and you ought to be able to just use `Now` directly
inside of `Stopwatch`.

You'd be right!

!(./-snippets/resource-reuse.ts#reuse)

The `Stopwatch` resource instantiated a `Now` resource using its
`use` method. That automatically links the `Now` instance to the
owner of the `Stopwatch`, which means that when the component
that instantiated the stopwatch is unmounted, the interval will
be cleaned up.

```md tip Powerful Composition in Universal Code
The `use` method allows you to create resources that build on
other resources in universal code. You can create a composed
resource like `Stopwatch` without locking yourself in to the
details of any framework's reactivity system, and then let anyone
use it with the Starbeam renderer for their framework.

Powerful stuff!
```

## Using a Resource to Represent an Open Channel

Resources can do more than represent data like a ticking clock.
You can use a resource with any long-running process, as long as
you can represent it meaningfully as a "current value".

````md details type="deep-dive" title="Compared to Other Systems: Destiny of Unused Values"
You might be thinking that resources sound a lot like other
systems that convert long-running processes into a stream of
values (such as
[observables](https://rxjs.dev/guide/observable)).

While there are similarities between Resources and stream-based
systems, there is an important distinction: because Resources
only produce values on demand, they naturally ignore computing
values that would never be used.

This includes values that would be superseded before they're used
and values that would _never_ be used because the resource was
cleaned up before they were demanded.

**This means that resources are not appropriate if you need to
fully compute values that aren't used by consumers.**

In stream-based systems, there are elaborate ways to use
scheduling or lazy reducer patterns to get similar behavior.
These approaches tend to be hard to understand and difficult to
compose, because the rules are in a global scheduler, not the
definition of the stream itself. These patterns also give rise to
distinctions like "hot" and "cold" observables.

On the other hand, Starbeam Resources naturally avoid computing
values that are never used _by construction_.

TL;DR Starbeam Resources do _not_ represent a stream of values
that you operate on using stream operators.

```md em
Starbeam resources represent a **single reactive value** that is
always up to date when demanded.
```

This also allows you to use Starbeam resources and other values
interchangably in functions, and even pass them to functions that
expect reactive values.
````

Let's take a look at an example of a resource that receives
messages on a channel, and returns a string representing the last
message it received.

In this example, the channel name that we're subscribing to is
dynamic, and we want to unsubscribe from the channel whenever the
channel name changes, but _not_ when we get a new message.

!(./-snippets/resource-lifecycle.ts#define-resource)

`ChannelResource` is a JavaScript function that takes the channel
name as a reactive input and returns a resource constructor.

That resource constructor starts by subscribing to the current
value of the `channelName`, and then telling starbeam to
unsubscribe from the channel when the resource is cleaned up.

It then creates a cell that holds the last message it received on
the channel, and returns a function that returns that message as
a formatted string (or a helpful message if the channel hasn't
received any messages yet).

At this point, let's take a look at the dependencies:

```d2 width="40%"
direction: up

Output: {
  shape: rectangle
  style: {
    %output-style
    %output-color
  }
}

channelName: {
  shape: rectangle
  style: %valid
}

resource: "" {
  ChannelResource: {
    shape: text
  }
  lastMessage: {
    style: %valid
  }
}

Output -> channelName
Output -> resource.lastMessage
resource.ChannelResource -> channelName
```

Our output depends on the channel name and the last message
received on that channel. The `lastMessage` depends on the
channel name as well, and whenever the channel name changes, the
resource is cleaned up and the channel is unsubscribed.

**If we receive a new message**, the `lastMessage` cell is set to
the new message. This invalidates `lastMessage` and therefore the
output as well.

```d2 width="40%"
direction: up

Output: {
  shape: rectangle
  style: {
    %output-style
    %invalid
  }
}

channelName: {
  shape: rectangle
  style: %valid
}

resource: "" {
  ChannelResource: {
    shape: text
  }
  lastMessage: {
    style: %invalid
  }
}

Output -> channelName
Output -> resource.lastMessage
resource.ChannelResource -> channelName
```

However, this does **not** invalidate the resource itself, so the
channel subscription remains active.

On the other hand, **if we change the `channelName`**, that
invalidates the `ChannelResource` itself.

```d2 width="40%"
direction: up

Output: {
  shape: rectangle
  style: {
    %output-style
    %invalid
  }
}

channelName: {
  shape: rectangle
  style: %invalid
}

resource: "" {
  style: %invalid
  ChannelResource: {
    shape: text
  }
  lastMessage {
    style: %na
  }
}

Output -> channelName
Output -> resource.lastMessage
resource.ChannelResource -> channelName
```

As a result, the resource will be cleaned up and the channel
unsubscribed. After that, the resource will be re-created from
the new `channelName`, and the process will continue.

```md em
From the perspective of the creator of a resource, the resource
represents a stable reactive value.
```

```md details Under the Hood
Under the hood, the internal `ChannelResource` instance is
cleaned up and recreated whenever **its** inputs change. However,
the resource you got back when you `create`d it remains the same.

That's what makes it possible to pass a resource to a Starbeam
renderer and have it continue to work even when the internal
resource is torn down and recreated.
```
