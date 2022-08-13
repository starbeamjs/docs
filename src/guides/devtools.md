# Developer Tools

We are actively working on browser developer tools for Starbeam.

Under the hood, these tools are built on top of the introspection APIs in [@starbeam/timeline].

At the moment, there are two reflection APIs that are fleshed out and ready to use:

1. `ReactiveProtocol.description`, which returns the description of a reactive value, based on the
   stack frame in which it was created and any user-specified information.
2. `ReactiveProtocol.debug`, which returns a pretty-printed list of the reactive value's dependencies.

[@starbeam/timeline]: ../api/timeline/protocol.md#interface-ReactiveProtocol
