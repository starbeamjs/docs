import { Plugin } from "postcss";

type Handle = "remove" | "ignore" | "warn" | "throw";

interface Options {
  name?: string;
  onFunctionalSelector?: Handle;
  onRecursiveExtend?: Handle;
  onUnusedExtend?: Handle;
}

export default function (options?: Options): Plugin;
