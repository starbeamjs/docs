import { expect } from "vitest";

// #region creating
import { Cell } from "@starbeam/universal";

const cell = Cell(0);
expect(cell.current).toBe(0);
// #endregion

// #region updating-with-set
cell.current = 1;
expect(cell.current).toBe(1);
// #endregion

// #region updating-in-place
cell.current++;
expect(cell.current).toBe(2);

cell.current += 1;
expect(cell.current).toBe(3);

cell.current *= 2;
expect(cell.current).toBe(6);
// #endregion

{
  // #region question-equals
  const cell = Cell(undefined as undefined | number);
  expect(cell.current).toBe(undefined);

  cell.current ??= 1;
  expect(cell.current).toBe(1);

  cell.current ??= 2;
  expect(cell.current).toBe(1);
  // #endregion
}

// #region updating-with-update
cell.update((prev) => prev + 1);
expect(cell.current).toBe(3);
// #endregion

// #region updating-by-reading
cell.set(cell.current + 1);
expect(cell.current).toBe(3);
// #endregion

// #region updating-by-shorthand
cell.current++;
expect(cell.current).toBe(4);
// #endregion

// #region freezing
cell.freeze();

cell.set(5);
// Runtime error: Cannot set a frozen cell.
// #endregion
