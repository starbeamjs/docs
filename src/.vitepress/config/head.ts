import { HeadConfig } from "vitepress";
import { Config } from "./types.js";

export const HEAD: Config["head"] = [
  font("Readex Pro", { weight: "160..700" }),
  font("Baloo 2", { weight: "400..800" }),
  font("Expletus Sans", { weight: "400..700" }),
  font("Azeret Mono", { weight: "100..900" }),
  font("Comfortaa", { weight: "400..700" }),
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
