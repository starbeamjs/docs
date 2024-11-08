import { Component } from "@starbeam/react";
import { Cell, Resource } from "@starbeam/universal";
import "./Counter.css";

// #region usage
export function Counter() {
  return Component(({ use }) => {
    const date = use(Clock);

    return () => <div>{date.current?.display}</div>;
  });
}
// #endregion

// #region clock
export const Clock = Resource(({ on }) => {
  const now = Cell(new Date());
  const interval = setInterval(() => {
    now.set(new Date());
  });

  on.cleanup(() => clearInterval(interval));

  return {
    get display() {
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      return formatter.format(now.current);
    },
  };
});
// #endregion
