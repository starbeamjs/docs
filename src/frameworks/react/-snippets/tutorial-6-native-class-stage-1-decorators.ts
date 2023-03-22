import { reactive } from "@starbeam/js";

// #region nativeclass
export class CounterData {
  // Stage 1 decorators force us to use public fields here, which
  // makes `count` public (and mutable).
  @reactive count = 0;
  readonly label: string;

  constructor(label: string) {
    this.label = label;
  }

  increment = () => this.count++;
  reset = () => (this.count = 0);
} // #endregion
