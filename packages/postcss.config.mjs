// @ts-check

import extend from "postcss-extend-rule";
import vars from "postcss-simple-vars";
// import values from "postcss-modules-values";
// import "postcss";
import postcss, { Result } from "postcss";
import cssvars from "postcss-css-variables";
import mixins from "postcss-mixins";
import modules from "postcss-modules";
import nested from "postcss-nested";
import preset from "postcss-preset-env";
import property from "postcss-property-lookup";
import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, resolve } from "node:path";

const PRESET = preset({
  stage: 1,
  features: {
    "lab-function": true,
    "oklab-function": true,
    "color-functional-notation": true,
    "color-function": true,
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
        console.log({ filepath, json, out });
        const outdir = dirname(filepath);
        const outbase = basename(filepath, ".postcss");
        const outfile = resolve(outdir, `${outbase}.css.ts`);

        // Write the file to the source directory
        writeFileSync(outfile, `import "./${outbase}.css";\n${exports(json)}`);
      },
    }),
  ],
};

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
