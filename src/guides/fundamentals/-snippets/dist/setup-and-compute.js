import { expect } from "vitest";
// #region cells
import { Cell } from "@starbeam/universal";
// #highlight:start
// The `Cell` function is the setup function for the builtin
// `Cell` reactive object.
const counter = Cell(0);
// #highlight:end
// #highlight:start
// You call the `read()` function every time you want to compute
// the value of the cell.
expect(counter.read()).toBe(0);
// #highlight:end
// #highlight:start
// You call the setup function once, and then interact with the
// same reactive object over and over again.
counter.set(1);
// #highlight:end
// #highlight:next
expect(counter.read()).toBe(1);
// #endregion
