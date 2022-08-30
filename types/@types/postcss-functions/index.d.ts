import { Plugin } from "postcss";

type CssFunction = (...args: any[]) => unknown;

export default function <R extends Record<string, CssFunction>>(
  options?: R
): Plugin;
