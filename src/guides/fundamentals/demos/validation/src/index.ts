import { reactive } from "@starbeam/js";
import { DEBUG_RENDERER } from "@starbeam/universal";

const button = document.querySelector("#add-people") as HTMLButtonElement;
const output = document.querySelector("#output") as HTMLUListElement;

interface Person {
  name: string;
  location: string;
}

class People {
  #people: Person[] = reactive.array([]);

  push(person: Person) {
    this.#people.push(person);
  }

  [Symbol.iterator]() {
    return this.#people[Symbol.iterator]();
  }

  byLocation(location: string) {
    return this.#people.filter((person) => person.location === location);
  }
}

const people = new People();

DEBUG_RENDERER.render({
  render: () => people.byLocation("New York"),
  debug: (people) => {
    output.innerHTML += `<li>${JSON.stringify(
      people.map((person) => person.name)
    )}</li>`;
  },
});

button.addEventListener("click", () => {
  people.push({ name: "John", location: "New York" });
  people.push({ name: "Jane", location: "New York" });
  people.push({ name: "Joe", location: "London" });
});
