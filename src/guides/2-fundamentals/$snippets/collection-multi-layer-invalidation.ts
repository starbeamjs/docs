// #region array-dependency
import reactive from "@starbeam/js";

const people = reactive.array([
  { name: "John", location: "New York" },
  { name: "Jane", location: "Paris" },
  { name: "Bob", location: "London" },
  { name: "Tom", location: "New York" },
]);

function newYorkers() {
  return people.filter(
    (person) => person.location === "New York"
  );
}
// #endregion

// #region layers
interface Person {
  name: string;
  location: string;
}

function commaSeparated(list: Person[]) {
  return list.map((person) => person.name).join(",");
}

function newYorkersString() {
  return commaSeparated(newYorkers());
}
// #endregion
