// #region dts
type IntoReactive<T> = T | Reactive<T>;

declare function read<T>(value: Reactive<T> | T): T;
// #endregion

// #region simple-function
import { Cell, Reactive } from "@starbeam/universal";

const name = Cell("John");
const location = Cell("New York");

function description(): string {
  return `${name.current} lives in ${location.current}`;
}
// #endregion

// #region use-as-normal
description();
// "John lives in New York"

name.set("John Doe");
description();
// "John Doe lives in New York"

location.set("Los Angeles");
description(); // "John Doe lives in Los Angeles"
// #endregion

// #ignore:next
{
  // #region cells-as-arguments
  function description(name: Reactive<string>): string {
    return `${name.current} lives in ${location.current}`;
  }
  // #endregion

  // #region use-cell-arguments-as-normal
  const name = Cell("John");
  const location = Cell("New York");

  description(name); //=> "John lives in New York"

  name.set("John Doe");
  description(name); //=> "John Doe lives in New York"

  location.set("Los Angeles");
  description(name); //=> "John Doe lives in Los Angeles"
  // #endregion
}

// #ignore:next
{
  // #region into-reactive
  function description(
    name: IntoReactive<string>,
    location: IntoReactive<string>
  ): string {
    return `${read(name)} lives in ${read(location)}`;
  }
  // #endregion

  // #region calling-into-reactive
  const name = Cell("John");
  const location = Cell("New York");

  description(name, "New York"); //=> "John lives in New York"
  description("John", location); //=> "John lives in New York"

  name.set("John Doe");
  description(name, location); //=> "John Doe lives in New York"

  location.set("Los Angeles");
  description(name, location); //=> "John Doe lives in Los Angeles"

  description("John", location); //=> "John lives in Los Angeles"
  // #endregion
}
