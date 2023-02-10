import { findUpSync } from "find-up";
import { dirname } from "node:path";
import type ts from "typescript";
import { getTsconfig } from "../ts/tsconfig.js";
import { root } from "../vite.js";

export class ShikiPackage {
  // basic approach taken from
  // https://github.com/AssemblyScript/assemblyscript/blob/1e2de99e43f0d2f61e6699d9c23093a1b753a000/scripts/build-dts.js#L95
  static at({ path, workspaceRoot = root }: { path: string; workspaceRoot?: string }) {
    const tsconfig = findUpSync("tsconfig.json", {
      cwd: path,
      stopAt: workspaceRoot,
      type: "file",
    });

    if (!tsconfig) {
      throw Error(`Could not find tsconfig.json for ${path}`);
    }

    const { options } = getTsconfig({
      tsconfig,
      errorsRelativeTo: workspaceRoot,
    });

    return new ShikiPackage(dirname(tsconfig), options);
  }

  readonly #dir: string;
  readonly #compilerOptions: ts.CompilerOptions;

  private constructor(dir: string, compilerOptions: ts.CompilerOptions) {
    this.#dir = dir;
    this.#compilerOptions = compilerOptions;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      dir: this.#dir,
      compilerOptions: this.#compilerOptions,
    };
  }

  get root() {
    return this.#dir;
  }

  get compilerOptions() {
    return this.#compilerOptions;
  }
}
