---
FormulaFn:
  kind: constructor-fn
  tag: optimization
  generics: ["T"]
  returns: ["FormulaFn", "A formula that returns the result of the given function"]
  params:
    fn: ["() => T", "A function that computes a value from other reactive values"]
    description: ["string?", "A description of the formula"]
  docs:
    A `FormulaFn` is a function that automatically caches the result of its computation until any of its reactive dependencies change.
  properties:
    current: [T, "The current value of the formula", readonly]
PolledFormulaFn:
  kind: constructor-fn
  tag: renderer
  generics: ["T"]
  returns: ["PolledFormulaFn", "A polled formula that returns the result of the given function"]
  params:
    fn: ["() => T", "A function that computes a value from other reactive values"]
    description: ["string?", "A description of the formula"]
  docs: |
    A `PolledFormulaFn` has an identical API signature to [FormulaFn](#constructor-fn-FormulaFn). However, when a `PolledFormulaFn`'s value is requested, it **always** recomputes the value. This is designed for situations where you are mixing Starbeam reactivity with other forms of reactivity.
  notes: |
    <details>
      <summary>Details: Using <code>PolledFormulaFn</code> in Renderers</summary>

      This allows a renderer to listen for changes to the formula's reactive dependencies, but still choose to recompute the formula's value when it has its own reason to believe that the formula is out of date. Most renderers use `PolledFormulaFn` as the primary mechanism for gluing Starbeam reactivity with their framework's rendering.

    </details>
  properties:
    current: [T, "The current value of the formula", readonly]

---

<Api />
