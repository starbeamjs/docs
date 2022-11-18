// #region resource
import { Cell, Resource } from "@starbeam/universal";

const Stopwatch = Resource(({ on }) => {
  const start = Cell(new Date());

  const interval = setInterval(() => {
    start.set(new Date());
  }, 1000);

  on.cleanup(() => {
    clearInterval(interval);
  });

  return start;
}).initial(() => new Date());
// #endregion

// #region react
import { useReactive, useResource } from "@starbeam/react";

function TickingClock() {
  const now = useResource(() => Stopwatch, []);

  return useReactive(() => <p>{now.current.toLocaleTimeString()}</p>);
}
// #endregion
