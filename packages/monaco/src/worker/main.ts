import { type VirtualTypeScriptEnvironment } from "@typescript/vfs";
import ts from "typescript";
import "./events.js";
import { post } from "./events.js";

let env: VirtualTypeScriptEnvironment;

post("ready", []);

console.debug("Hello from the worker");

export function updateFile(filePath: string, content: string) {
  env.updateFile(filePath, content);
}

export function autocompleteAtPosition(
  pos: number,
  filePath: string
) {
  let result = env.languageService.getCompletionsAtPosition(
    filePath,
    pos,
    {}
  );

  post("autocomplete-results", result);
}

export function infoAtPosition(pos: number, filePath: string) {
  let result = env.languageService.getQuickInfoAtPosition(
    filePath,
    pos
  );

  post(
    "tooltip-results",
    result
      ? {
          result,
          tootltipText:
            ts.displayPartsToString(result.displayParts) +
            (result.documentation?.length
              ? "\n" +
                ts.displayPartsToString(result.documentation)
              : ""),
        }
      : { result, tooltipText: "" }
  );
}
