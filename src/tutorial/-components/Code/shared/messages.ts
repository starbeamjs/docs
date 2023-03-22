import ts from "typescript";
import type { CachedFsMap } from "../worker/ts/utils.js";

export interface CodeFile {
  readonly code: string;
  readonly path: string;
}

export interface Events {
  "cache-typescript-fsmap": {
    fsMap: CachedFsMap;
    version: string;
  };
  ready: [];
  "autocomplete-results":
    | ts.WithMetadata<ts.CompletionInfo>
    | undefined;
  "tooltip-results":
    | {
        result: ts.QuickInfo;
        tooltipText: string;
      }
    | undefined;
  "add-model": CodeFile;
  "add-lib": CodeFile;
}
