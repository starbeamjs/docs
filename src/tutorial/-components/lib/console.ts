import type { useSandpackConsole } from "sandpack-vue3";

export const ARRAY_LOG_METHODS = [
  "log",
  "warn",
  "info",
  "debug",
  "error",
] as const;
export type ArrayLogMethod = typeof ARRAY_LOG_METHODS[number];

export function isArrayLogMethod(method: string): method is ArrayLogMethod {
  return (ARRAY_LOG_METHODS as readonly string[]).includes(method);
}

export type ConsoleData = ReturnType<typeof useSandpackConsole>;
