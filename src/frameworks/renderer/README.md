---
dir:
  index: false
  text: Writing a Renderer
  collapsable: false
  link: true
title: Writing a Renderer
---

# Writing a Renderer

A Starbeam renderer has the following responsibilities:

1. Render reactive values into the output in a framework-appropriate way.
2. Provide a way to connect Starbeam _resources_ into the structured cleanup mechanism of the
   framework. This typically includes, at least, connecting Starbeam resources into the framework's
   components.
3. Provide a representation of the framework's application that represents the lifecycle of the
   application. This facilitates Starbeam _services_ (singleton resources instantiated once per
   application)
4. **(UI renderers)** Provide a way for users to connect Starbeam _modifiers_ to DOM elements
   rendered by the framework.
