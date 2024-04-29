import { Cell, Formula, Resource } from "@starbeam/universal";

export const Stopwatch = Resource((r) => {
  const time = Cell(new Date());

  const interval = setInterval(() => {
    time.set(new Date());
  }, 1000);

  r.on.cleanup(() => {
    clearInterval(interval);
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
