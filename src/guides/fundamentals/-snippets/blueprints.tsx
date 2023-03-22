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
// #endregion

// #region blueprint
import { Cell } from "@starbeam/universal";

// #highlight:next
function Counter() {
  const counter = Cell(0);

  return {
    get count() {
      return counter.current;
    },

    increment() {
      counter.set(counter.current + 1);
    },
  };
}
// #endregion

// #region component
export default function CounterComponent() {
  const counter = use(Counter);

  return useFormula(() => (
    <div>
      <h1>{counter.count}</h1>
      <button onClick={counter.increment}>Increment</button>
    </div>
  ));
}
// #endregion
