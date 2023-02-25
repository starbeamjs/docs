// @ts-check
/// <reference path="./fast-extract.d.ts" />

import chalk from "chalk";
import { Presets, SingleBar } from "cli-progress";
import { resolve } from "path";
import shell from "shelljs";
import wget from "wget-improved";

const __dirname = new URL(".", import.meta.url).pathname;
const root = resolve(__dirname, "..");

const force = process.argv[2] === "--force";

if (existsSync(resolve(root, "bin", "d2")) && !force) {
  console.debug(chalk.yellow("d2 binary is already downloaded."));
  process.exit(0);
}

const LATEST_D2_LINUX =
  "https://github.com/terrastruct/d2/releases/download/v0.2.1/d2-v0.2.1-linux-amd64.tar.gz";

shell.cd(root);
shell.mkdir("-p", "bin");
shell.cd(__dirname);
shell.mkdir("-p", "tmp");

const file = await new Promise((fulfill, reject) => {
  const output = resolve(__dirname, "tmp/d2.tar.gz");
  const download = wget.download(LATEST_D2_LINUX, output);

  const progress = new SingleBar(
    {
      format: "Downloading D2 | {bar} | {percentage}%",
    },
    Presets.shades_grey
  );
  progress.start(100, 0);

  download.on("end", () => {
    progress.stop();
    fulfill(output);
  });
  download.on("error", (err) => reject(err));
  download.on("progress", (update) => {
    progress.update(update * 100);
  });
});

import extract from "fast-extract";
import { existsSync } from "fs";

await extract(file, resolve(__dirname, "tmp/d2"), {
  type: "tar.gz",
  force: true,
  strip: 1,
});

shell.cd(__dirname);
shell.cp("tmp/d2/bin/d2", resolve("../bin/d2"));
shell.rm("-rf", "tmp");

process.exit(0);
