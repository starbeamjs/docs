// #region dts
declare module "@starbeam/react" {
  function useReactiveSetup<T>(
    callback: (setup: import("@starbeam/react").ReactiveElement) => () => T,
    description?: string | import("@starbeam/debug").Description
  ): T;
  function useReactiveSetup<T>(
    callback: (
      setup: import("@starbeam/react").ReactiveElement
    ) => import("@starbeam/universal").Reactive<T>,
    description?: string | import("@starbeam/debug").Description
  ): T;
}
// #endregion

// #region app
import { useReactive, useSetup } from "@starbeam/react";
import { Cell } from "@starbeam/universal";
import { createRoot } from "react-dom/client";

export function Counter() {
  const counter = useSetup(() => Cell(0));

  return useReactive(() => (
    <div>
      <button onClick={() => counter.update((c) => c + 1)}>++</button>
      <p>{counter.current}</p>
    </div>
  ));
}

createRoot(document.querySelector("#root")!).render(<Counter />);
// #endregion
