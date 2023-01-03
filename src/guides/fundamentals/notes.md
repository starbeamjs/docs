# Reactivity

Reactivity is a way of writing a program that looks like it runs once, and produces a result, but
actually runs over and over again, producing a new result each time.

What makes it reactive is that:

- It has well-defined inputs.
- It produces well-defined outputs.
- When the inputs change, the outputs change more efficiently than if you had to re-run the whole
  program.

Starbeam reactivity adds two more features:

- It's predictable: A given output will only update when the inputs that affect it change. This is a
  well-defined property of the system, and you can get a list of all the inputs that affect a given
  output using Starbeam's debugging tools.
- Lifetime and Containment: Starbeam reactivity allows you to define reactive objects that are
  destroyed when they are no longer needed, and to define reactive objects that are contained within
  other reactive objects. When an object that contains other reactive objects is destroyed, all of
  the contained objects are destroyed as well.

Starbeam's "resource" concept builds on predictable reactivity with lifetime and containment. A
resource is a reactive object that is destroyed when it is no longer needed, and which can contain
other reactive objects.

Resources are Starbeam's main alternative to "effects". Instead of thinking about setup and cleanup
as "side effects", you think about the data that you will need, and define the setup and cleanup as
part of the implementation of the data.
