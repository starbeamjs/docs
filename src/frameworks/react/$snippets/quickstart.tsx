// #region app
import { Cell } from "@starbeam/core";
import { useStarbeam } from "@starbeam/react";
import { createRoot } from "react-dom/client";

export function Counter() {
  // #highlight:next
  return useStarbeam(() => {
    const counter = Cell(0);

    return () => (
      <div>
        <button
          // #highlight:next
          onClick={() => counter.update((c) => c + 1)}
        >
          ++
        </button>
        // highlight:next
        <p>{counter.current}</p>
      </div>
    );
  });
}

createRoot(document.querySelector("#root")!).render(
  <Counter />
);
// #endregion
