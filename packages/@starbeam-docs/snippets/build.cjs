const { readFile } = require("node:fs/promises");
const { addFile, compileModules } = require("vue-sfc2esm/lib/vue-sfc2esm.cjs.js");

/**
 * @param {string} file
 */
async function transpile(file) {
  const content = await readFile(file, "utf-8");
  addFile(file, content);
  const result = await compileModules(file);
}

async function main() {
  await transpile("./src/Code.vue");
}

main();
