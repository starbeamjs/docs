import glob from "fast-glob";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import sh from "shell-escape-tag";
import shell from "shelljs";
import yaml from "yaml";

const docs = await glob("src/api/**/$api/*.yml", {
  ignore: ["**/node_modules"],
});

for (const doc of docs) {
  const body = yaml.parse(await readFile(doc, "utf8"));

  const root = path.resolve(doc, "../..");
  const base = path.basename(doc, ".yml");
  const filename = path.join(root, `${base}.md`);
  const output = template(base, body.page);

  console.info("- writing", filename);

  await writeFile(filename, output);
}

/**
 * @param {string} base
 * @param {string} page
 */
function template(base, page) {
  return (
    [
      "---",
      "layout: doc",
      `<!-- @include: ./$api/${base}.yml -->`,
      "---",
      "",
      "<!-- generated file -->",
      page ? `<Api>\n\n${page}\n\n</Api>` : "<Api />",
    ]
      .filter((line) => line !== undefined)
      .join("\n") + "\n"
  );
}

shell;
sh;
glob;
