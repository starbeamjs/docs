// #region describe-string
import { Cell } from "@starbeam/universal";
// #highlight:next
const person = Cell({ name: "John", age: 30 }, "person");
// #endregion
{
  // #region describe-with-equals
  const person = Cell(
    { name: "John", age: 30 },
    {
      equals: (a, b) => a.name === b.name && a.age === b.age,
      description: "person",
    }
  );
  // #endregion
}
