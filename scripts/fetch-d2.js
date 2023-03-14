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

const D2_VERSION = "0.2.2";

const BINS = resolve(root, "bin");
const D2_BINFILE = resolve(BINS, `d2`);
const D2_VERSIONFILE = resolve(BINS, `d2.version`);

const currentVersion = existsSync(D2_VERSIONFILE)
  ? readFileSync(D2_VERSIONFILE, "utf-8")
  : undefined;

if (D2_VERSION === currentVersion && existsSync(D2_BINFILE)) {
  console.info(chalk.green(`D2 version ${D2_VERSION} is already installed.`));
  process.exit(0);
} else {
  console.info(chalk.yellow(`Installing D2 version ${D2_VERSION}...`));
}

const LATEST_D2_LINUX = `https://github.com/terrastruct/d2/releases/download/v${D2_VERSION}/d2-v${D2_VERSION}-linux-amd64.tar.gz`;

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
import { existsSync, readFileSync, writeFileSync } from "fs";

await extract(file, resolve(__dirname, "tmp/d2"), {
  type: "tar.gz",
  force: true,
  strip: 1,
});

shell.cd(__dirname);
shell.cp("tmp/d2/bin/d2", D2_BINFILE);
writeFileSync(D2_VERSIONFILE, D2_VERSION);
shell.rm("-rf", "tmp");

process.exit(0);
