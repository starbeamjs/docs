# Starbeam is Universal Reactivity

Starbeam is a library that allows you to write reactive code in a
framework agnostic way. This means that you can write your code
once, and use it with any framework that has a Starbeam renderer.

At the moment, Starbeam has renderers for React and Preact. We've
also built a proof of concept renderer for Svelte and we're
working on a Vue renderer.

## What is Universal Reactivity?

Starbeam is a _universal reactivity_ system. If you're familiar
with React hooks, you can think of Starbeam as a way of writing
**universal hooks**.

Unlike a lot of other reactivity libraries, Starbeam's reactivity
system goes beyond reactive data.

Starbeam provides four universal building blocks:

- [Reactive data](/guides/fundamentals/data.md): simple values,
  computed values, and reactive versions of JavaScript's built-in
  data structures (added in 0.5).
- [Reactive resources](/guides/fundamentals/resources.md):
  reactive values with lifecycle. You can use these to create
  reactive data sources, like a WebSocket connection or a fetch
  request (added in 0.6).
- [Reactive services](/guides/fundamentals/services.md): reactive
  application state. Services are resources that are set up once
  per app instance, and cleaned up when the application root is
  unmounted. You can use these to create reactive data sources
  that are shared across components without relying on
  module-level state and mocking (added in 0.8).
- [Reactive modifiers](/guides/fundamentals/modifiers.md):
  reactive DOM modifiers. You can use these to define DOM
  behavior that is based on reactive data, and whose setup and
  cleanup behavior is tied to an element in the DOM (prototyped
  in the repo, coming in 0.10).

:::💡

When you write code using these universal building blocks, you
use the Starbeam libraries and **don't** reference any specific
framework.

Starbeam is expressive enough to allow you to write code that
builds on powerful framework features such as React's concurrent
APIs and Preact's signals, but you don't need to know about the
details of these features to use them.

When we say that Starbeam is a **universal reactivity**
framework, we **don't** mean that Starbeam is a
lowest-common-denominator library.

Instead, _we_ jump through hoops to find streamlined APIs that
are expressive enough to take advantage of advanced framework
features and ergonomic enough to use in any framework environment
so _you_ don't have to.

:::

## What is Starbeam Reactivity?

Since Starbeam reactivity is designed to feel like normal
programming, let's start with a non-reactive JavaScript program.
Once we've seen how a non-reactive program works, we'll see how
to make it reactive using Starbeam.

## Inputs and Outputs

Let's start with a simple definition of a program: "A program is
a function that takes some inputs and produces some outputs."

- **Inputs**: data that the program uses to do its work.
- **Outputs**: the data that the program produces.

For example, a program that takes a list of people objects and
produces a list of contact cards might look like this:

