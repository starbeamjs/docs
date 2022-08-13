// #region resource
import { Cell, Resource } from "@starbeam/core";

const Stopwatch = Resource((resource) => {
  const start = Cell(new Date());

  resource.on.setup(() => {
    const interval = setInterval(() => {
      start.set(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return () => start.current;
});
// #endregion

// #region react
import { useResource } from "@starbeam/react";

function TickingClock() {
  const now = useResource(() => Stopwatch);

  return <p>{now.toLocaleTimeString()}</p>;
}
// #endregion
