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
    return useFormula(() => (<div>
      <h1>{counter.count}</h1>
      <button onClick={counter.increment}>Increment</button>
    </div>));
}
// #endregion
