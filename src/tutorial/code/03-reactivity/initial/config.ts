export const files = import.meta.glob(
  ["./index.html", "./src/**"],
  {
    eager: true,
    as: "raw",
  }
);

export const dependencies = [
  "@starbeam/universal",
  "@starbeam/timeline",
  "@starbeam/js",
];
