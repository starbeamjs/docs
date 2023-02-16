import { Cell, DEBUG_RENDERER } from "@starbeam/universal";

const person = Cell("Jonas");
const output = document.querySelector("#output")!;
const form = document.querySelector("form") as HTMLFormElement;

DEBUG_RENDERER.render({
  render: () => person.current,
  debug: (value) => {
    output.innerHTML += `${value}\n`;
  },
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { name } = getData<{ name: string }>(
    event.target as HTMLFormElement
  );

  person.current = name;
});

function getData<T>(form: HTMLFormElement): T {
  const data = new FormData(form);
  return Object.fromEntries(data) as T;
}
