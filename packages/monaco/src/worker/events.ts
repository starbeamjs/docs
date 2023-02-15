import { logOnServer } from "../shared/log.ts";
import type { Events } from "../shared/messages.ts";
import {
  autocompleteAtPosition,
  infoAtPosition,
  updateFile,
} from "./main.ts";
import { createTsSystemIfNeeded } from "./ts/index.ts";

const doCreateSystem = (payload: {
  files: Record<string, { code: string }>;
  entry: string;
  fsMapCached: Map<string, string>;
}) => {
  createTsSystemIfNeeded(
    payload.files,
    payload.entry,
    payload.fsMapCached
  );
};

addEventListener(
  "message",
  (event: MessageEvent<{ event: string; details: any }>) => {
    const {
      data: { event: name, details },
    } = event;

    logOnServer("in", name, details);

    switch (name) {
      case "create-system": {
        doCreateSystem(details);
        break;
      }
      case "updateText": {
        updateFile(details.filePath, details.content);
        break;
      }
      case "autocomplete-request": {
        autocompleteAtPosition(details.pos, details.filePath);
        break;
      }
      case "tooltip-request": {
        infoAtPosition(details.pos, details.filePath);
        break;
      }
    }
  }
);

addEventListener("messageerror", (e) => {
  console.error("messageerror", e);
});

export function post<K extends keyof Events>(
  event: K,
  details: Events[K]
) {
  logOnServer("out", event, details);
  postMessage({ event, details });
}
