// #region dts

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

// #region react
import { reactive } from "@starbeam/js";
import { useReactive } from "@starbeam/react";

// this is what we did before
const person = reactive.object({
  name: "John Doe",
  location: "New York",
  contact: [
    { type: "home", number: "555-1234" },
    { type: "work", number: "555-5678" },
  ],
});

export function PersonComponent({ person }: { person: Person }) {
  // In React, the `useReactive` hook is what makes a
  // React component a Starbeam renderer.
  // #highlight:next
  return useReactive(() => (
    <div className="contact">
      <h1>${person.name}</h1>
      <h2>${person.location}</h2>
      <ul>
        {person.contact.map((p) => (
          <Phone phone={p} />
        ))}
      </ul>
    </div>
  ));
}

function Phone({ phone }: { phone: Phone }) {
  // #highlight:next
  return useReactive(() => (
    <li>
      <span className="type">${phone.type}</span>
      <span className="number">${phone.number}</span>
    </li>
  ));
}

// #endregion
