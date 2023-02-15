// #region indirect-consumption
import { reactive } from "@starbeam/js";
class People {
    // #highlight:next
    #people = reactive.array([]);
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
import { DEBUG_RENDERER } from "@starbeam/universal";
DEBUG_RENDERER.render({
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
