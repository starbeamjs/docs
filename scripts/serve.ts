import { resolve } from "path";
import sh from "shell-escape-tag";
import shell from "shelljs";
import dirname from "tiny-dirname";

const root = resolve(dirname(import.meta.url), "..");
const docs = resolve(root, "docs");
const dist = resolve(docs, ".vitepress", "dist");
shell.config.verbose = true;
shell.mkdir("-p", dist);
shell.exec(sh`vitepress serve ${docs}`);
