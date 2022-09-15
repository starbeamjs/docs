import "@typescript/lib-dom";

// #region stopwatch
import { Cell, Resource } from "@starbeam/core";

const Stopwatch = Resource((r) => {
  const time = Cell(new Date());

  r.on.setup(() => {
    const interval = setInterval(() => {
      time.set(new Date());
    });

    return () => clearInterval(interval);
  });

  return () => {
    const now = time.current;

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).format(now);
  };
});
// #endregion stopwatch

// #region component
import { useResource } from "@starbeam/react";

export const Clock = () => {
  // #highlight:next
  const time = useResource(() => Stopwatch);

  return <div>{time}</div>;
};
// #endregion app
