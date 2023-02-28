// #region dts
declare function use<T>(blueprint: Blueprint<T>): T;
declare function use<T>(
  blueprint: (() => Blueprint<T>) | (() => T),
  dependencies: unknown[]
): T;

declare function useFormula<T>(render: () => T): T;
declare function useReactive<T>(render: T): Reactive<T>;

type IntoReactive<T> = T | Reactive<T>;

interface Reactive<T> {
  readonly current: T;
  read(caller?: Stack): T;
}

declare const Reactive: {
  read<T>(this: void, reactive: IntoReactive<T>): T;
  from<T>(this: void, reactive: IntoReactive<T>): Reactive<T>;
};

interface Blueprint<T> {
  (): T;
}
import type { Stack } from "@starbeam/interfaces";
import { Cell } from "@starbeam/universal";
// #endregion

{
  // #region blueprint

  class Counter {
    #counter = Cell(0);

    get count() {
      return this.#counter.current;
    }

    increment = () => {
      this.#counter.set(this.#counter.current + 1);
    };
  }
  // #endregion
}

// #region with-params
class Counter {
  #counter = Cell(0);
  #start: Reactive<number>;

  // #highlight:next
  constructor(start: IntoReactive<number> = 0) {
    this.#start = Reactive.from(start);
  }

  get count() {
    return this.#counter.current;
  }

  increment = () => {
    this.#counter.update((i) => this.#start.current + i + 1);
  };
}
// #endregion

{
  // #region component
  function CounterComponent({ start }: { start: number }) {
    // #highlight:next
    const counter = use(() => new Counter(start), [start]);

    return useFormula(() => (
      <div>
        <h1>{counter.count}</h1>
        <button onClick={counter.increment}>Increment</button>
      </div>
    ));
  }
  // #endregion
}

{
  // #region reactive-component
  function CounterComponent(props: { start: number }) {
    // #highlight:next
    const start = useReactive(props.start);

    // #highlight:next
    const counter = use(() => new Counter(start));

    return useFormula(() => (
      <div>
        <h1>{counter.count}</h1>
        <button onClick={counter.increment}>Increment</button>
      </div>
    ));
  }
  // #endregion
}
