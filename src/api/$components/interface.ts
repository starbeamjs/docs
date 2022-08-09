export interface YamlExports {
  [name: string]: YamlExport;
}

export type YamlExport = YamlUtilFnExport | YamlConstructorFnExport;

export interface YamlFn {
  params: YamlParams;
  returns: YamlTypeWithDocs;
}

export interface YamlUtilFnExport extends YamlFn {
  kind: "util-fn";
}

export interface YamlConstructorFnExport extends YamlFn {
  kind: "constructor-fn";
  methods?: YamlMethods;
}

export type YamlFnExport = YamlUtilFnExport | YamlConstructorFnExport;

export interface YamlMethods {
  [name: string]: YamlMethod;
}

export interface YamlMethod extends YamlFn {
  kind: "method";
  placement: "static" | "instance";
}

export interface YamlParams {
  [name: string]: YamlTypeWithDocs;
}

export type YamlTypeWithDocs = [name: string, docs?: string];
