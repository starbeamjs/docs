// #region reactive-class
import { reactive } from "@starbeam/js";

export class People {
  // #highlight:next
  #people: Person[] = reactive.array([]);

  add(name: string, location: string) {
    // #highlight:next
    this.#people.push({ name, location });
  }

  byLocation(location: string) {
    // #highlight:next
    return this.#people.filter(
      (person) => person.location === location
    );
  }

  update(name: string, location: string) {
    // #highlight:next
    const index = this.#people.findIndex(
      (person) => person.name === name
    );

    if (index !== -1) {
      // #highlight:next
      this.#people[index] = { name, location };
    }
  }
}

interface Person {
  name: string;
  location: string;
}
// #endregion
