// #region dts
declare module "@starbeam/react" {
  function useReactiveSetup<T>(
    callback: (setup: import("@starbeam/react").ReactiveElement) => () => T,
    description?: string | import("@starbeam/debug").Description
  ): T;
  function useReactiveSetup<T>(
    callback: (
      setup: import("@starbeam/react").ReactiveElement
    ) => import("@starbeam/core").Reactive<T>,
    description?: string | import("@starbeam/debug").Description
  ): T;
}
// #endregion

// #region app
import { Cell } from "@starbeam/core";
import { useReactiveSetup } from "@starbeam/react";
import { createRoot } from "react-dom/client";

export function Counter() {
  // #highlight:next
  return useReactiveSetup(() => {
    const counter = Cell(0);

    return () => (
      <div>
        <button onClick={() => counter.update((c) => c + 1)}>++</button>
        <p>{counter.current}</p>
      </div>
    );
  });
}

createRoot(document.querySelector("#root")!).render(<Counter />);
// #endregion
