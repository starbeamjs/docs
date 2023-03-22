// #region simple-function
import { Cell } from "@starbeam/universal";
const name = Cell("John");
const location = Cell("New York");
function description() {
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
    function description(name) {
        return `${name.current} lives in ${location.current}`;
    }
    // #endregion
    // #region use-cell-arguments-as-normal
    description(name); //=> "John lives in New York"
    name.set("John Doe");
    description(name); //=> "John Doe lives in New York"
    location.set("Los Angeles");
    description(name); //=> "John Doe lives in Los Angeles"
    // #endregion
}
