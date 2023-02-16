import {
  parseCompilerOptions,
  type DependencyFileEntry,
} from "./utils.ts";

export interface CacheableFile {
  readonly absolutePath: string;
  readonly cacheKey: string;
  readonly content: string;
}

export class InputFile implements CacheableFile {
  static create(path: string, code: string) {
    return new InputFile(path, code);
  }

  static fromNodeModules([name, file]: DependencyFileEntry) {
    return new InputFile(
      `node_modules${name}`,
      file.module.code
    );
  }

  readonly #filename: string;
  readonly #code: string;

  constructor(filename: string, code: string) {
    this.#filename = filename;
    this.#code = code;
  }

  get cacheKey(): string {
    return this.#filename;
  }

  get absolutePath(): string {
    return this.#filename;
  }

  get path(): string {
    return this.#filename;
  }

  get content(): string {
    return this.#code;
  }

  parseJSON<T>() {
    return JSON.parse(this.#code) as T;
  }
}

interface RawFile {
  readonly code: string;
}

class InputFiles {
  static of(files: Map<string, InputFile>): InputFiles {
    return new InputFiles(files);
  }

  readonly #files: Map<string, InputFile>;

  constructor(files: Map<string, InputFile>) {
    this.#files = files;
  }

  get files(): IterableIterator<InputFile> {
    return this.#files.values();
  }
}

export class Inputs {
  static process(files: Record<string, RawFile>): Inputs {
    const tsFiles: Map<string, InputFile> = new Map();
    const rootPaths: string[] = [];
    let tsconfig: InputFile | null = null;
    let packageJson: InputFile | null = null;

    for (const path in files) {
      const filePath = path.replace(/^\/?/g, "/");

      const content = files[filePath]?.code;

      // TODO: normalize path
      if (filePath === "/tsconfig.json") {
        tsconfig = content
          ? InputFile.create(filePath, content)
          : null;
      } else if (filePath === "/package.json") {
        packageJson = content
          ? InputFile.create(filePath, content)
          : null;
      } else if (/^[^.]+.tsx?$/.test(filePath)) {
        // Only ts files
        tsFiles.set(
          filePath,
          InputFile.create(filePath, content ?? "")
        );
        rootPaths.push(filePath);
      }
    }

    return new Inputs(
      InputFiles.of(tsFiles),
      rootPaths,
      tsconfig,
      packageJson
    );
  }

  readonly #tsFiles: InputFiles;
  readonly #rootPaths: string[];
  readonly #tsconfig: InputFile | null;
  readonly #packageJson: InputFile | null;

  constructor(
    tsFiles: InputFiles,
    rootPaths: string[],
    tsconfig: InputFile | null,
    packageJson: InputFile | null
  ) {
    this.#tsFiles = tsFiles;
    this.#rootPaths = rootPaths;
    this.#tsconfig = tsconfig;
    this.#packageJson = packageJson;
  }

  get compilerOptions() {
    console.log({ tsconfig: this.#tsconfig });
    return parseCompilerOptions(this.#tsconfig);
  }

  get tsFiles(): IterableIterator<InputFile> {
    return this.#tsFiles.files;
  }

  get packageJson(): InputFile | null {
    return this.#packageJson;
  }

  get roots(): string[] {
    return this.#rootPaths;
  }
}
