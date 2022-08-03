"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = void 0;
// #region reactive-class
const js_1 = require("@starbeam/js");
class People {
    // #highlight:next
    #people = js_1.reactive.array([]);
    add(name, location) {
        // #highlight:next
        this.#people.push({ name, location });
    }
    byLocation(location) {
        // #highlight:next
        return this.#people.filter((person) => person.location === location);
    }
    update(name, location) {
        // #highlight:next
        const index = this.#people.findIndex((person) => person.name === name);
        if (index !== -1) {
            // #highlight:next
            this.#people[index] = { name, location };
        }
    }
}
exports.People = People;
// #endregion
