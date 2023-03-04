function CounterData(label: string): CounterData {
  const counter = Cell(0);

  function increment() {
    counter.current++;
  }

  function reset() {
    counter.set(0);
  }

  return {
    label,

    get count() {
      return counter.current;
    },

    increment,
    reset,
  };
}

interface CounterData {
  readonly label: string;
  readonly count: number;

  readonly increment: () => void;
  readonly reset: () => void;
}

import { Component } from "@starbeam/react";
import { Cell } from "@starbeam/universal";
import "./Counter.css";

// #region counter
export function Counter(): JSX.Element {
  return Component(() => {
    // #highlight:start
    // In `Counter`'s setup function, we create two `CounterData`
    // objects. The rest of the component uses the methods exposed
    // by the `CounterData` objects to render the UI.
    const counters = {
      first: CounterData("first"),
      second: CounterData("second"),
    };
    // #highlight:end

    const total = () =>
      counters.first.count + counters.second.count;

    // #highlight:start
    // The render function uses methods on the `CounterData` objects,
    // which means that the render function will be called whenever
    // the `count` property of either `CounterData` object changes.
    return () => {
      // #highlight:end
      const { first, second } = counters;

      return (
        <>
          <pre>
            <span>{first.label}</span>
            {" + "}
            <span>{second.label}</span>
            {" = "}
            <span>total</span>
          </pre>
          <pre>
            <span>{first.count}</span>
            {" + "}
            <span>{second.count}</span>
            {" = "}
            <span>{total()}</span>
          </pre>
          <h3 className="count1">{first.label}</h3>
          <div className="buttons">
            <button onClick={first.increment}>increment</button>
            <button onClick={first.reset}>reset</button>
          </div>
          <h3 className="count2">{second.label}</h3>
          <div className="buttons">
            <button onClick={second.increment}>increment</button>
            <button onClick={second.reset}>reset</button>
          </div>
        </>
      );
    };
  });
}
// #endregion
