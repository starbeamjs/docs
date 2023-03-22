# Optimizing Expensive Computations

While the cost of maintaining a cache is usually higher than the
cost the computation, this is not always true.

For example, imagine that you wrote a function that takes a
reactive markdown string and some reactive parameters and renders
the markdown.

!(./-snippets/markdown.ts#render)

If you then render the markdown using a Starbeam renderer, the
output will be updated every time the reactive `text` or reactive
`linkify` changes.

This is great, but it might also run when the input **didn't**
change, or multiple times in response to input changes.

```md 💡
Again, most computations are so cheap that it would actually be
more expensive to attempt to cache them. But that's not true
here.
```

You can use to `Formula` API to make sure that the function only
runs once, and only when the reactive values it used in its
computation change.

!(./-snippets/markdown.ts#cached)

If you render the result of the `renderMarkdown` function with a
Starbeam renderer, the output will still update whenever the
reactive `text` or reactive `linkify` change, but the formula
will only run once in response to changes, no matter how many
times it's called.
