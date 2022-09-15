import { Plugin } from "postcss";

interface Options {
  importFrom: ImportFrom;
}

type EnvDictionary = Record<string, string>;
type EnvFunction = () => EnvDictionary;
type EnvPath = string;
type ImportFrom = EnvDictionary | EnvFunction | EnvPath | ImportFrom[];

export default function (options?: Options): Plugin;
