import vars from "postcss-advanced-variables";
import functions from "postcss-functions";
import values from "postcss-modules-values";
import nested from "postcss-nested";
import property from "postcss-property-lookup";
import * as sass from "postcss-scss";
import type { CSSOptions, UserConfig } from "vite";
import { color } from "./css-functions/color.js";

export const CSS: CSSOptions = {
  postcss: {
    syntax: sass,
    plugins: [vars(), functions({ color }), values(), property(), nested()],
  },
  devSourcemap: true,
};

export const VITE: UserConfig = {
  css: CSS,
  optimizeDeps: {},
  plugins: [],
};
