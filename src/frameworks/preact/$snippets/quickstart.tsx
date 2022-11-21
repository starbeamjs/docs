// #region app
import { createCell } from "@starbeam/preact";
import { render, type JSX } from "preact";

export function Counter(): JSX.Element {
  const counter = createCell(0);

  return (
    <div>
      <button onClick={() => counter.update((c) => c + 1)}>++</button>
      <p>{counter.current}</p>
    </div>
  );
}

render(<Counter />, document.querySelector("#root")!);
// #endregion
