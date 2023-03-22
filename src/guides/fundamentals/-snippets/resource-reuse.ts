// #region dts
interface ResourceRun<T> {
  on: {
    cleanup: (callback: () => void) => void;
  };
  use<T>(resource: ResourceBlueprint<T>): Reactive<T>;
}

declare function Resource<T, U>(
  create: (run: ResourceRun<T>) => Reactive<U>
): ResourceBlueprint<U, undefined>;
// #endregion

import {
  Cell,
  Formula,
  Reactive,
  ResourceBlueprint,
} from "@starbeam/universal";

// #region now
const Now = Resource(({ on }) => {
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

// #region reuse
const Stopwatch = Resource(({ use }) => {
  const time = use(Now);
  //    ^?

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  return Formula(() => formatter.format(time.current));
});
// #endregion
