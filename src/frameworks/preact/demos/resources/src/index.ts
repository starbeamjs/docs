import { setup } from "@starbeam/preact";
import { h, options, render } from "preact";
import { Clock } from "./App";

setup(options);

render(h(Clock, {}), document.querySelector("#root")!);
