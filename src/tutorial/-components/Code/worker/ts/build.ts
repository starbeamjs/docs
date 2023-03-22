import {
  createSystem,
  createVirtualTypeScriptEnvironment,
} from "@typescript/vfs";
import ts from "typescript";
import { TS_VERSION } from "../../shared/version.js";
import { TYPES_REGISTRY } from "../dependencies.js";
import { post } from "../events.js";
import { Dependencies, PackageFile } from "./dep.js";
import { Inputs, type CacheableFile } from "./input.js";
import {
  TsSystem,
  type CachedFsMap,
  type TypeRegistry,
} from "./system.js";
import { getCache, getDependencies } from "./utils.js";

export class BuildTsSystem {
  static async create(
    files: Record<string, { code: string }>,
    entry: string,
    fsMapCached: Map<string, string>
  ) {
    const input = Inputs.process(files);
    const compilerOptions = input.compilerOptions;

    const cache = await FileCache.create(
      fsMapCached,
      compilerOptions
    );

    const deps = await Dependencies.create(cache);

    return new BuildTsSystem(
      input,
      compilerOptions,
      cache,
      deps
    );
  }

  readonly #input: Inputs;
  readonly #compilerOptions: ts.CompilerOptions;
  readonly #cache: FileCache;
  readonly #deps: Dependencies;

  private constructor(
    input: Inputs,
    compilerOptions: ts.CompilerOptions,
    cache: FileCache,
    deps: Dependencies
  ) {
    this.#input = input;
    this.#compilerOptions = compilerOptions;
    this.#cache = cache;
    this.#deps = deps;
  }

  /**
   * Add local files to the file-system
   */
  #addTsFiles() {
    for (const file of this.#input.tsFiles) {
      this.#cache.addFile(file);
    }
  }

  /**
   * Post CDN payload to cache in the browser storage
   */
  #sendFilesToClient() {
    post("cache-typescript-fsmap", {
      fsMap: this.#cache.map,
      version: TS_VERSION,
    });
  }

  async #fetchDependencies() {
    for (const [name, version] of getDependencies(
      this.#input.packageJson
    )) {
      await this.#deps.fetchDependency(name, version);
    }
  }

  async create(): Promise<TsSystem> {
    this.#addTsFiles();
    this.#sendFilesToClient();
    await this.#fetchDependencies();

    const system = createSystem(this.#cache.map);
    const env = createVirtualTypeScriptEnvironment(
      system,
      this.#input.roots,
      ts,
      this.#compilerOptions
    );

    return TsSystem.create(env, system);
  }
}

export class FileCache {
  static async create(
    fsMapCached: Map<string, string>,
    compilerOptions: ts.CompilerOptions
  ): Promise<FileCache> {
    const cache = await getCache(fsMapCached, compilerOptions);
    return new FileCache(cache, null);
  }

  readonly #cache: CachedFsMap;
  #lazyTypeRegistry: TypeRegistry | null;

  constructor(
    cache: CachedFsMap,
    typeRegistry: TypeRegistry | null
  ) {
    this.#cache = cache;
    this.#lazyTypeRegistry = typeRegistry;
  }

  get map(): CachedFsMap {
    return this.#cache;
  }

  async typeRegistry(): Promise<TypeRegistry> {
    if (!this.#lazyTypeRegistry) {
      const response = await fetch(TYPES_REGISTRY);
      const data = await response.json();
      this.#lazyTypeRegistry = data.entries as TypeRegistry;
    }

    return this.#lazyTypeRegistry;
  }

  addFile(file: CacheableFile) {
    this.#cache.set(file.cacheKey, file.content);
    post("add-lib", {
      code: file.content,
      path: file.absolutePath,
    });
  }

  addType(file: PackageFile) {
    if (file.isTypeRelevant) {
      this.addFile(file);
    }
  }
}
