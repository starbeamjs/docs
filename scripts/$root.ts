/// <reference path="./node_modules/ohmyfetch/dist/index.d.ts" />

import { resolve } from "path";
import dirname from "tiny-dirname";

export const ROOT = resolve(dirname(import.meta.url), "..");
export const DIST = resolve(ROOT, ".vitepress", "dist");
