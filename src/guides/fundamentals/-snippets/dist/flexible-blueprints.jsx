// #endregion
// #region blueprint
import { Cell } from "@starbeam/universal";
// #highlight:next
function Counter(start) {
    const counter = Cell(0);
    return {
        get count() {
            return counter.current + Reactive.read(start);
        },
        increment() {
            counter.update((i) => Reactive.read(start) + i + 1);
        },
    };
}
// #endregion
{
    // #region component
    function CounterComponent({ start }) {
        // #highlight:next
        const counter = use(() => Counter(start), [start]);
        return useFormula(() => (<div>
        <h1>{counter.count}</h1>
        <button onClick={counter.increment}>Increment</button>
      </div>));
    }
    // #endregion
}
{
    // #region reactive-component
    function CounterComponent(props) {
        // #highlight:next
        const start = useReactive(props.start);
        // #highlight:next
        const counter = use(() => Counter(start));
        return useFormula(() => (<div>
        <h1>{counter.count}</h1>
        <button onClick={counter.increment}>Increment</button>
      </div>));
    }
    // #endregion
}
