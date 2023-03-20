// #region time
import { Cell, Resource } from "@starbeam/universal";

export const Now = Resource(({ on }) => {
  const now = Cell(Date.now());

  const timer = setInterval(() => {
    now.set(Date.now());
  });

  on.cleanup(() => {
    clearInterval(timer);
  });

  return now;
});
// #endregion
