export const files = import.meta.glob(["./index.html", "./src/**"], {
  eager: true,
  as: "raw",
});

export const dependencies = [
  "@starbeam/js",
  "@starbeam/universal",
  "@starbeam/timeline",
];
