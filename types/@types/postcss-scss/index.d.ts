import { Parser, Plugin, Stringifier } from "postcss";

interface Options {}

export default function (options?: Options): Plugin;

export const parse: Parser;
export const stringify: Stringifier;
