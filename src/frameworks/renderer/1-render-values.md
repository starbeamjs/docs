---
order: 1
---

# Rendering Values

The most fundamental responsibility of a renderer is to render reactive values into the output.

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
