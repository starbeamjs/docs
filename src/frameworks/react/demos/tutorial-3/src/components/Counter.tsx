import { reactive } from "@starbeam/js";
import { Component } from "@starbeam/react";
import "./Counter.css";

// #region counter
export function Counter(): JSX.Element {
  return Component(() => {
    // #highlight:start
    const counters = reactive.object({
      first: 0,
      second: 0,
    });
    // #highlight:end

    const total = () => counters.first + counters.second;

    return () => {
      const { first, second } = counters;

      return (
        <>
          <pre>
            <span>first</span> + <span>second</span> = <span>total</span>
          </pre>
          <pre>
            <span>{first}</span> + <span>{second}</span> ={" "}
            <span>{total()}</span>
          </pre>
          <h3 className="count1">first</h3>
          <div className="buttons">
            <button onClick={() => counters.first++}>increment</button>
            <button onClick={() => (counters.first = 0)}>reset</button>
          </div>
          <h3 className="count2">second</h3>
          <div className="buttons">
            <button onClick={() => counters.second++}>increment</button>
            <button onClick={() => (counters.second = 0)}>reset</button>
          </div>
        </>
      );
    };
  });
}
// #endregion
