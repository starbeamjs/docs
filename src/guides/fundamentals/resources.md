# Resources

<script setup lang="ts">
  import * as resources from "./demos/resources/config.js";
</script>

A resource is a reactive computation that needs to be cleaned up
when it is no longer used.

Resources are created with an owner, and whenever the owner is
cleaned up, the resource is also cleaned up. This is called
_ownership linking_.zz

Typically, a component in your framework will own your resources.
The framework renderer will make sure that when your component is
_unmounted_, its associated resources are cleaned up.

## Example: Ticking Stopwatch

Let's illustrate the idea of a resource by creating a stopwatch
that uses a `setInterval` to tick. By using a Starbeam resource,
we can ensure that the stopwatch is stopped when the owner is
cleaned up.

```md 💡
A resource's return value is a function that computes the value
of the resource whenever its dependencies change.
```

### **demo**{.marker} rendering the stopwatch

<Demo :config="resources" />

## Lifecycle

Let's take a look at an example of a resource that receives
messages on a channel, and returns a string representing the last
message it received.

```md info
In this example, the channel name that we're subscribing to is
dynamic, and we want to unsubscribe from the channel whenever the
channel name changes, but _not_ when we get a new message.
```

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

That's what makes it possible to pass a resource to
`TIMELINE.render` and have it continue to work even when the
internal resource is torn down and recreated.
```
