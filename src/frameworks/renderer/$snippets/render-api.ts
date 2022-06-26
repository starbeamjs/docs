import { Reactive } from "@starbeam/core";
import { Cell } from "@starbeam/core";
import { TIMELINE } from "@starbeam/core";

class VanillaComponent {}

const cell = Cell("Jonas");

// 1. Listen to a Reactive value
// 2. Produce its initial value
// 3. When the reactive value changes, schedule an update
// 4. Update the value

const TEXT_RENDERER = (
  parentNode: ParentNode,
  nextSibling?: Node
) =>
  Renderer<string>((string: Reactive<string>, renderer) => {
    const text = document.createTextNode(string.value);
    parentNode.insertBefore(text, nextSibling ?? null);

    renderer.on.update(() => {
      text.textContent = string.value;
    });

    return text;
  });

const element = document.createTextNode(cell.current);
