import { Plugin } from "postcss";

interface Options {
  unresolved?: "throw" | "warn" | "ignore";
  disable?: string;
}

export default function (options?: Options): Plugin;
