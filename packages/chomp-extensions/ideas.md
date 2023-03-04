# Ideas

## Extension Improvements

### Source File Location

- `ENV.CHOMP_EXTFILE`
- `ENV.CHOMP_EXTDIR`

### Extensions Importing Other Extensions

Avoids the need for a Chompfile that uses an extension to declare
transitive dependencies.

> The [source file location](#source-file-location) proposal
> above would allow an extension to declare other extensions
> relative to itself.
>
> An imported extension is available to tasks returned by the
> extension, but not to the file that included the extension.

<details>
  <summary>Out of scope: exported extensions</summary>

**Out of scope**: exported extensions. It might be useful to
support an extension exporting/declaring extensions, but that
opens up a can of worms: does the chompfile that uses an
extension that exports other extensions need to explicitly import
those names? Can the names be renamed? It's not a bad feature but
it's much more complex than letting an extension use extensions
in its own exported tasks that aren't visible to the chompfile
that uses the extension.

</details>

```ts
Chomp.registerTemplate("name", (task) => {
  const { root } = task.templateOptions;

  return {
    extensions: {
      // This example assumes the relative path reform described
      // below, and assumes that it would apply to extensions.
      //
      // That's not the only possible design, and it's orthogonal
      // to the question of whether this feature is a good idea.
      dts: "./dts.js",
      swc: "chomp@0.1:swc",
    },
    tasks: [
      {
        name: task.name,
        deps: [`js:${task.name}`, `dts:${task.name}`],
      }
      // In this example, these utility tasks would be exposed
      // to the `chomp list` command. The
      {
        name: `js:${task.name}`,
        template: "swc",
        target: `${root}/dist/##.js`,
        dep: `${root}/src/##.ts`,
      },
      {
        name: `dts:${task.name}`,
        template: "dts",
        templateOptions: {
          root,
        },
      },
    ],
  };
});
```

## Workspace Improvements

### Import chompfile.toml

_More generally: allowing Chompfiles to be "lexically scoped".
This same goal applies to the tasks returned by an extension._

```toml
[[task]]
import = "./packages/#/chompfile.toml"
```

> Original motivation: make monorepo watching work. "Shelling
> out" to another Chompfile doesn't quite work.

To import a module so it can be used as a dependency, but don't
expose its tasks in the task list:

```toml
[[task]]
import = [{ module = "./packages/#/chompfile.toml", hidden = true }]
```

Imported chompfile:

```toml
version = 0.1
name = "modulename"

[[task]]
# ...
```

Mechanics:

- All filenames in the imported chompfile will get rewritten to
  be relative to the file location.
- All tasks names will be prefixed with the package name.

Since imported modules are merged with the importer's chompfile,
the system has a holistic view of all source and target files.

> The current design uses `cwd` as the primary way to resolve
> relative paths. This change would make the chompfile the source
> for relative paths, and make it resiliant to the actual `cwd`
> of the running process.
>
> In the case of imported `chompfile`s, this is necessary because
> it's no longer possible to have a directory that describes
> relative resolution for all chompfiles.

## Execution Improvements

### Clean

Since the current model enumerates the targets, cleaning up prior
targets ought to be possible.

> This could also be an extension point for third-party
> extensions. For example, the `targets` returned by a registered
> task could be a function that takes a dep filename and returns
> a target filename.
>
> This may be a good thing to support regardless of whether the
> `clean` proposal is accepted.

```shell
$ chomp clean
# Cleaning up... done.
$ chomp clean --verbose
# Cleaning up...
# - packages/mdit/dist/index.js
# - packages/mdit/dist/index.d.ts
# - packages/mdit/dist/index.js.map
# - packages/mdit/dist/index.d.ts.map
```

### Verbose Operations

In verbose mode, list the operations that are performed.

> This could be an extension point for third-party extensions.
> For example, a "clean" extension could remove files, and could
> use this extension point to enumerate the files it is removing.

<details>
  <summary>Aside: Dry Run</summary>

This could also enable a "dry run" mode, which would list the
operations that would be performed, but would not actually
perform them. To allow this in the future, it might be a good
idea to make sure that the way that an extension reports its
operations isn't interleaved with direct execution of those
operations.

One possible approach could be: as an alternative to returning a
string for `run`, extensions could return an array of
`Operation`s.

Each `Operation` would have:

- an engine
- the command to run
- a description of the operation for logging purposes

For logging purposes, it might be useful for the operation
description to be structured, so the description could include
information about what source and target files it is operating
on.

If this proposal was implemented, we should start with a simple
description, and keep an eye out for use-cases that would benefit
from more structured information around the description.

</details>

## Template Improvements

### File Parameters

This would allow templates to get file contents in their
top-level, and not need to resort to readFileSync inside of the
node engine to get the contents.

```toml
template-options = {
  package.file = "./packages/file.json"
}
```

If the [previous section](#import-chompfiletoml) was also
accepted, then this approach has an added benefit: marking a
parameter as a file makes it possible to transparently rewrite it
to be relative to the file location.

## Path Improvements

### Mapping a Single Dep to Multiple Targets

Allow one interpolation in a single `dep` to be used in each
target.

Example:

```toml
dep = "src/##.ts"
targets = [
  dist/##.js
  dist/##.js.map
]
```

> In practice, a change to the `.js.map` file might always imply
> a change to the `.js` file, so it may not be necessary to
> include both targets. However, this may not actually be true,
> and it's definitely not true for `.d.ts` and `.d.ts.map`. More
> generally, I think the current model easily supports direct 1:N
> mappings (as opposed to N:M mappings, which are more tricky).
>
> If the [clean](#clean) proposal is accepted, then some way to
> document 1:N mappings is necessary to fully enumerate the
> outputs to clean.
>
> Also, while weird mappings are problematic in general, if
> you're just trying to document the behavior of an extension
> (i.e. an external tool), then more elaborate mappings might
> even be fine and good to support.

### Named interpolations

In addition to a single anonymous interpolation, allow multiple
named interpolations (possibly only `#` interpolations).

