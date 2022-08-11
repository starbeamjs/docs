export interface YamlExports {
  [name: string]: YamlExport;
}

export type YamlExport =
  | YamlUtilFnExport
  | YamlConstructorFnExport
  | YamlInterface;

export interface YamlValue {
  tag?: "optimization";
  generics?: { [key: string]: string };
  notes?: string;
}

export interface YamlInterface extends YamlValue {
  kind: "interface";
  properties?: YamlProperties;
  methods?: YamlMethods;
}

export interface YamlFn extends YamlValue {
  params?: YamlParams;
  options?: YamlOptions;
  returns?: YamlTypeWithDocs;
  docs?: string;
}

export interface YamlUtilFnExport extends YamlFn {
  kind: "util-fn";
}

export interface YamlConstructorFnExport extends YamlFn {
  kind: "constructor-fn";
  properties?: YamlProperties;
  methods?: YamlMethods;
}

export type YamlFnExport = YamlUtilFnExport | YamlConstructorFnExport;

export interface YamlMethods {
  [name: string]: YamlMethod;
}

export interface YamlProperties {
  [name: string]: YamlPropertyType;
}

export type YamlPropertyType =
  | YamlTypeWithDocs
  | [
      name: string,
      docs: string,
      modifier: PropertyModifier,
      ...modifiers: PropertyModifier[]
    ]
  | [
      name: string,
      modifier: PropertyModifier,
      ...modifiers: PropertyModifier[]
    ];

export interface NormalizedPropertyType {
  name: string;
  docs?: string;
  modifiers?: PropertyModifier[];
}

export function normalizeProperty(
  property: YamlPropertyType
): NormalizedPropertyType {
  if (property.length === 1) {
    return {
      name: property[0],
    };
  } else if (property.length === 2) {
    if (isPropertyModifier(property[1])) {
      return {
        name: property[0],
        modifiers: [property[1]],
      };
    } else {
      return {
        name: property[0],
        docs: property[1],
      };
    }
  } else {
    const [name, docs, modifier, ...modifiers] = property;

    return {
      name,
      docs,
      modifiers: [modifier as PropertyModifier, ...modifiers],
    };
  }
}

function isPropertyModifier(
  value: string | undefined
): value is PropertyModifier {
  return value === "readonly";
}

export type PropertyModifier = "readonly";

export interface YamlMethod extends YamlFn {
  placement: "static" | "instance";
}

export interface YamlOptions {
  [name: string]: YamlTypeWithDocs;
}

export interface YamlParams {
  [name: string]: YamlParamType;
}

export type YamlTypeWithDocs = [name: string, docs?: string];
export type YamlParamType = YamlTypeWithDocs | YamlOptionsType;
export type YamlOptionsType =
  | [type: "@options" | "@options?", options: YamlOptions]
  | [type: "@options" | "@options?", name: string, options: YamlOptions];

export function isOptionsType(type: YamlParamType): type is YamlOptionsType {
  return type[0] === "@options" || type[0] === "@options?";
}

export function getOptions(type: YamlOptionsType): {
  name: string;
  options: YamlOptions;
} {
  if (type.length === 3) {
    const [, name, options] = type;
    return {
      name,
      options,
    };
  } else {
    const [, options] = type;
    return {
      name: "options",
      options,
    };
  }
}