![#basics](./-snippets/universal-inputs.ts)

:::tip Functional Programming

This kind of programming, which is focused on inputs and outputs,
is usually called _functional programming_.

The excellent [How to Design Programs](https://htdp.org/)
textbook, which teaches functional programming using the Racket
programming language to an introductory audience, describes a
program this way:

> Hence any reasonably complete program consists of many building
> blocks: some deal with input, some create output, while some
> bridge the gap between those two.

:::

If we ran the `display` function with the following person:

![#person](./-snippets/universal-inputs.ts)

We'd get the following output:

```html
<div class="contact">
  <h1>John Doe</h1>
  <h2>New York</h2>
  <ul>
    <li>555-1234</li>
    <li>555-5678</li>
  </ul>
</div>
```

If we ran the `display` function again with a person with an
extra phone number:

![#person2](./-snippets/universal-inputs.ts)

We'd get:

```diff
 <div class="contact">
   <h1>John Doe</h1>
   <h2>New York</h2>
   <ul>
     <li>555-1234</li>
     <li>555-5678</li>
+    <li>555-9012</li>
   </ul>
 </div>
```

We can call this kind of programming, where the inputs and
outputs are clearly defined, _data oriented programming_.

We can visualize this kind of program as a data flow diagram:

```d2
direction: right
Sequence: "" {
  shape: sequence_diagram

  display: "display" {
    shape: rectangle

    style: {
      font-size: 25
      font-color: "#14485f"
      fill: "#92C6E1"
      stroke: "#043d53"
      double-border: true
      bold: true
    }
  }

  Person: Person {
    shape: package
    style: {
      font-size: 30
      fill: "#E3E8D2"
      stroke: "#5F6933"
      font-color: "#5c6347"
    }
  }

  displayPhone: "displayPhone()" {
    shape: rectangle
    style: {
      font-size: 25
      fill: "#ecd265"
      font-color: "#5f4f00"
      stroke: "#5f4f00"
    }
  }
  Contact: {
    shape: package
    style: {
      multiple: true
      font-size: 30
      fill: "#E3E8D2"
      stroke: "#5F6933"
      font-color: "#5c6347"
    }
  }

  read cells: "" {
    style: {
      fill: "#E3E8D2"
    }
    Person.t -> display.t: "read name" {
      style: {
        animated: true
        font-color: "#004947"
        stroke: "#2d716e"
        stroke-dash: 2
      }
    }
    Person.t -> display.t: "read location" {
      style: {
        animated: true
        font-color: "#004947"
        stroke: "#2d716e"
        stroke-dash: 2
      }
    }
    Person.t -> display.t: "read contacts" {
      style: {
        animated: true
        font-color: "#004947"
        stroke: "#2d716e"
        stroke-dash: 2
      }
    }
  }

  Contact.t -> display.t: "iterate contacts" {
    style: {
      animated: true
      font-color: "#004947"
      stroke: "#2d716e"
      stroke-dash: 2
    }
  }

  read list of contacts: "" {
    style: {
      fill: "#ecd265"
    }
    display.t -> displayPhone.t: "call displayPhone with contact" {
      style: {
        stroke: "#96a16c"
      }
    }

    read home: "" {
      Contact.t -> displayPhone.t: "read home.type" {
        style: {
          animated: true
          font-color: "#004947"
          stroke: "#2d716e"
          stroke-dash: 2
        }
      }
      Contact.t -> displayPhone.t: "read home.number" {
        style: {
          animated: true
          font-color: "#004947"
          stroke: "#2d716e"
          stroke-dash: 2
        }
      }
    }
    read work: "" {
      Contact.t -> displayPhone.t: "read work.type" {
        style: {
          animated: true
          font-color: "#004947"
          stroke: "#2d716e"
          stroke-dash: 2
        }
      }
      Contact.t -> displayPhone.t: "read work.number" {
        style: {
          animated: true
          font-color: "#004947"
          stroke: "#2d716e"
          stroke-dash: 2
        }
      }
    }

    displayPhone.t -> display.t: "return rendered contact" {
      style: {
        stroke: "#96a16c"
      }
    }
  }

  display.t.style: {
    fill: "#92C6E1"
    stroke: "#043d53"
  }

  displayPhone.t.style: {
    fill: "#ecd265"
    stroke: "#5f4f00"
  }

  Person.t.style: {
    fill: "#E3E8D2"
    stroke: "#5F6933"
  }

  Contact.t.style: {
    fill: "#E3E8D2"
    stroke: "#5F6933"
  }
}
```

To create the contact card, the `display` function reads the
person's name, location, and phone numbers. It then calls the
`displayPhone` function to display each phone number.

This kind of data-oriented programming is easy to understand. The
output of the program is computed by reading from inputs or
calling functions that ultimately read from inputs.

## The Problem With State

But what happens if our inputs change over time? Our
data-oriented program won't work anymore, because the output
becomes stale when the inputs change, but the structure of our
program doesn't have any way to update the output in response to
the changes.

For example, if we add a phone number to the person, it's obvious
that the HTML won't magically update in response.

![#person3](./-snippets/universal-inputs.ts)

This happens because the `person` we created isn't an _input_ to
our `display` function, but rather a piece of **state** that can
change over time.

:::tip State

Adding state to a program with inputs and outputs complicates
things, because now we have to worry about updating our outputs
when our state changes. This is much more complicated than the
simple input/output model we started with, but real programs need
to be able to change over time. ==Real programs have state==.

:::

The thing we liked about our input/output model was that it was
easy to understand. We could see exactly what our program would
output for a given set of inputs. But it only worked if the
inputs didn't change. And **real programs need to represent
changes over time**.

We can obviously update the output **manually** in response to
changes in our state. Let's take a look at what we'd need to do.

```diff
<!--@include: ./-snippets/manual-state.diff-->
```

To fix our program, we need to think about it in terms of state:

1. When we originally outputted the contact card to the DOM, we
   needed to notice that the code that updated the DOM _depends
   on_ the `person` object, which can change.
2. Whenever we update the `person` object, we need to run the
   code that updates the DOM again.

**This is a lot of work!** We need to manually track which parts
of our program depend on which parts of our state, and we need to
manually run the code that updates the DOM whenever the state
changes.

Not only is it a lot of work, it's easy to get wrong.

If we forget to update the DOM when the state changes, our
program will be wrong. If we forget to notice that the DOM update
code depends on the state, our program will be wrong. And if the
`display` function starts depending on more state, we have to
change all of the code that updates the **new state** to also
update the DOM. 😵‍💫😵‍💫😵‍💫

You can see how this is already much more complicated than our
simple data-oriented model from earlier. And it's only going to
get worse as our program gets more complicated.

## Starbeam Reactivity to the Rescue

Starbeam reactivity is a way to write ==data-oriented programs
that automatically update their outputs==.

<details class="container deep-dive">
  <summary><span>Deep Dive</span> Compared to Web Frameworks</summary>

In the modern era, web frameworks like React, Vue and Svelte have
solved this problem by providing a way to use framework-specific
reactive values in a template or JSX.

Starbeam reactivity differs from these solutions in several ways.

- Starbeam reactivity is universal. It doesn't **replace** your
  JavaScript framework. It works with your framework (or
  frameworks) of choice.
- Starbeam reactivity is

</details>

To convert our program into a reactive program, the first thing
we need to do is to convert our data structures into reactive
data structures.

![#reactive-object](./-snippets/state-into-inputs.ts)

Critically, ==we didn't need to change the `display` function at
all==. It still takes a `person` object as an input and produces
HTML as an output.

## Reactive Outputs

Reactive **inputs** are data structures that behave like normal
JavaScript values that know when they've changed.

But how do we make something **happen** when a reactive input
changes?

The answer is reactive **outputs**. A reactive **output**
represents something stable (like a DOM node) that stays up to
date with the return value of a function that reads reactive
inputs.

The cool thing about adding reactive outputs to our program is
that they don't change the data flow that we saw way back when we
were talking about data-oriented programming.

```lifecycle {BT}
subgraph inputs [Reactive Inputs]
  subgraph person [Person]
    name[Name]
    location[Location]
    subgraph contact [Contact]
      home[Home]
      work[Work]
    end
  end
end
subgraph output [Reactive Output]
  contactCard(Contact Card)
end
subgraph functions [Functions]
  display(display)
  displayPhone(displayPhone)
end
output--calls-->display
display--reads-->name
display--reads-->location
display--reads-->contact
display--calls-->displayPhone
displayPhone--reads-->home
displayPhone--reads-->work
```

A **reactive** output is responsible for a piece of the "real
world" that it will keep up to date with the reactive value that
it represents. In web applications, this is usually a DOM node,
but it could also be a file on disk, a row in a database, or a
value in a spreadsheet.

## Rendering Reactive Values

So how does it actually work?

To keep things simple, we're going to use the ==debug renderer==,
which is a very simple renderer that calls a callback with the
value of the reactive value whenever it changes.

![#reactive-function](./-snippets/state-into-inputs.ts)

The `renderPerson` function takes a `person` object and an HTML
element, and renders the HTML representation of the person into
the element whenever the `person` updates.

To get this working, all we needed to do was convert our `person`
object into a reactive object, use the same functions we used
before to convert the `person` object into HTML, and then use the
debug renderer to render the HTML into the element and keep it up
to date.

Unlike the manual state example above, we didn't need to:

- Manually track which parts of our program depend on which parts
  of our state.
- Manually run the code that updates the DOM whenever the state
  changes.

And unlike many other reactive libraries, we didn't need to
change our program to use a special syntax or API to pipe
reactive values through computations. We just used the same
input/output functions we used when the `person` object wasn't
reactive and we were living in a functional world of unchanging
inputs and outputs.

<details class="container deep-dive">
  <summary><span>Deep Dive</span> Not "Effects"</summary>

Unlike a lot of other reactive programming libraries, Starbeam
reactivity uses the term "rendered output" instead of "effect".
This is because Starbeam reactivity emphasizes the data-oriented
nature of reactivity.

While it's true that you can think of updating a DOM node in
response to a change as an "effect", it's a lot clearer to think
of the whole app as a function that takes the current state and
produces a rendered output. Through this lens, the DOM update
"effect" is just an implementation detail of the way that the
output is produced.

</details>

## Framework Renderers

The debug renderer is a great way to understand Starbeam
reactivity, but in practice, you'd normally use a framework
renderer like the [Starbeam React renderer](/frameworks/react/)
or the [Starbeam Preact renderer](/frameworks/preact/).

This example uses `innerHTML` for simplicity, but the same basic
principles apply to any framework.

For example, when using the Starbeam React renderer, you'd render
the `person` object into a JSX element. React would take the JSX
element and render it into a DOM node, and the Starbeam renderer
would notify React whenever the `person` object changed.

![#react](./-snippets/react-state.tsx)

To get an idea for how Starbeam reactivity works in your
framework, check out the "Frameworks" tab in the navigation
above.

## There's So Much More to Explore

This is just a taste of what Starbeam reactivity can do. There's
so much more to explore, including:

- [Reactive Arrays](./collections.md), which let you use the same
  techniques to handle lists of reactive values, and have the
  same API as normal JavaScript arrays. (`@starbeam/js` also
  includes reactive versions of `Map`, `Set`, `WeakMap` and
  `WeakSet`, all of which have the same API as their normal
  JavaScript counterparts.)
- [Resources](./fundamentals/resources.md), which enhance
  reactive values with setup and cleanup logic, while still
  letting you use the simple input/output model on the data they
  produce.
- [Formulas](./optimization/formulas.md), which let you optimize
  your program by caching the results of expensive computations
  until the reactive values they depend on change.

And even more!

- ResourceList, which lets you map a reactive array of values
  into a (keyed) array of resources. Whenever a value is added or
  removed from the array, the corresponding resource is setup or
  cleaned up.
- FormulaList, which lets you map a reactive array of values into
  a keyed array of formulas. Whenever a value is added or removed
  from the array, the corresponding formula is added or removed
  from the cache.

## Key Takeaways

- Starbeam reactivity is a way to write programs as if they
  behaved like simple input/output functions, but can also handle
  state changes for us automatically.
- Starbeam reactivity is a property of the _data structures_ you
  use. You don't need to change your functions to pipe reactive
  values through computations. You just use normal functions that
  take inputs and produce outputs.
- Starbeam reactivity is universal. It doesn't **replace** your
  JavaScript framework. It works with your framework (or
  frameworks) of choice.
