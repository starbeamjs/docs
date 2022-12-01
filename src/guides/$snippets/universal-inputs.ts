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

// #region basics
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

// #region person
display({
  name: "John Doe",
  location: "New York",
  contact: [
    { type: "home", number: "555-1234" },
    { type: "work", number: "555-5678" },
  ],
});
// #endregion

// #region person2
display({
  name: "John Doe",
  location: "New York",
  contact: [
    { type: "home", number: "555-1234" },
    { type: "work", number: "555-5678" },
    { type: "sms", number: "555-9012" },
  ],
});
// #endregion

// #region person3
const person = {
  name: "John Doe",
  location: "New York",
  contact: [
    { type: "home", number: "555-1234" },
    { type: "work", number: "555-5678" },
  ],
};

document.body.innerHTML = display(person);

person.contact.push({ type: "sms", number: "555-9012" });
// #endregion

export {};
