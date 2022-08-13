import type { HeadConfig } from "vitepress";
import type { Config } from "./types.js";

export const HEAD: Config["head"] = [
  font("Readex Pro", { weight: "160..700" }),
  font("Baloo 2", { weight: "400..800" }),
  font("Expletus Sans", { weight: "400..700" }),
  font("Azeret Mono", { weight: "100..900" }),
  font("Comfortaa", { weight: "400..700" }),
  // https://microsoft.github.io/vscode-codicons/dist/codicon.ttf
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    },
  ],
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://microsoft.github.io/vscode-codicons/dist/codicon.css",
    },
  ],
];

function font(family: string, { weight }: { weight: string }): HeadConfig {
  return [
    "link",
    {
      rel: "stylesheet",
      href: `https://fonts.googleapis.com/css2?family=${family.replaceAll(
        " ",
        "+"
      )}:wght@${weight}&display=block`,
    },
  ];
}
