import { Cell } from "@starbeam/universal";

function Counter() {
  const counter = Cell(0);

  return {
    get current() {
      return counter.current;
    },

    increment() {
      counter.current++;
    },
  };
}
