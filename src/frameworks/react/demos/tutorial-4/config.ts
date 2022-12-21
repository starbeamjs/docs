export const files = import.meta.glob(["./index.html", "./src/**"], {
  eager: true,
  as: "raw",
});

export const dependencies = [
  "react",
  "react-dom",
  "@starbeam/react",
  "@starbeam/universal",
  "@starbeam/timeline",
];

export const jsx = "react";

export const activeFile = "src/components/Counter.tsx";
