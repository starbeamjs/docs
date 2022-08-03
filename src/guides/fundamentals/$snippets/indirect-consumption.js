"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #region indirect-consumption
const js_1 = __importDefault(require("@starbeam/js"));
class People {
    // #highlight:next
    #people = js_1.default.array([]);
    push(person) {
        this.#people.push(person);
    }
    [Symbol.iterator]() {
        return this.#people[Symbol.iterator]();
    }
    byLocation(location) {
        return this.#people.filter((person) => person.location === location);
    }
}
const people = new People();
// #endregion
// #region rendering-indirect-consumption
const core_1 = require("@starbeam/core");
core_1.DEBUG_RENDERER.render({
    // #highlight:next
    render: () => people.byLocation("New York"),
    debug: (people) => {
        console.log(people.map((person) => person.name).join(", "));
    },
});
// #endregion
// #region adding-people
people.push({ name: "John", location: "New York" });
people.push({ name: "Jane", location: "New York" });
people.push({ name: "Joe", location: "London" });
// #endregion
