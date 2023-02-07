export interface Example {
  initial: ExampleConfig;
  solution: ExampleConfig;
}

export interface ExampleConfig {
  files: FileTree;
  dependencies: string[];

  jsx?: string;
  main?: string;
  activeFile?: string;
}

export type FileTree = Record<string, string>;
