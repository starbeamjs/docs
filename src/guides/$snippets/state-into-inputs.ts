// #region dts
export function display(person: Person): string {
  return `
    <div class="contact">
      <h1>${person.name}</h1>
      <h2>${person.location}</h2>
      <ul>
        ${person.contact.map(displayPhone).join("")}
      </ul>
    </div>
  `;
}

function displayPhone(phone: Phone): string {
  return `
    <li>
      <span class="type">${phone.type}</span>
      <span class="number">${phone.number}</span>
    </li>
  `;
}

interface Person {
  name: string;
  location: string;
  contact: Phone[];
}

interface Phone {
  type: string;
  number: string;
}
// #endregion

// #region reactive-object
import { reactive } from "@starbeam/js";
import { DEBUG_RENDERER } from "@starbeam/universal";

const person = reactive.object({
  name: "John Doe",
  location: "New York",
  contact: [
    { type: "home", number: "555-1234" },
    { type: "work", number: "555-5678" },
  ],
});
// #endregion

// #region reactive-function

function renderPerson(person: Person, into: HTMLElement): void {
  DEBUG_RENDERER.render({
    render: () => display(person),
    debug: (html) => {
      into.innerHTML = html;
    },
  });
}

// #endregion