```toml
dep = "packages/#scope/#pkg/src/##.ts"
target = "packages/#scope/#pkg/dist/##.ts"
```

> If the
> [map to multiple targets](#mapping-a-single-dep-to-multiple-targets)
> proposal is adopted, then each named interpolation in `dep`
> should be available in each target.

### Interpolation scoping

```toml
dep."packages/#scope/#pkg/src/##.ts" = {
  scope = "@*"
}
target = "packages/#scope/#pkg/dist/##.ts"
```

### Unambiguous Path Prefix

When a pathname starts with `.`, it refers to a special path
variable:

- `.`: the dirname of the current chompfile
- `<workspace>`: the dirname of the chompfile that was executed
  (and not imported)

Optionally, a workspace chompfile could declare special prefixes
that are surrounded by `<` and `>` characters.

> `<` and `>` are used in shell redirects, and are essentially
> reserved characters in paths for that reason.

<details>
  <summary>Multiple Chompfile Example</summary>

```toml
# chompfile.toml

[env.prefixes]
# this is the default
<workspace> = "."
<packages> = "./packages"
```

```toml
# packages/mylib/chompfile.toml

import = [
  "<packages>/chompfile.shared.toml"
]
```

</details>

### Canonical Form (Elaboration)

### Mapping (speculative)

As an alternative syntax to `dep` and `target`.

```toml
map = {
  source."packages/#scope/#pkg/src/##.ts" = {
    scope = "@*"
  }
  target = "packages/#scope/#pkg/dist/##.ts"
}
```

## Chompfile Structure Improvements

### Task Name in Table as alternative to `[[]]`

```toml
[tasks."dts:mdit"]
template = "dts"
template-options = {
  root = "packages/@jsergo/mdit"
}
```

### Nest Template Config

```toml
[[task]]
name = "dts:mdit"
template.dts = { root = "packages/@jsergo/mdit" }
```

<details>
  <summary>Together</summary>

```toml
[tasks."dts:mdit"]
template.dts = {
  root = "packages/@jsergo/mdit"
}
```

</details>

## Model Improvements

### `invalidation: "digest"`

This is generally not what you want, but it may be useful when
you compile a transitive dependency, and that output hasn't
changed.

> Example: You have a task to generate `.d.ts` files, and then
> another task that bundles them into a single `.d.ts` file. You
> could make a lot of changes to the source `.ts` files without
> any changes to the `.d.ts` files, so it would be good to avoid
> re-bundling every time you change the `.ts` files.

## More Builtins

- Remove files and directories

## Node Engine Improvements

- Document the `node` engine environment
- Access to glob
