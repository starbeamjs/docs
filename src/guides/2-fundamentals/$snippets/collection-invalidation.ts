// #region array-dependency
import reactive from "@starbeam/js";

const people = reactive.array([
  { name: "John" },
  { name: "Jane" },
  { name: "Bob" },
]);

function list() {
  return people.map((person) => person.name).join(",");
}
// #endregion

// #region debug-renderer
import { DEBUG_RENDERER } from "@starbeam/core";

DEBUG_RENDERER.render({
  render: list,
  debug: (string) => {
    console.log(string);
  },
});
// #endregion

// #region invalidation
people.push({ name: "Tom" });
// #endregion
