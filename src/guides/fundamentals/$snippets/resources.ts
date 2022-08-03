import "@typescript/lib-dom";

// #region stopwatch
import { Cell, Resource } from "@starbeam/core";

const Stopwatch = Resource((r) => {
  const time = Cell(new Date());

  r.on.setup(() => {
    const interval = setInterval(() => {
      time.set(new Date());
    });

    // #highlight:next
    return () => clearInterval(interval);
  });

  // #highlight:next
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
