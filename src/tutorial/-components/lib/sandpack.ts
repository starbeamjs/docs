import {
  useSandpackConsole,
  type SandpackFile,
  type SandpackFiles,
  type SandpackInternalOptions,
  type SandpackSetup,
} from "sandpack-vue3";
import type { ConsoleItem } from "vue-console-feed";

export type DemoDeps = string[];

export function toSandpackOptions({
  activeFile,
  main,
}: {
  activeFile?: string | undefined;
  main?: string | undefined;
}): SandpackInternalOptions {
  return {
    activeFile: activeFile ?? main ?? "/src/index.ts",
    // bundlerURL: "http://localhost:3000/",
  };
}

export function toSandpackDeps({
  versions: packageJSON,
  dependencies,
  filename,
}: {
  versions: Record<string, string>;
  dependencies: string[];
  filename: string;
}): Record<string, string> {
  const deps = depsRecord(dependencies) ?? {};

  return Object.fromEntries(
    Object.entries(deps).map(([dep, depVersion]) => {
      return [
        dep,
        getVersion(dep, depVersion, packageJSON, filename),
      ];
    })
  );
}

function getVersion(
  dep: string,
  depVersion: string,
  packageJSON: Record<string, string>,
  filename: string
): string {
  if (depVersion === "package.json") {
    const version = packageJSON[dep];

    if (version === undefined) {
      throw Error(
        `Dependency ${dep} was specified in an example config (${filename}), but it was not found in package.json`
      );
    }

    return version;
  } else {
    return depVersion;
  }
}

export function babelJSX(jsx: string | undefined) {
  return jsx
    ? [
        "transform-react-jsx",
        {
          runtime: "automatic",
          importSource: jsx,
        },
      ]
    : ["transform-react-jsx"];
}

export function tsconfigJSX(jsx: string | undefined) {
  return jsx
    ? {
        jsx: "preserve",
        jsxImportSource: jsx,
      }
    : { jsx: "preserve" };
}

export function depsRecord(
  deps: DemoDeps
): SandpackSetup["dependencies"] {
  return Object.fromEntries(deps.map(toSandpackDep));
}

/**
 * A dependency is either:
 *
 * - a string without `@` (after the first char):
 *   - the string is the dependency name
 *   - the version is "latest"
 * - a string with `@` (after the first char):
 *   - the string until the first `@` is the dependency name
 *   - the string after the first `@` is the version
 */
export function toSandpackDep(
  dep: string
): [name: string, version: string] {
  if (dep.startsWith("@")) {
    const [name, version = "package.json"] = dep
      .slice(1)
      .split("@");
    return [`@${name}`, version];
  } else {
    // the previous branch checked for `@` as the first char, so we can be sure that
    // dep.split("@") produces two parts.
    const [name, version = "package.json"] = dep.split(
      "@",
      2
    ) as [string, string];

    return [name, version];
  }
}

export type DemoFiles = Record<string, string>;

export function toSandpackFiles(
  files: DemoFiles
): SandpackFiles {
  return Object.fromEntries(
    Object.entries(files).map(([path, code]) =>
      toSandpackFile(path, code)
    )
  );
}

/**
 * SandpackFile is:
 *
 * ```
 * {
 *  code: string;
 *  hidden?: boolean;
 *  active?: boolean;
 *  readOnly?: boolean;
 * }
 * ```
 *
 * The equivalent here is:
 *
 * ```
 * {
 *   "readonly src/index.ts": code,
 *   "readonly active src/index.ts": code,
 * }
 * ```
 */
export function toSandpackFile(
  file: string,
  code: string
): [filename: string, content: SandpackFile] {
  const parts = file.split(" ");

  let filename = parts.pop()?.replace(/^\.?\//g, "");

  if (!filename) {
    throw Error(`Invalid file name ${file}`);
  }

  const modifiers = new Set(parts);

  return [
    `/${filename}`,
    {
      code: stripDirectives(code),
      hidden: modifiers.has("hidden"),
      readOnly: modifiers.has("readonly"),
      active: modifiers.has("active"),
    },
  ];
}

function stripDirectives(code: string): string {
  return code
    .split("\n")
    .filter((line) => !isDirective(line))
    .join("\n");
}

function isDirective(line: string): boolean {
  return line.trim().startsWith("// #");
}

type LogEntry = InstanceType<typeof ConsoleItem>["$props"];

interface SandpackConsoleEntry {
  data: Array<string | Record<string, string>> | undefined;
  id: string;
  method: SandpackMessageConsoleMethods;
}

export const ARRAY_LOG_METHODS = [
  "log",
  "warn",
  "info",
  "debug",
  "error",
] as const;
export type ArrayLogMethod = typeof ARRAY_LOG_METHODS[number];

export function isArrayLogMethod(
  method: string
): method is ArrayLogMethod {
  return (ARRAY_LOG_METHODS as readonly string[]).includes(
    method
  );
}

export type ConsoleData = ReturnType<typeof useSandpackConsole>;
