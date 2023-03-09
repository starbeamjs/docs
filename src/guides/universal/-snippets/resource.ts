import type { ResourceRun } from "@starbeam/universal";
import {
  Cell,
  Formula,
  Reactive,
  Resource,
} from "@starbeam/universal";

// #region dts
type IntoReactive<T> = Reactive<T> | T;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare function read<T>(reactive: Reactive<T> | T): T;

// #endregion

// #region resource
export const timer = Resource(({ on }) => {
  const current = Cell(Date.now());

  const timer = setInterval(() => {
    current.current = Date.now();
  });

  on.cleanup(() => {
    clearInterval(timer);
  });

  return current;
});
// #endregion

// #region reactive-class
class Timer {
  readonly #current: Cell<number>;
  constructor({ on }: ResourceRun) {
    this.#current = Cell(Date.now());
    const timer = setInterval(() => {
      this.#current.current = Date.now();
    });
    on.cleanup(() => {
      clearInterval(timer);
    });
  }

  get current() {
    return this.#current.current;
  }
}

// #region formatted
export function formattedNow(locale: IntoReactive<string>) {
  return Resource(({ use }) => {
    const now = use(timer);

    return Formula(() => {
      const formatter = new Intl.DateTimeFormat(read(locale), {
        timeStyle: "long",
        dateStyle: "short",
      });

      return formatter.format(now.current);
    });
  });
}
// #endregion
