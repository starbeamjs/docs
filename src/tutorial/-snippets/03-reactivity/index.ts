import { expect } from "vitest";

// #region object
import { reactive } from "@starbeam/js";

const person = reactive.object({
  name: "Sebastian",
  age: 30,
});

expect(person.name).toBe("Sebastian");
expect(person.age).toBe(30);
// #endregion

// #region array
const people = reactive.array([{ name: "Sebastian", age: 30 }]);

expect(people).toEqual({ name: "Sebastian", age: 30 });
expect([...people]).toEqual([{ name: "Sebastian", age: 30 }]);
// #endregion

// #region map
const dictionary = reactive.Map();
dictionary.set(
  "person",
  "n. a human being regarded as an individual"
);
dictionary.set(
  "place",
  "n. a particular position or point in space"
);

expect(Object.fromEntries(dictionary)).toEqual({
  person: "n. a human being regarded as an individual",
  place: "n. a particular position or point in space",
});
expect(dictionary.size).toBe(2);
expect(dictionary.has("person")).toBe(true);
// #endregion

// #region set
const frameworks = reactive.Set();
frameworks.add("React");
frameworks.add("Vue");
frameworks.add("Ember");

expect([...frameworks]).toEqual(["React", "Vue", "Ember"]);
expect(frameworks.size).toBe(3);
expect(frameworks.has("React")).toBe(true);
// #endregion
