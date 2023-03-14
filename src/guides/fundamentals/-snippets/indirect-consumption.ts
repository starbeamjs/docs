// #region indirect-consumption
import { reactive } from "@starbeam/js";

interface Person {
  name: string;
  location: string;
}

class People {
  // #highlight:next
  #people = reactive.array<Person>([]);

  push(person: Person): void {
    this.#people.push(person);
  }

  [Symbol.iterator](): IterableIterator<Person> {
    return this.#people[Symbol.iterator]();
  }

  byLocation(location: string): Person[] {
    return this.#people.filter(
      (person) => person.location === location
    );
  }
}

const people = new People();
// #endregion

// #region rendering-indirect-consumption
import { DEBUG_RENDERER } from "@starbeam/universal";

DEBUG_RENDERER.render({
  // #highlight:next
  render: () => people.byLocation("New York"),
  debug: (people) => {
    console.info(people.map((person) => person.name).join(", "));
  },
});
// #endregion

// #region adding-people
people.push({ name: "John", location: "New York" });
people.push({ name: "Jane", location: "New York" });
people.push({ name: "Joe", location: "London" });
// #endregion
