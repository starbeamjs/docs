import {
  fetchDependencyTyping,
  type DependencyFiles,
} from "../dependencies.js";
import { FileCache } from "./build.js";
import type { CacheableFile } from "./input.js";
import { typeNameForPackage } from "./utils.js";

export class Dependencies {
  static create(cache: FileCache) {
    return new Dependencies(cache);
  }

  readonly #cache: FileCache;

  private constructor(cache: FileCache) {
    this.#cache = cache;
  }

  async fetchDependency(name: string, version: string) {
    return DependencyPackage.fetch(name, version, this.#cache);
  }
}

export class DependencyPackage {
  static async fetch(
    name: string,
    version: string,
    cache: FileCache
  ) {
    const files = await fetchDependencyTyping({
      name,
      version,
    });

    const dep = DependencyPackage.create(
      cache,
      name,
      PackageFiles.from(files, cache)
    );

    if (!dep.hasTypes) {
      await dep.fetchTypes();
    }
  }

  static create(
    cache: FileCache,
    pkg: string,
    files: PackageFiles
  ) {
    return new DependencyPackage(cache, pkg, files);
  }

  readonly #cache: FileCache;
  readonly #pkg: string;
  readonly #files: PackageFiles;

  constructor(
    cache: FileCache,
    pkg: string,
    files: PackageFiles
  ) {
    this.#cache = cache;
    this.#pkg = pkg;
    this.#files = files;
  }

  get files() {
    return this.#files;
  }

  get hasTypes() {
    return [...this.#files].some((file) => file.isType);
  }

  async fetchTypes() {
    const typeRegistry = await this.#cache.typeRegistry();
    const name = typeNameForPackage(`@types/${this.#pkg}`);

    if (typeRegistry[this.#pkg])
      DependencyPackage.fetch(name, "latest", this.#cache);

    if (typeRegistry[name]) {
      const atTypeFiles = await fetchDependencyTyping({
        name: typeNameForPackage(name),
        version: typeRegistry[name]?.latest ?? "latest",
      });

      console.log({ atTypeFiles });

      for (const [name, file] of Object.entries(atTypeFiles)) {
        this.#files.addFile(
          PackageFile.create(name, file.module.code)
        );
      }
    }
  }
}

export class PackageFiles implements Iterable<PackageFile> {
  static empty(cache: FileCache) {
    return new PackageFiles(cache, {});
  }

  static from(files: DependencyFiles, cache: FileCache) {
    const packageFiles = PackageFiles.empty(cache);

    for (const [path, value] of Object.entries(files)) {
      if (!path.startsWith("/")) {
        throw Error(
          `INVALID ASSUMPTION: paths returned from fetchDependencyTyping must start with '/': ${path}`
        );
      }

      const file = PackageFile.create(
        path.slice(1),
        value.module.code
      );

      if (file.isTypeRelevant) {
        packageFiles.addFile(file);
      }
    }

    return packageFiles;
  }

  readonly #cache: FileCache;
  readonly #files: Record<string, PackageFile>;

  constructor(
    cache: FileCache,
    files: Record<string, PackageFile>
  ) {
    this.#cache = cache;
    this.#files = files;
  }

  addFile(file: PackageFile) {
    if (file.isTypeRelevant) {
      this.#cache.addFile(file);
      this.#files[file.absolutePath] = file;
    }
  }

  *[Symbol.iterator](): Iterator<PackageFile> {
    yield* Object.values(this.#files);
  }
}

const FILE_PARTS =
  /^(?:(?<scope>@[^/]+)[/])?(?:(?<name>[^/]+)[/])(?<path>[^.]*)(?:\.(?<ext>.*))?$/;

class FileName {
  static parse(filename: string) {
    const match = FILE_PARTS.exec(filename);

    if (!match || !match.groups) {
      throw Error(
        `Invalid dependency filename: ${filename} (expected a path nested in a package name)`
      );
    }

    const { scope, name, path, ext } =
      match.groups as unknown as FileName;

    return new FileName(filename, scope, name, path, ext);
  }

  readonly full: string;
  readonly scope: string | undefined;
  readonly name: string;
  readonly path: string;
  readonly ext: string | undefined;

  constructor(
    full: string,
    scope: string | undefined,
    name: string,
    path: string,
    ext: string | undefined
  ) {
    this.full = full;
    this.scope = scope;
    this.name = name;
    this.path = path;
    this.ext = ext;
  }

  get basename() {
    return `${this.name}.${this.ext}`;
  }

  get isType() {
    return this.ext === "d.ts";
  }
}

export class PackageFile implements CacheableFile {
  static create(path: string, code: string) {
    const file = FileName.parse(path);
    return new PackageFile(file, code);
  }

  readonly #filename: FileName;
  readonly #code: string;

  private constructor(filename: FileName, code: string) {
    this.#filename = filename;
    this.#code = code;
  }

  get absolutePath(): string {
    return this.cacheKey;
  }

  get cacheKey(): string {
    return `node_modules/${this.#filename.full}`;
  }

  get name(): FileName {
    return this.#filename;
  }

  get content(): string {
    return this.#code;
  }

  get isType() {
    return this.#filename.isType;
  }

  get isTypeRelevant(): boolean {
    return (
      this.#filename.isType ||
      this.#filename.basename === "package.json"
    );
  }
}
