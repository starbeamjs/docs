import { reactive } from "@starbeam/js";
import { Component } from "@starbeam/react";
import { Counter, type CounterData } from "./Counter";
import { Equation } from "./Equation";
import "./Sum.css";

// #region sum
export function Sum(): JSX.Element {
  return Component(() => {
    const counters = reactive.array([
      { count: 0, name: "first" },
      { count: 0, name: "second" },
    ]);

    function create(name = `counter ${counters.length}`) {
      counters.push({ count: 0, name });
    }

    function data(index: number): CounterData {
      return {
        name: counters[index].name,
        count: counters[index].count,
        increment: () => {
          const counter = counters[index];
          counters[index] = { ...counter, count: counter.count + 1 };
        },
        reset: () => {
          const counter = counters[index];
          counters[index] = { ...counter, count: 0 };
        },
      };
    }

    return () => (
      <>
        <Equation counters={counters} />
        <div className="counters">
          {counters.map((counter, i) => (
            <Counter key={counter.name} data={data(i)} />
          ))}
        </div>
        <h2>Create a new Counter</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget)) as {
              name: string;
            };
            create(data.name);
          }}
        >
          <input
            name="name"
            type="type"
            defaultValue=""
            placeholder="Counter name"
          />
          <button type="submit">Add</button>
        </form>
      </>
    );
  });
}
// #endregion
