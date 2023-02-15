import vars from "postcss-advanced-variables";
import functions from "postcss-functions";
import type { Config } from "postcss-load-config";
import values from "postcss-modules-values";
import nested from "postcss-nested";
import property from "postcss-property-lookup";
import * as sass from "postcss-scss";

export default {
  syntax: sass,
  plugins: [
    vars(),
    functions({ color }),
    values(),
    property(),
    nested(),
  ],
} satisfies Config;

export function color(
  h: string | number,
  s: string | number,
  l: "light" | "normal" | "dark"
): string {
  const sat = typeof s === "string" ? s : `${s}%`;

  return `hsl(${h}, ${sat}, var(--color-lightness-${l}))`;
}
