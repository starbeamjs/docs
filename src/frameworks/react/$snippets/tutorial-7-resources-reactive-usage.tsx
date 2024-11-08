import { Component } from "@starbeam/react";
import { Cell, Resource } from "@starbeam/universal";
import "./Counter.css";

// #region usage
export function Counter() {
  return Component(({ use }) => {
    // #highlight:next
    const date = use(Clock);

    // #highlight:start
    function display() {
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      return formatter.format(date.current);
    }
    // #highlight:end

    // #highlight:next
    return () => <div>{display()}</div>;
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

  return now;
});
// #endregion
