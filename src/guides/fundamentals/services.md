# Services: Reactive Application State

Starbeam services let you describe your application state and expose methods for interacting with
your application state. Once you've written a service, your components can ask for it.

The first time a component asks for a service, it will be set up. After that, any time a component
asks for the same service, it will get the same instance.

When the entire application is unmounted, any services that were set up for the application are
automatically cleaned up.

If you have multiple application roots on a single page, each application root counts as its own
"application" and gets its own instance of the service.

:::💡

Every framework has its own concept of "application", but virtually all frameworks have the notion
of a root component that is rendered and can be unmounted.

A Starbeam _service_ is just a regular [resource](./resources.md) that is created once, and whose
"owner" is the application root.

This allows you to write services purely using Starbeam APIs, and use them in any framework with a
Starbeam renderer.

:::
