import type { HeadConfig } from "vitepress";
import type { Head } from "./types.js";

export const HEAD: Head = [
  font("Readex Pro", { weight: "160..700" }),
  font("Azeret Mono", { weight: "100..900" }),
  font("Baloo 2", { weight: "400..800" }),
  font("Source Sans 3", { weight: "200..900", italic: true }),
  font("Sofia Sans", { weight: "100..900", italic: true }),
  font("Expletus Sans", { weight: "400..700" }),
  font("Martian Mono", { weight: "100..800" }),
  font("Overpass", { weight: "100..900" }),
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

function font(
  family: string,
  {
    weight,
    width,
    italic = false,
  }: { italic?: boolean; width?: string; weight: string }
): HeadConfig {
  const axes = [];
  const values = [];

  if (italic && width) {
    axes.push("ital", "wght", "width");
    values.push(`0,${weight},${width}`, `1,${weight},${width}`);
  } else if (italic) {
    axes.push("ital", "wght");
    values.push(`0,${weight}`, `1,${weight}`);
  } else {
    axes.push("wght");
    values.push(weight);
  }

  const safeFamily = family.replaceAll(" ", "+");
  const font = `family=${safeFamily}:${axes.join(",")}@${values.join(";")}`;

  return [
    "link",
    {
      rel: "stylesheet",
      href: `https://fonts.googleapis.com/css2?${font}&display=block`,
    },
  ];
}
