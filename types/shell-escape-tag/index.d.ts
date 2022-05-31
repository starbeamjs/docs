declare class Escaped {
  #value: string;

  toString(): string;
}

interface Shell {
  (strings: TemplateStringsArray, ...values: unknown[]): string;
  escape: (...args: unknown[]) => Escaped;
  preserve: (...args: unknown[]) => Escaped;
}

declare const shell: Shell;
export default shell;
export type { Escaped };
