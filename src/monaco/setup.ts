import { MONACO_WORKSPACE, Package } from "./store.js";

MONACO_WORKSPACE.add(
  Package.create("@starbeam/now", "0.5.0")
    .add("exports:main", "index.js", `export const now = 0;`)
    .add("exports:types", "index.d.ts", `export const now: number;`)
);

export const FILES = {
  index: MONACO_WORKSPACE.ts(
    "index.ts",
    `import { now } from "@starbeam/now";`
  ),
  tsconfig: MONACO_WORKSPACE.get("tsconfig.json"),

  now: MONACO_WORKSPACE.get({ module: "index.d.ts", in: "@starbeam/now" }),
};
