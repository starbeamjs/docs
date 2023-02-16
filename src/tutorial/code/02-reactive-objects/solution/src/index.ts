import { LIFETIME } from "@starbeam/timeline";
import { DEBUG_RENDERER } from "@starbeam/universal";
import { Stopwatch } from "./stopwatch";

const button = document.querySelector(
  "#finalize"
) as HTMLButtonElement;
const output = document.querySelector(
  "#output"
) as HTMLParagraphElement;

// Instantiate the Stopwatch with an owner. We will
// later finalize the owner to clean up the resource.
// In this case, that will clear the interval and
// stop the watch from ticking.
const owner = {};
const stopwatch = Stopwatch.create(owner);

// Render the stopwatch into the DOM. The `render`
// callback will be called whenever the stopwatch's
// value changes.
//
// In this case, that will happen whenever the `time`
// cell in the resource is set.
DEBUG_RENDERER.render({
  render: () => stopwatch.current,
  debug: (now) => {
    output.innerHTML = `The current time is: ${now}`;
  },
});

button.addEventListener("click", () => {
  LIFETIME.finalize(owner);
});
