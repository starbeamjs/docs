import { reactive } from "@starbeam/js";
import { Component } from "@starbeam/react";
import "./Counter.css";

export function Counter(): JSX.Element {
  return Component(() => {
    const counts = reactive.array([0, 0]);

    const total = () => counts[0] + counts[1];

    return () => {
      const [count1, count2] = counts;
      return (
        <>
          <pre>
            <span>count1</span>
            {" + "}
            <span>count2</span>
            {" = "}
            <span>total</span>
          </pre>
          <pre>
            <span>{count1}</span>
            {" + "}
            <span>{count2}</span>
            {" = "}
            <span>{total()}</span>
          </pre>
          <h3 className="count1">count1</h3>
          <div className="buttons">
            <button onClick={() => counts[0]++}>increment</button>
            <button
              onClick={() => {
                counts[0] = 0;
              }}
            >
              reset
            </button>
          </div>
          <h3 className="count2">count2</h3>
          <div className="buttons">
            <button onClick={() => counts[1]++}>increment</button>
            <button
              onClick={() => {
                counts[1] = 0;
              }}
            >
              reset
            </button>
          </div>
        </>
      );
    };
  });
}
