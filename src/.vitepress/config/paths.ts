import { resolve } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
export const root = resolve(__dirname, "../../..");
export const src = resolve(root, "src");
export const dotvitepress = resolve(root, ".vitepress");
