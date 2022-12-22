import { Cell, Resource } from "@starbeam/universal";

// #region clock
export const Clock = Resource(({ on }) => {
  const now = Cell(new Date());
  const interval = setInterval(() => {
    now.set(new Date());
  });

  on.cleanup(() => clearInterval(interval));

  return {
    get display() {
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      return formatter.format(now.current);
    },
  };
});
// #endregion
