---
order: 1
---

# Rendering Into a Value

The first kind of renderer is a Render-Into-Value renderer.

This kind of renderer is for components that return a value for each render, such as JSX.

If your component render is fundamentally a function that reads from reactive values and produces a
value, then your job is relatively easy. You need to:

1. Figure out how to notify the framework that you want it to re-render.
2. Figure out how to get a representation of the "component instance", which you will link resource
   lifetimes to.

## Phases

A value renderer goes through the following phases:

1. **Initial Render.** This is the first time the component is rendered, and the first time that the
   user's component code returns the value representing the DOM. Structurally, this code reads from
   reactive values and returns a value representing the DOM.
2. **User Actions:** User code (e.g. event handlers or async continuation) is executed, and it mutates
   reactive values. This phase happens outside of your explicit code: any user code that runs
   outside of a render phase is considered an "action".
3. **Notify:** Starbeam notifies your render handler that a user action has mutated an input that
   was used in the last render phase. In the handler, you should notify the framework that a
   re-render is needed.
4. **Updating Render:** The framework invokes your component again, and is expecting you to return a
   new value representing the DOM. Structurally, this code reads (again) from reactive values and
   returns a value representing the DOM.

```lifecycle
Initial --> Repeat
subgraph Repeat
   Actions --> Notify --> Updating
end

Initial[Initial Render]
Actions[User Actions]
Notify[Notify]
Updating[Updating Render]
```

## A Simple Example (JSX)

;;; ./$snippets/jsx-renderer.tsx#read-separately

## Identify the Component Concept

The first step in building a renderer for a framework is to identify the component concept in the
framework in question.

The component should:

1. Have a unique instance for each time it's used.
2. Provide a way for user-supplied code to turn values into a DOM fragment.
3. Provide a way for the user to run code when the component is removed from the DOM.
4. Provide a way for the user to notify the framework that an update might be required.

## Provide a User-Facing API

Your primary job is to provide an idiomatic API that provides the user with a way to read reactive
values into the template or JSX-style syntax that the framework uses.

Critically, you will need to make sure sure that all reactive reads are performed inside a single
function, which also produces the output template.

>

```

```
