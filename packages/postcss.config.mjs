// @ts-check

import extend from "postcss-extend-rule";
import vars from "postcss-simple-vars";
// import values from "postcss-modules-values";
// import "postcss";
import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, resolve } from "node:path";
import modules from "postcss-modules";
import nested from "postcss-nested";
import preset from "postcss-preset-env";
import property from "postcss-property-lookup";

const PRESET = preset({
  stage: 1,
  features: {
    "lab-function": true,
    "oklab-function": true,
    "color-functional-notation": true,
    "color-function": true,
    "cascade-layers": false,
  },
});

/**
 * @satisfies {import("postcss-load-config").Config}
 */
export default {
  plugins: [
    extend(),
    vars({}),
    property(),
    nested(),
    PRESET,
    modules({
      getJSON: (filepath, json, out) => {
        const outdir = dirname(filepath);
        const outbase = basename(filepath, ".postcss");
        const outfile = resolve(outdir, `${outbase}.css.ts`);

        // Write the file to the source directory
        writeFileSync(outfile, `${exports(json)}`);
      },
    }),
    /** @satisfies {import("postcss").Plugin} */
    ({
      postcssPlugin: "custom",

      prepare: (result) => {
        const filepath = result.opts.from;
        const outdir = dirname(filepath);
        const outbase = basename(filepath, ".postcss");
        const outfile = resolve(outdir, `${outbase}.css.ts`);

        return {
          OnceExit: (root, helper) => {
            const ts = readFileSync(outfile, "utf8");
            const combined = `${ts}\n${inject(String(root))}`;
            writeFileSync(outfile, combined);
          },
        };
      },
    }),
  ],
};

/**
 * @param {string} css
 * @returns {string}
 */
function inject(css) {
  return `
if (typeof document !== undefined) {
  const style = document.createElement('style');
  style.setAttribute("type", "text/css");
  const text = document.createTextNode(${JSON.stringify(css)});
  style.appendChild(text);
  document.head.appendChild(style);
}
`.trim();
}

/**
 * @param {Record<string, string>} json
 * @returns {string}
 */
function exports(json) {
  return Object.entries(json)
    .map(([key, value]) => `export const ${camelize(key)} = ${JSON.stringify(value)};`)
    .join("\n");
}

/**
 * @param {string} key
 * @returns {string}
 */
function camelize(key) {
  return key.replace(/[-]([a-z])/g, (g) => g[1].toUpperCase());
}
