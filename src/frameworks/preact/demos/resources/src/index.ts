import { h, render } from "preact";
import { Clock } from "./App";

render(h(Clock, {}), document.querySelector("#root")!);
