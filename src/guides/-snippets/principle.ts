// #region dts
declare function render<T>(computation: () => T): T;

declare const reactive: <This, Value>(
  target: undefined,
  context: ClassFieldDecoratorContext<This, Value>
) => void;
// #endregion

// #region a
import { Cell, Reactive } from "@starbeam/universal";

// `Cell` is the most basic kind of reactive variable.
const person = Cell("Katie Gengler"); // [!code ann]
const affiliation = Cell("EmberObserver");

// `card` is a regular function.
function card(
  person: Reactive<string>,
  affiliation: Reactive<string>
) {
  return `${person.current} (${affiliation.current})`;
}

// The `render` function is a placeholder for the Starbeam
// renderer for your framework.
render(() => card(person, affiliation));
// #endregion

{
  // #region b
  class Person {
    #name: Cell<string>;
    #affiliation: Cell<string>;

    constructor(name: string, affiliation: string) {
      this.#name = Cell(name);
      this.#affiliation = Cell(affiliation);
    }

    get card(): string {
      return `${this.#name.current} (${
        this.#affiliation.current
      })`;
    }

    set name(name: string) {
      this.#name.set(name);
    }

    set affiliation(affiliation: string) {
      this.#affiliation.set(affiliation);
    }
  }

  const person = new Person("Katie Gengler", "EmberObserver");

  render(() => person.card);
  // #endregion
}

{
  // #region decorators
  class Person {
    @reactive #name: string;
    @reactive #affiliation: string;

    constructor(name: string, affiliation: string) {
      this.#name = name;
      this.#affiliation = affiliation;
    }

    get card(): string {
      return `${this.#name} (${this.#affiliation})`;
    }

    set name(name: string) {
      this.#name = name;
    }

    set affiliation(affiliation: string) {
      this.#affiliation = affiliation;
    }
  }

  const person = new Person("Katie Gengler", "EmberObserver");

  render(() => person.card);
  // #endregion
}
