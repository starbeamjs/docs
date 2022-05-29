declare module "@starbeam/docs/env" {
  global {
    interface ImportMeta {
      hot: boolean;
    }
  }
}

declare module "shell-escape-tag" {
  class Escaped {
    #value: string;

    toString(): string;
  }

  interface Shell {
    (strings: TemplateStringsArray, ...values: unknown[]): string;
    escape: (...args: unknown[]) => Escaped;
    preserve: (...args: unknown[]) => Escaped;
  }

  const shell: Shell;
  export default shell;
}
