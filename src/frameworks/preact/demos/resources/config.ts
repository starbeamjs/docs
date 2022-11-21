export const files = import.meta.glob(["./index.html", "./src/**"], {
  eager: true,
  as: "raw",
});

export const dependencies = [
  "preact",
  "@starbeam/preact",
  "@starbeam/universal",
  "@starbeam/timeline",
];
