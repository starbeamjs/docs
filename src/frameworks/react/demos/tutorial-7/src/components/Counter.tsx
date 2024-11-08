import { Component } from "@starbeam/react";
import { Clock } from "../lib/clock";
import "./Counter.css";

export function Counter(): JSX.Element {
  return Component(({ use }) => {
    const date = use(Clock);

    return () => <div>{date.current?.display}</div>;
  });
}
