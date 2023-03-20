import { expect } from "vitest";

// #region create-formula
import { Cell, Formula } from "@starbeam/universal";

const name = Cell("John");
const location = Cell("New York");

const description = Formula((): string => {
  return `${name.current} lives in ${location.current}`;
});
// #endregion

// #region use-the-same-way
expect(description()).toBe("John lives in New York");

name.set("John Doe");
expect(description()).toBe("John Doe lives in New York");

location.set("Los Angeles");
expect(description()).toBe("John Doe lives in Los Angeles");
// #endregion
