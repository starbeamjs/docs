// #endregion
// #region blueprint
import { Cell } from "@starbeam/universal";
// #highlight:next
function Counter(start) {
    const counter = Cell(start);
    return {
        get count() {
            return counter.current + start;
        },
        increment() {
            counter.set(counter.current + start + 1);
        },
    };
}
// #endregion
// #region component
export default function CounterComponent({ start, }) {
    // #highlight:next
    const counter = use(() => Counter(start), [start]);
    return useFormula(() => (<div>
      <h1>{counter.count}</h1>
      <button onClick={counter.increment}>Increment</button>
    </div>));
}
// #endregion
