/// <reference path="./node_modules/ohmyfetch/dist/index.d.ts" />

import * as fs from "fs/promises";
import { $fetch } from "ohmyfetch";
import { resolve } from "path";
import shell from "shelljs";

import type ContributorsJSON from "../src/contributors.json";
import type { contributors as Contributors } from "../src/contributors.json";

import { ROOT } from "./$root.js";

const avatars = resolve(ROOT, "public/avatars");
const contributors = await loadJSON();

await fetchAvatars();

async function download(url: string, fileName: string) {
  const image = await $fetch(url, { responseType: "arrayBuffer" });
  return fs.writeFile(fileName, Buffer.from(image));
}

async function fetchAvatars() {
  await shell.mkdir("-p", avatars);

  await Promise.all(
    contributors.map(async ({ github }) =>
      download(
        `https://github.com/${github}.png?size100`,
        resolve(avatars, `${github}.png`)
      )
    )
  );
}

async function loadJSON(): Promise<typeof Contributors> {
  const json = JSON.parse(
    await fs.readFile(resolve(ROOT, "src/contributors.json"), {
      encoding: "utf-8",
    })
  ) as typeof ContributorsJSON;

  return json.contributors;
}
