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
    #start;
    // #highlight:next
    constructor(start = 0) {
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
    function CounterComponent({ start }) {
        // #highlight:next
        const counter = use(() => new Counter(start), [start]);
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
        const counter = use(() => new Counter(start));
        return useFormula(() => (<div>
        <h1>{counter.count}</h1>
        <button onClick={counter.increment}>Increment</button>
      </div>));
    }
    // #endregion
}
