import type { CompilerOptions } from "typescript";
import { TS_VERSION } from "../shared/version.js";
import {
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
} from "./enums.js";
import type { CachedFsMap } from "./ts/system.js";
import type { DependencyFileEntry } from "./ts/utils.js";

/**
 * Process the TS compile options or default to
 */
export const getCompileOptions = (
  tsconfigFile: Record<string, any>
): CompilerOptions => {
  const defaultValue: CompilerOptions = {
    target: ScriptTarget.ES2021,
    module: ModuleKind.ES2020,
    lib: ["es2021", "es2020", "dom", "webworker"],
    esModuleInterop: true,
  };

  if (tsconfigFile["compilerOptions"]) {
    const { compilerOptions } = tsconfigFile;
    // Hard fixes
    if (compilerOptions.moduleResolution === "node") {
      compilerOptions.moduleResolution =
        ModuleResolutionKind.Node10;
    }

    return compilerOptions;
  }

  return defaultValue;
};

export const processTypescriptCacheFromStorage = (
  fsMapCached: CachedFsMap
): CachedFsMap => {
  const cache = new Map();
  console.log(fsMapCached.keys());

  const matching = new Map(
    [...fsMapCached].filter(([key]) =>
      key.startsWith(`ts-lib-${TS_VERSION}`)
    )
  );

  // const matchVersion = Array.from(fsMapCached.keys()).every(
  //   (file) => file.startsWith(`ts-lib-${ts.version}`)
  // );

  // if (!matchVersion) cache;

  for (const [key, value] of matching) {
    const cleanLibName = key.replace(
      `ts-lib-${TS_VERSION}-`,
      ""
    );
    cache.set(cleanLibName, value);
  }

  return cache;
};

export const isValidTypeModule = ([
  key,
  value,
]: DependencyFileEntry) =>
  key.endsWith(".d.ts") ||
  (key.endsWith("/package.json") && value?.module?.code);
