import { Component } from "@starbeam/react";
import { Cell } from "@starbeam/universal";

export function Counter(): JSX.Element {
  return Component(() => {
    const count = Cell(0);

    return () => (
      <>
        <p>{count.current}</p>
        <div className="buttons">
          <button onClick={() => count.current++}>
            increment
          </button>
          <button onClick={() => count.set(0)}>reset</button>
        </div>
      </>
    );
  });
}
