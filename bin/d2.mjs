// @ts-check
import sh from "shell-escape-tag";
import { execaCommandSync } from "execa";
import { resolve } from "node:path";
import * as svgo from "svgo";

const __dirname = resolve(new URL(".", import.meta.url).pathname);

const allArgs = process.argv.slice(2);
const [filename, args] =
  allArgs.length === 0 || allArgs[0].startsWith("-")
    ? [undefined, allArgs]
    : [allArgs[0], allArgs.slice(1)];

const attrs = { filename, cwd: process.cwd() };
log(attrs);

const cmd =
  filename === undefined
    ? sh`${__dirname}/d2 ${args} -`
    : sh`${__dirname}/d2 ${resolve(process.cwd(), filename)} ${args}`;

log(`$ ${cmd}`);

const output = execaCommandSync(cmd, {
  encoding: "utf8",
  stdin: "inherit",
  stderr: "inherit",
  stdout: "pipe",
});

if (output.exitCode !== 0) {
  console.error("Error in d2. Exiting");
  process.exit(output.exitCode);
}

const replaced = output.stdout
  .replace(/\n@font[-]face [{]\n.*?(?![}])*[}]\n/gms, "\n")
  .replace(
    /(<style.*?><![[]CDATA[[])/gms,
    "$1\n@import url(https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=block);"
  )
  .replace(
    /^(?<spacing>\s*)font-family: "font-(?<font>[^"]*)";/gm,

    (_, spacing, font) => {
      const output = [`font-family: 'Source Sans 3'`];
      switch (font) {
        case "bold":
          output.push(`font-weight: bold`);
          break;
        case "italic":
          output.push(`font-style: italic`);
          break;
        case "regular":
          break;
      }

      return output.map((o) => `${spacing}${o};\n`).join("");
    }
  );

// const { data: optimized } = svgo.optimize(replaced, {
//   plugins: ["convertStyleToAttrs", "mergeStyles", "inlineStyles"],
// });

console.log(replaced);

/**
 * @param {unknown[]} values
 */
function log(...values) {
  if (process.env?.["NODE_DEBUG"]?.match(/\bd2\b/)) {
    console.error(...values);
  }
}
