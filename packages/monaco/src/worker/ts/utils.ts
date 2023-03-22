import { createDefaultMapFromCDN } from "@typescript/vfs";
import ts from "typescript";
import { TS_VERSION } from "../../shared/version.js";
import {
  type DependencyFile,
  type DependencyFiles,
} from "../dependencies.js";
import {
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
} from "../enums.js";
import "../events.js";
import {
  getCompileOptions,
  processTypescriptCacheFromStorage,
} from "../utils.js";
import { InputFile } from "./input.js";

export type CachedFsMap = Map<string, string>;
export type TypeVersions = Record<string, { latest: string }>;

export type DependencyFileEntry = [
  name: string,
  contents: DependencyFile
];

export function parseCompilerOptions(
  tsconfig: InputFile | null
): ts.CompilerOptions {
  const parsedCompilerOptions = getCompileOptions(
    tsconfig?.parseJSON<ts.CompilerOptions>() ?? {}
  );

  return {
    ...parsedCompilerOptions,
    target: ScriptTarget.ESNext,
    module: ModuleKind.ESNext,
    moduleResolution: ModuleResolutionKind.NodeNext,
    lib: ["dom", "es5", "es6", "es2022"],
  };
}

export async function getCache(
  cache: CachedFsMap,
  compilerOptions: ts.CompilerOptions
): Promise<CachedFsMap> {
  /**
   * Process cache or get a fresh one
   */
  let fsMap = processTypescriptCacheFromStorage(cache);
  if (fsMap.size === 0) {
    fsMap = await createDefaultMapFromCDN(
      compilerOptions,
      TS_VERSION,
      false,
      ts
    );
  }

  return fsMap;
}

type RawDependencies = Record<string, string>;
type Dependencies = Map<string, string>;

/**
 * Get dependencies from package.json
 */
export function getDependencies(
  packageJSON: InputFile | null
): Dependencies {
  const dependenciesMap: Dependencies = new Map();

  const { dependencies, devDependencies } =
    getPackageJsonDeps(packageJSON);

  for (const [dep, version] of Object.entries(devDependencies)) {
    dependenciesMap.set(dep, version);
  }

  for (const [dep, version] of Object.entries(dependencies)) {
    // Avoid redundant requests
    if (!dependenciesMap.has(`@types/${dep}`)) {
      dependenciesMap.set(dep, version);
    }
  }

  return dependenciesMap;
}

function getPackageJsonDeps(file: InputFile | null) {
  if (file === null) {
    return { dependencies: {}, devDependencies: {} };
  }

  const { dependencies = {}, devDependencies = {} } =
    file.parseJSON<{
      dependencies?: RawDependencies;
      devDependencies?: RawDependencies;
    }>();

  return { dependencies, devDependencies };
}

export function typeNameForPackage(name: string) {
  if (name.startsWith("@")) {
    const normalized = name.slice(1).replace("/", "__");
    return `@types/${normalized}`;
  } else {
    return `@types/${name}`;
  }
}

export function packageHasTypes(
  packageName: string,
  files: DependencyFiles
) {
  return Object.keys(files).some(
    (key) =>
      key.startsWith("/" + packageName) && key.endsWith(".d.ts")
  );
}
