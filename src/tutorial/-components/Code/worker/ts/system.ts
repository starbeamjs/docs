import { type VirtualTypeScriptEnvironment } from "@typescript/vfs";
import ts from "typescript";
import "../events.ts";
import { BuildTsSystem } from "./build.ts";

export class TsSystem {
  static create(
    env: VirtualTypeScriptEnvironment,
    system: ts.System
  ) {
    return new TsSystem(env, system);
  }

  static async build(
    files: Record<string, { code: string }>,
    entry: string,
    fsMapCached: Map<string, string>
  ): Promise<TsSystem> {
    const builder = await BuildTsSystem.create(
      files,
      entry,
      fsMapCached
    );

    return builder.create();
  }

  readonly #env: VirtualTypeScriptEnvironment;
  readonly #system: ts.System;

  private constructor(
    env: VirtualTypeScriptEnvironment,
    system: ts.System
  ) {
    this.#env = env;
    this.#system = system;
  }
}

export type CachedFsMap = Map<string, string>;
export type TypeRegistry = Record<string, { latest: string }>;
