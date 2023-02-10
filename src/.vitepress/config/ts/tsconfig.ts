import { dirname } from "node:path";
import ts from "typescript";

import { FileDiagnostics } from "../shiki/ts.ts";

type JsonValue = string | number | boolean | JsonObject | JsonArray;

type JsonArray = JsonValue[];
interface JsonObject extends Record<string, JsonValue> {}

export function getTsconfig({
  tsconfig,
  errorsRelativeTo,
}: {
  tsconfig: string;
  errorsRelativeTo: string;
}): ts.ParsedCommandLine {
  const diag = FileDiagnostics.for({
    filename: tsconfig,
    errorsRelativeTo: errorsRelativeTo,
  });

  // Read tsconfig.json file
  const config = diag.do(
    () => ts.readConfigFile(tsconfig, ts.sys.readFile),
    "Failed to read tsconfig.json"
  ).config as JsonObject;

  // Resolve extends
  const parsedTsconfig = diag.do(
    () => ts.parseJsonConfigFileContent(config, ts.sys, dirname(tsconfig)),
    "failed to parse tsconfig.json"
  );

  return parsedTsconfig;
}
