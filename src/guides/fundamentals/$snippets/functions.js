"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region simple-function
const core_1 = require("@starbeam/core");
const name = (0, core_1.Cell)("John");
const location = (0, core_1.Cell)("New York");
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
