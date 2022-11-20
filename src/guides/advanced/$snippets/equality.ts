import { expect } from "vitest";

// #region equality
import { Cell } from "@starbeam/universal";

const person = { name: "John", age: 30 };

const cell = Cell(person, {
  equals: (a, b) => a.name === b.name && a.age === b.age,
});
// #endregion equality

// #region update-with-equivalent
cell.set({ name: "John", age: 30 });
expect(cell.current).toBe(person);
// #endregion update-with-equivalent

// #region update-with-non-equivalent
cell.set({ name: "John", age: 31 });
expect(cell.current).not.toBe(person);
// #endregion update-with-non-equivalent
