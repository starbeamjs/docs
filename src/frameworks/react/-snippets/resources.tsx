import "@typescript/lib-dom";

// #region stopwatch
import { Cell, Formula, Resource } from "@starbeam/universal";

const Stopwatch = Resource(({ on }) => {
  const time = Cell(new Date());

  const interval = setInterval(() => {
    time.set(new Date());
  });

  on.cleanup(() => {
    return () => clearInterval(interval);
  });

  return Formula(() => {
    const now = time.current;

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).format(now);
  });
});
// #endregion

// #region component
import { useResource } from "@starbeam/react";

export const Clock = () => {
  // #highlight:next
  const time = useResource(() => Stopwatch, []);

  return <div>{time ?? "now"}</div>;
};
// #endregion
