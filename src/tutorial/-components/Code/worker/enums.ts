import ts from "typescript";

// export enum ModuleResolutionKind {
//   Classic = 1,
//   NodeJs = 2,

// }

export interface ModuleResolutionKind {
  Classic: ts.ModuleResolutionKind.Classic;
  Node10: ts.ModuleResolutionKind.Node10;
  Node16: ts.ModuleResolutionKind.Node16;
  NodeNext: ts.ModuleResolutionKind.NodeNext;
  Bundler: ts.ModuleResolutionKind.Bundler;
}

export const ModuleResolutionKind: ModuleResolutionKind = {
  Classic: 1,
  Node10: 2,
  Node16: 3,
  NodeNext: 99,
  Bundler: 100,
};

export interface ScriptTarget {
  ES2020: ts.ScriptTarget.ES2020;
  ES2021: ts.ScriptTarget.ES2021;
  ES2022: ts.ScriptTarget.ES2022;
  ESNext: ts.ScriptTarget.ESNext;
}

export interface ModuleKind {
  ES2020: ts.ModuleKind.ES2020;
  ES2022: ts.ModuleKind.ES2022;
  ESNext: ts.ModuleKind.ESNext;
  Node16: ts.ModuleKind.Node16;
  NodeNext: ts.ModuleKind.NodeNext;
}

export const ScriptTarget: ScriptTarget = {
  ES2020: 7,
  ES2021: 8,
  ES2022: 9,
  ESNext: 99,
};

export const ModuleKind: ModuleKind = {
  ES2020: 6,
  ES2022: 7,
  ESNext: 99,
  Node16: 100,
  NodeNext: 199,
};

type Version = `${typeof ts["versionMajorMinor"]}.${string}`;

export const TS_VERSION: Version = "5.0.0";
