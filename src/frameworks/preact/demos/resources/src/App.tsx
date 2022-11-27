import { use } from "@starbeam/preact";
import { Stopwatch } from "./stopwatch";

export const Clock = () => {
  const time = use(Stopwatch);

  return <div>{time ?? "now"}</div>;
};
