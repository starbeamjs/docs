"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// #region creating
const core_1 = require("@starbeam/core");
const cell = (0, core_1.Cell)(0);
(0, vitest_1.expect)(cell.current).toBe(0);
// #endregion creating
// #region updating-with-set
cell.set(1);
(0, vitest_1.expect)(cell.current).toBe(1);
// #endregion updating-with-set
// #region updating-with-update
cell.update((prev) => prev + 1);
(0, vitest_1.expect)(cell.current).toBe(2);
// #endregion updating-with-update
// #region updating-by-reading
cell.set(cell.current + 1);
(0, vitest_1.expect)(cell.current).toBe(3);
// #endregion updating-by-reading
// #region updating-by-shorthand
cell.current++;
(0, vitest_1.expect)(cell.current).toBe(4);
// #endregion updating-by-shorthand
// #region freezing
cell.freeze();
cell.set(5);
// Runtime error: Cannot set a frozen cell.
// #endregion freezing
