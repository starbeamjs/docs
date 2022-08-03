"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region describe-string
const core_1 = require("@starbeam/core");
// #highlight:next
const person = (0, core_1.Cell)({ name: "John", age: 30 }, "person");
// #endregion describe-string
{
    // #region describe-with-equals
    const person = (0, core_1.Cell)({ name: "John", age: 30 }, {
        equals: (a, b) => a.name === b.name && a.age === b.age,
        description: "person",
    });
    // #endregion describe-with-equals
}
