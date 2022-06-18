import { expect } from "vitest";

// #region create-formula
import { Cell, FormulaFn } from "@starbeam/core";

const name = Cell("John");

const describe = FormulaFn((location: string) => {
  return `${name.current} lives in ${location}`;
});

expect(describe("New York")).toBe("John lives in New York");
// #endregion create-formula

// #region use-the-same-way
expect(describe("New York")).toBe("John lives in New York");

name.set("John Doe");
expect(describe("New York")).toBe("John Doe lives in New York");

expect(describe("Los Angeles")).toBe("John Doe lives in Los Angeles");
// #endregion use-the-same-way

{
  // #region with-equals
  const describe = FormulaFn({
    fn: (location: { country: string }) => {
      return { card: `${name.current} lives in ${location.country}` };
    },
    equals: (a, b) => a.country === b.country,
  });

  const first = describe({ country: "New York" });
  expect(first.card).toBe("John lives in New York");

  const second = describe({ country: "New York" });
  expect(second.card).toBe("John lives in New York");
  expect(second).toBe(first);
  // #endregion with-equals
}
