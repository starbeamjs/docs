import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vars from "postcss-advanced-variables";
import functions from "postcss-functions";
import values from "postcss-modules-values";
import nested from "postcss-nested";
import property from "postcss-property-lookup";
import * as sass from "postcss-scss";
import { visualizer } from "rollup-plugin-visualizer";
import type { CSSOptions, UserConfig } from "vite";
import { color } from "./css-functions/color.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(__dirname, "../../..");

export const CSS: CSSOptions = {
  postcss: {
    syntax: sass,
    plugins: [vars(), functions({ color }), values(), property(), nested()],
  },
  devSourcemap: true,
};

export const VITE: UserConfig = {
  css: CSS,
  logLevel: "info",
  plugins: [],
  ssr: {},
  envDir: resolve(root, ".config", ".env"),
  envPrefix: "STARBEAM_",
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          emitFile: true,
          filename: "stats.html",
        }),
      ],
    },
  },
};
