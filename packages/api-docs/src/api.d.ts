export interface Tagged {
  tag?: Tag;
  tags?: Tag[];
}

export interface Fn extends Tagged {
  generics?: Generics;
  returns?: TypeWithDocs;
  params?: Params;
  docs?: string;
}

export type FnExport = Fn & Export;

export interface Method extends Fn {
  placement?: "static" | "instance";
}

/**
 * A special category of API.
 * @markdownDescription
 * A special category of API.
 *
 * - "optimization" means that the API is useful for optimizing, but is otherwise not necessary.
 * - "renderer" means that the API is intended to be used when implementing renderers.
 * - "debug" means that the API is only available in debug mode.
 */
export type Tag = "optimization" | "renderer" | "debug";

export interface Export extends Tagged {
  /**
   * The kind of export.
   *
   * @examples ["fn:constructor", "interface"]
   */
  kind: ExportKind;
  docs?: string;
  notes?: string;
}

export interface InterfaceMembers extends Export {
  properties?: Properties;
  methods?: Methods;
}

export interface Variants extends Export {
  kind: "variants";
  variants: Record<string, Variant>;
}

export type VariantFields = Properties | "empty";
export type Variant = VariantFields | VariantWithDocs;

/**
 * An individual variant with documentation.
 * @markdownDescription
 * An individual variant with documentation.
 *
 * ```json
 * [
 *   "a color",
 *   { red: ["string"], green: ["string"], blue: ["string"] },
 * ]
 * ```
 */
export type VariantWithDocs = [string, VariantFields];

/**
 * A constructor function.
 */
export interface ConstructorFn extends Fn, InterfaceMembers, Export {
  kind: "fn:constructor";
  properties?: Properties;
  methods?: Methods;
  events?: Events;
}

/**
 * A utility function.
 */
export interface UtilFn extends Fn, Export {
  kind: "fn:util";
}

/**
 * An interface.
 */
export interface Interface extends InterfaceMembers {
  kind: "interface";
}

export interface Const extends InterfaceMembers {
  kind: "const";
}

/**
 * @description
 * A type with optional documentation.
 * @markdownDescription
 * A type with optional documentation.
 *
 * @examples [["string"], ["string", "a JavaScript string"]]
 */
export type TypeWithDocs = [string, string] | [string];

export interface Generics {
  [key: string]: string;
}

/**
 * @description
 * The function's parameters
 *
 * @markdownDescription
 * The function's parameters. If the parameter is an options argument, the type is an
 * array of `["@options", Params]`.
 */
export interface Params {
  [key: string]: Type;
}

/**
 * @description
 * The properties of an object.
 *
 * @markdownDescription
 * The properties of an object.
 *
 * - With a name only: ["title"]
 * - With a name and a type: ["title", "string"]
 * - With a name, type and property modifier: ["title", "string", "readonly"]
 *
 * @examples [["title"], ["title", "string"], ["title", "string", "readonly"]]
 */
export interface Properties {
  [key: string]: Property;
}

export type PropertyModifier = "readonly";

export type PropertyDetail = PropertyModifier | ["tag", Tag];

/**
 * A property with its type and property modifier.
 *
 * `["title", "string", "readonly"]`
 */
export type PropertyWithModifier = [
  string,
  string,
  PropertyModifier,
  ...PropertyModifier[]
];

export type LonghandProperty = [
  string,
  Tagged & {
    modifiers?: PropertyModifier[];
    docs?: string;
  }
];

/**
 * A property of an object.
 */
export type Property = TypeWithDocs | PropertyWithModifier | LonghandProperty;

/**
 * An options argument to a function.
 */
export type Options = ["@options" | "@options?", Params];
/**
 * A parameter to a function. If the parameter is an options argument, the
 * type is an array of `["@options", Params]`.
 */
export type Type = TypeWithDocs | Options;

export interface Methods {
  [key: string]: Method;
}

export interface Events {
  [key: string]: Fn;
}

export type HasInterfaceMembers = ConstructorFn | Interface | Const;

/**
 * A documented public API.
 * @markdownDescription
 * A documented public API.
 *
 * - Constructor functions (`kind: "fn:constructor"`)
 * - Interfaces (`kind: "interface"`)
 */
export type Api = HasInterfaceMembers | UtilFn | Variants;

export type ExportKind =
  | "fn:constructor"
  | "fn:util"
  | "interface"
  | "variants"
  | "const";

export default interface Apis {
  /**
   * The public APIs documented here.
   */
  exports: Record<string, Api>;
  /**
   * The main API documentation for the entire page.
   */
  page?: string;

  links?: Record<string, string>;
}

export { Apis };
