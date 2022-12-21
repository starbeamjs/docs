import { Component } from "@starbeam/react";
import "./Counter.css";

export function Counter({ data }: { data: CounterData }): JSX.Element {
  return Component(data, () => {
    return (data: CounterData) => {
      return (
        <div className="counter">
          <h3 className="count1">{data.name}</h3>
          <button onClick={data.increment}>increment</button>
          <button onClick={data.reset}>reset</button>
        </div>
      );
    };
  });
}

export interface CounterData {
  name: string;
  count: number;
  increment: () => void;
  reset: () => void;
}
