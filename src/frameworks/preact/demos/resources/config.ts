export const files = import.meta.glob(["./index.html", "./src/**"], {
  eager: true,
  as: "raw",
});

export const dependencies = [
  "preact",
  "preact-render-to-string",
  "@starbeam/preact",
  "@starbeam/universal",
  "@starbeam/timeline",
];

export const jsx = "preact";
