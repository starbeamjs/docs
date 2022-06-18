// #region render-cell
import { Cell, TIMELINE } from "@starbeam/core";

const name = Cell("John");
const element = document.querySelector(
  "#output"
) as HTMLDivElement;

TIMELINE.render(name, () => {
  element.innerText = name.current;
});
// #endregion
