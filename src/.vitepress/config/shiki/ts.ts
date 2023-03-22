import type ts from "typescript";
import type { Diagnostic } from "typescript";

export interface TsDiagnosticsOptions {
  readonly relativeTo: string;
  readonly filename: string;
  readonly message: string;
}

export class FileDiagnostics {
  static for({
    filename,
    errorsRelativeTo: relativeTo,
  }: {
    filename: string;
    errorsRelativeTo: string;
  }) {
    return new FileDiagnostics(filename, relativeTo);
  }

  readonly #filename: string;
  readonly #relativeTo: string;

  private constructor(filename: string, relativeTo: string) {
    this.#filename = filename;
    this.#relativeTo = relativeTo;
  }

  do<T extends { errors?: ts.Diagnostic[] | undefined } | { error?: Diagnostic | undefined }>(
    callback: () => T,
    message: string
  ) {
    const result = callback();

    if ("error" in result && result.error) {
      throw this.error(message, [result.error]);
    } else if ("errors" in result && result.errors && result.errors.length > 0) {
      throw this.error(message, result.errors);
    }

    return result;
  }

  error(message: string, diagnostics: ts.Diagnostic | ts.Diagnostic[] = []) {
    return TsDiagnostics.error(Array.isArray(diagnostics) ? diagnostics : [diagnostics], {
      filename: this.#filename,
      relativeTo: this.#relativeTo,
      message,
    });
  }
}

// The basic approach is originally from
// https://github.com/AssemblyScript/assemblyscript/blob/1e2de99e43f0d2f61e6699d9c23093a1b753a000/scripts/build-dts.js#L36
export class TsDiagnostic {
  static from(diagnostic: ts.Diagnostic, path: string) {
    return new TsDiagnostic(diagnostic, path);
  }

  static message(diagnostic: ts.Diagnostic, path: string) {
    return new TsDiagnostic(diagnostic, path).message;
  }

  readonly #diagnostic: ts.Diagnostic;
  readonly #path: string;

  constructor(diagnostic: ts.Diagnostic, path: string) {
    this.#diagnostic = diagnostic;
    this.#path = path;
  }

  get description() {
    return `error TS${this.#diagnostic.code}: ${this.#diagnostic.messageText}`;
  }

  get location() {
    const diagnostic = this.#diagnostic;

    if (diagnostic.file) {
      if (diagnostic.start === undefined) {
        return `${diagnostic.file.fileName}: `;
      }

      const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);

      return `${diagnostic.file.fileName}(${position.line + 1},${position.character + 1}): `;
    } else {
      // not all errors have an associated file: in particular, problems with a
      // the tsconfig.json don't; for this situation, we pass in the original
      // path of the tsconfig.
      return `${this.#path}: `;
    }
  }

  get message() {
    return `${this.location}${this.description}`;
  }
}

export class TsDiagnostics {
  static from(diagnostics: ts.Diagnostic[], options: TsDiagnosticsOptions): TsDiagnostics {
    return new TsDiagnostics(diagnostics, options);
  }

  static error(diagnostics: ts.Diagnostic[], options: TsDiagnosticsOptions) {
    return new TsDiagnostics(diagnostics, options).error;
  }

  /**
   * The directory that filenames should be presented relative to
   */
  readonly #root: string;
  readonly #path: string;
  readonly #message: string | undefined;
  readonly #diagnostics: ts.Diagnostic[];

  private constructor(
    diagnostics: ts.Diagnostic[],
    { filename: path, message, relativeTo: root }: TsDiagnosticsOptions
  ) {
    this.#root = root;
    this.#path = path;
    this.#diagnostics = diagnostics;
    this.#message = message;
  }

  get message(): string {
    return this.#message ?? "Declaration generation failed";
  }

  get error() {
    const message = [
      this.message,
      ...this.#diagnostics.map((d) => TsDiagnostic.message(d, this.#path)),
    ].join("\n");

    const error = new Error(message);
    error.name = "EmitterError";
    return error;
  }
}
