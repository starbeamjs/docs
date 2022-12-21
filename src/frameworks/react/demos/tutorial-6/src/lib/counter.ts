// #region custom
import { Cell } from "@starbeam/universal";

interface CounterData {
  readonly label: string;
  readonly count: number;

  readonly increment: () => void;
  readonly reset: () => void;
}

// `CounterData` is a reactive constructor
// #highlight:start
export function CounterData(label: string): CounterData {
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
// #highlight:end
// #endregion
