interface Fn {
  generics?: Generics;
  returns?: TypeWithDocs;
  params?: Params;
  docs?: string;
  tag?: Tag;
}

/**
 * A special category of API.
 * @markdownDescription
 * A special category of API.
 *
 * - "optimization" means that the API is useful for optimizing, but is otherwise not necessary.
 * - "renderer" means that the API is intended to be used when implementing renderers.
 */
type Tag = "optimization" | "renderer";

type ExportKind = "constructor-fn" | "interface";

interface Export {
  /**
   * The kind of export.
   *
   * @examples ["constructor-fn", "interface"]
   */
  kind: ExportKind;
  docs?: string;
  notes?: string;
}

interface HasInterface extends Export {
  properties?: Properties;
  methods?: Methods;
}

/**
 * A constructor function.
 */
interface ConstructorFn extends Fn, HasInterface {
  kind: "constructor-fn";
  properties?: Properties;
  methods?: Methods;
}

/**
 * An interface.
 */
interface Interface extends HasInterface {
  kind: "interface";
}

/**
 * @description
 * A type with optional documentation.
 * @markdownDescription
 * A type with optional documentation.
 *
 * @examples [["string"], ["string", "a JavaScript string"]]
 */
type TypeWithDocs = [string, string] | [string];

interface Generics {
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
interface Params {
  [key: string]: Param;
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
interface Properties {
  [key: string]: Property;
}

type PropertyModifier = "readonly";

/**
 * A property, defined without a type.
 *
 * `["title"]`
 */
type PropertyName = [string];
/**
 * A property with its type.
 *
 * `["title", "string"]`
 */
type PropertyNameAndType = [string, string];

/**
 * A property with its type and property modifier.
 *
 * `["title", "string", "readonly"]`
 */
type PropertyNameAndTypeAndModifier = [string, string, PropertyModifier];

/**
 * A property of an object.
 */
type Property =
  | PropertyName
  | PropertyNameAndType
  | PropertyNameAndTypeAndModifier;

/**
 * An options argument to a function.
 */
type Options = ["@options" | "@options?", Params];
/**
 * A parameter to a function. If the parameter is an options argument, the
 * type is an array of `["@options", Params]`.
 */
type Param = TypeWithDocs | Options;

interface Methods {
  [key: string]: Fn;
}

/**
 * A documented public API.
 * @markdownDescription
 * A documented public API.
 *
 * - Constructor functions (`kind: "constructor-fn"`)
 * - Interfaces (`kind: "interface"`)
 */
type Api = ConstructorFn | Interface;

export interface Apis {
  /**
   * The public APIs documented here.
   */
  exports: Record<string, Api>;
  /**
   * The main API documentation for the entire page.
   */
  page?: string;
}

export default Apis;
