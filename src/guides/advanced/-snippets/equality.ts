// #region dts

declare class Expect<T> {
  toBe(value: T): void;
  not: Expect<T>;
}

declare function expect<T>(value: T): Expect<T>;

// #endregion

// #region equality
import { Cell } from "@starbeam/universal";

const person = { name: "John", age: 30 };

const cell = Cell(person, {
  equals: (a, b) => a.name === b.name && a.age === b.age,
});
// #endregion

// #region update-with-equivalent
cell.set({ name: "John", age: 30 });
expect(cell.current).toBe(person);
// #endregion

// #region update-with-non-equivalent
cell.set({ name: "John", age: 31 });
expect(cell.current).not.toBe(person);
// #endregion
