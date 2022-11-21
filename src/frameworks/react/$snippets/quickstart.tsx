// #region app
import { useCell, useReactive } from "@starbeam/react";
import { createRoot } from "react-dom/client";

export function Counter() {
  const counter = useCell(0);

  return useReactive(() => (
    <div>
      <button onClick={() => counter.update((c) => c + 1)}>++</button>
      <p>{counter.current}</p>
    </div>
  ));
}

createRoot(document.querySelector("#root")!).render(<Counter />);
// #endregion
