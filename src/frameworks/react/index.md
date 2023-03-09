# Getting Started with React

Start by installing the React renderer into your app.

```npm
@starbeam/react @starbeam/universal @starbeam/js
```

## Using Starbeam

!(./-snippets/quickstart.tsx#app)

```stackblitz[starbeam-react-example-counter]
file = src/App.tsx
```

This is the most basic way to use Starbeam in a React app.

- You use the `useSetup` hook to create reactive values when the
  component is mounted.
- You use the `useReactive` hook to read from reactive values and
  tell React to rerender when they change.

```md tip React 18
The `useSetup` hook was designed to work well with React 18's new
[strict mode](https://reactjs.org/blog/2022/03/29/react-v18.html),
which tests whether your components are resilient to unmounting
and remounting.

Starbeam automatically handles this for you by running the
`useSetup` callback again when the component is remounted.

We **do not** circumvent React's strict mode by attempting to
detect whether the component is "really" being unmounted.
Instead, we follow React's guidance and clean on any unmount, and
recreate `useSetup` state if the component gets remounted.
```

## The `useResource` Hook

The `@starbeam/react` renderer also includes a `useResource`
hook, which allows you to attach Starbeam resources into a React
app. Resources are instantiated when the component is mounted,
and cleaned up when the component is unmounted.

To get an idea for how it works, we'll integrate the Stopwatch
resource from the [Guides](/guides/fundamentals/resources)
section into React.

As a quick refresher, here's what the resource looks like:

!(./-snippets/resources.tsx#stopwatch)

The resource creates a cell that holds the current date, but
waits to set up the interval until the component that uses the
resource is mounted.

Once the component is **mounted**, the resource creates an timer
that will update the `time` cell once per second. It also
specifies a cleanup function that will run when the component
that uses the resource is **unmounted**.

Next, we'll use the `useResource` hook to integrate it into a
React component.

!(./-snippets/resources.tsx#component)

The `useResource` hook constructs the resource for us and
integrates it into the component's lifecycle. ==That's the magic
of Starbeam resources: they're written without any special
knowledge of the quirks of any particular framework, but they can
be deeply integrated into any framework.==

### Edge Cases

What exactly do we mean by "deeply integrated"? Let's take a look
at a couple of React-specific edge cases to see how the
`useResource` hook handles them.

**A component that never fully mounts**: if React renders the
component but never mounts it, the interval will never be
created. This can happen in a React
[transition](https://reactjs.org/docs/hooks-reference.html#usetransition)
if the render is aborted before the component is mounted. It also
happens in strict mode.

**A component that is remounted**: If React unmounts the
component and then remounts it, the interval will be cleaned up
when the component is unmounted, and the resource will be
recreated when the component is remounted. This can happen when
using HMR (hot module reloading) on in the upcoming Offscreen
API. It also happens in strict mode.

This means that every time a component using `Stopwatch` is
remounted, a new `time` cell is created. From the perspective of
the resource, a remounted component is a new component, which
means that resources don't need to implement special logic to
reset state on remount. It just works.

```md tip Framework agnostic
It's important to remember that Starbeam's resources are
framework agnostic. They are intended to be expressive enough to
describe the lifecycle behavior of any framework. In our case,
this means that resources written without any special knowledge
of React will work reliably when used with advanced React
features such as Concurrent APIs, as well as strict mode.

And Starbeam resources can be used in other frameworks, which
makes it easy to share reactive logic with lifecycle behavior
between frameworks.
```

## Compatibility with Strict Mode and Concurrent APIs

The `useResource` hook is compatible with strict mode, concurrent
APIs and other advanced React features.

Compatibility with strict mode means:

- A Resource's setup blocks will only run if React guarantees
  that their associated cleanup blocks run.
- If a component is unmounted, the Resource's setup blocks will
  be cleaned up. If it is **remounted**, the Resource constructor
  will be called again. This means that a resource gets fresh
  state when the component is remounted, which makes resources
  fully compatible with strict mode, but without the need to
  manually reset state when the component is remounted.
- Resources will be cleaned up when the component is unmounted,
  even during "double-effect" strict mode.

### Strict Mode Enables React Features

In our opinion, React's strict mode is communicating important
information about whether a component is compatible with the full
set of React features, including concurrent APIs and the upcoming
offscreen API.

==If you want to use the full set of React features, your
components must be compatible with React strict mode.==

By building the `@starbeam/react` renderer to work well in strict
mode, you will be able to use Starbeam features (even advanced
ones) in apps that take advantage of these new features, as well
as new features that the React team is still working on.
