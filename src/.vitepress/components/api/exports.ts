import {
  getOptions,
  isOptionsType,
  NormalizedPropertyType,
  normalizeProperty,
  PropertyModifier,
  YamlApi,
  YamlConstructorFnExport,
  YamlFnExport,
  YamlInterface,
  YamlMethod,
  YamlOptionsType,
  YamlParamType,
  YamlTypeWithDocs,
  YamlUtilFnExport,
} from "./interface.js";

export class PublicApi {
  #api: YamlApi;

  constructor(exports: YamlApi) {
    this.#api = exports;
  }

  get page(): string | undefined {
    return this.#api.page;
  }

  *grouped(): IterableIterator<[Export["kind"], Export[]]> {
    const groups = new Map<Export["kind"], Export[]>();
    for (const e of this) {
      const group = groups.get(e.kind) || [];
      group.push(e);
      groups.set(e.kind, group);
    }
    for (const [kind, group] of groups) {
      console.log([kind, group]);
      yield [kind, group];
    }
  }

  *[Symbol.iterator](): IterableIterator<Export> {
    for (const [name, e] of Object.entries(this.#api.exports)) {
      switch (e.kind) {
        case "constructor-fn":
          yield new ConstructorFnExport(name, e);
          break;
        case "util-fn":
          yield new UtilFnExport(name, e);
          break;
        case "interface":
          yield new InterfaceExport(name, e);
          break;
      }
    }
  }
}

export type Export = UtilFnExport | ConstructorFnExport | InterfaceExport;

export abstract class AbstractExport {
  constructor(readonly kind: string, readonly name: string) {}

  get slug() {
    return formatSlug(`${this.kind}-${this.name}`);
  }

  isInterface(): this is InterfaceExport | ConstructorFnExport {
    return (
      this instanceof InterfaceExport || this instanceof ConstructorFnExport
    );
  }
}

export type FunctionKind = "util-fn" | "constructor-fn" | "method";

export abstract class Fn extends AbstractExport {
  #fn: YamlFnExport | YamlMethod;
  abstract readonly prefix: string;

  constructor(
    readonly kind: FunctionKind,
    name: string,
    fn: YamlFnExport | YamlMethod
  ) {
    super(kind, name);
    this.#fn = fn;
  }

  hasGenerics(): this is { generics: Generic[] } {
    return this.#fn.generics !== undefined;
  }

  get generics(): Generic[] | undefined {
    if (this.#fn.generics === undefined) {
      return undefined;
    }

    return Object.entries(this.#fn.generics).map(
      ([name, docs]) => new Generic(name, docs)
    );
  }

  get docs(): string | undefined {
    return this.#fn.docs;
  }

  get notes(): string | undefined {
    return this.#fn.notes;
  }

  get params(): Parameter[] {
    if (this.#fn.params === undefined) {
      return [];
    }

    const entries = Object.entries(this.#fn.params);
    const last = entries[entries.length - 1];
    const params = [];

    for (const entry of entries) {
      const [name, type] = entry;

      if (isOptionsType(type)) {
        params.push(
          new Parameter(name, new OptionsType(type), entry === last, undefined)
        );
      } else {
        params.push(
          new Parameter(name, new Type(type), entry === last, undefined)
        );
      }
    }

    return params;
  }

  hasOptions(): boolean {
    return !!this.#fn.options;
  }

  get ret() {
    if (this.#fn.returns) {
      return new Type(this.#fn.returns);
    }

    return new Type(["void"]);
  }

  get tag(): "optimization" | void {
    return this.#fn.tag;
  }
}

export class UtilFnExport extends Fn {
  declare readonly kind = "util-fn";
  readonly prefix = "function ";

  #export: YamlUtilFnExport;

  constructor(name: string, e: YamlUtilFnExport) {
    super("util-fn", name, e);
    this.#export = e;
  }
}

export class InterfaceExport extends AbstractExport {
  declare readonly kind = "interface";

  #export: YamlInterface;

  constructor(name: string, e: YamlInterface) {
    super("interface", name);
    this.#export = e;
  }

  get hasMethods() {
    return !!this.#export.methods;
  }

  get methods(): Method[] {
    return Object.entries(this.#export.methods ?? {}).map(
      ([name, e]) => new Method(this, name, e)
    );
  }

  get hasProperties(): boolean {
    return !!this.#export.properties;
  }

  get properties(): Property[] {
    const entries = Object.entries(this.#export.properties ?? {});
    return entries.map(
      ([name, prop]) => new Property(this, name, normalizeProperty(prop))
    );
  }
}

export class ConstructorFnExport extends Fn {
  declare readonly kind = "constructor-fn";
  readonly prefix = "function ";

  #export: YamlConstructorFnExport;

  constructor(name: string, e: YamlConstructorFnExport) {
    super("constructor-fn", name, e);
    this.#export = e;
  }

  get hasMethods() {
    return !!this.#export.methods;
  }

  get methods(): Method[] {
    return Object.entries(this.#export.methods ?? {}).map(
      ([name, e]) => new Method(this, name, e)
    );
  }

  get hasProperties(): boolean {
    return !!this.#export.properties;
  }

  get properties(): Property[] {
    const entries = Object.entries(this.#export.properties ?? {});
    return entries.map(
      ([name, prop]) => new Property(this, name, normalizeProperty(prop))
    );
  }
}

export class Property {
  #parent: ConstructorFnExport | InterfaceExport;
  #property: NormalizedPropertyType;

  constructor(
    parent: ConstructorFnExport | InterfaceExport,
    readonly name: string,
    property: NormalizedPropertyType
  ) {
    this.#parent = parent;
    this.#property = property;
  }

  get type() {
    return new PropertyType(this.#property, undefined);
  }

  get docs() {
    return this.#property.docs ? formatDocs(this.#property.docs) : undefined;
  }

  get slug() {
    return `${this.#parent.slug}-${formatSlug(this.name)}`;
  }

  get modifiers(): PropertyModifier[] | void {
    return this.#property.modifiers;
  }

  get prefix(): string {
    return this.#property.modifiers ? "readonly " : "";
  }
}

type ParentExport = InterfaceExport | ConstructorFnExport;

export class Method extends Fn {
  declare readonly kind = "method";

  #parent: ParentExport;
  #method: YamlMethod;

  constructor(parent: ParentExport, name: string, e: YamlMethod) {
    super("method", name, e);
    this.#parent = parent;
    this.#method = e;
  }

  get slug() {
    return `${this.#parent.slug}-${super.slug}`;
  }

  get prefix() {
    return this.#method.placement === "static" ? "static " : "";
  }
}

export class Parameter<T extends Type | OptionsType = Type | OptionsType> {
  #parent: Parameter | undefined;

  constructor(
    readonly name: string,
    readonly type: T,
    readonly isLast: boolean,
    parent: Parameter | undefined
  ) {
    this.#parent = parent;
  }

  get fullName(): string {
    return this.#parent ? `${this.#parent.fullName}.${this.name}` : this.name;
  }

  hasOptions(): this is Parameter<OptionsType> {
    return OptionsType.is(this.type);
  }

  hasBareType(): this is Parameter<Type> {
    return !this.hasOptions();
  }

  *options(): IterableIterator<Parameter<Type>> {
    if (this.hasOptions()) {
      yield* this.type.options(this);
    }
  }
}

export abstract class AbstractType {
  #type: YamlParamType;
  abstract readonly docs: string | void;
  abstract readonly name: string;

  constructor(type: YamlParamType) {
    this.#type = type;
  }

  get isOptional() {
    return this.#type[0].endsWith("?");
  }
}

export class Generic extends AbstractType {
  #name: string;
  #docs: string;

  constructor(name: string, docs: string) {
    super([name, docs]);
    this.#name = name;
    this.#docs = docs;
  }

  get name(): string {
    const [name] = this.#name.split(" extends ");
    return name;
  }

  get docs() {
    return this.#docs;
  }

  get extends(): string | void {
    const [, extendsType] = this.#name.split(" extends ");
    return extendsType;
  }
}

export class Type extends AbstractType {
  #type: YamlTypeWithDocs;

  constructor(type: YamlTypeWithDocs) {
    super(type);
    if (typeof type === "string") {
      debugger;
    }
    this.#type = type;
  }

  isOptions(): this is OptionsType {
    return isOptionsType(this.#type);
  }

  get name() {
    return formatTypeName(this.#type[0]);
  }

  get docs(): string | void {
    const type = this.#type[1];
    return type ? formatDocs(type) : undefined;
  }

  format(): { docs: string | void; name: string; optional: boolean } {
    const { isOptional, name, docs } = this;

    return {
      docs,
      name,
      optional: isOptional,
    };
  }
}

export class OptionsType extends AbstractType {
  static is(value: AbstractType): value is OptionsType {
    return value instanceof OptionsType;
  }

  #type: YamlOptionsType;
  readonly docs = undefined;
  readonly name = "object";

  constructor(type: YamlOptionsType) {
    super(type);
    this.#type = type;
  }

  *options(parent: Parameter): IterableIterator<Parameter<Type>> {
    const { options } = getOptions(this.#type);

    for (const [name, type] of Object.entries(options)) {
      yield new Parameter(name, new Type(type), false, parent);
    }
  }
}

export class PropertyType extends Type {
  #type: NormalizedPropertyType;

  constructor(type: NormalizedPropertyType, parent: Parameter | undefined) {
    super([type.name, type.docs]);
    this.#type = type;
  }

  get modifiers(): PropertyModifier[] | undefined {
    return this.#type.modifiers;
  }
}

function formatSlug(name: string) {
  return name.replace(/[^a-zA-Z0-9-]/g, "--");
}

function formatTypeName(name: string) {
  return name.replace(/\?$/, "");
}

function formatDocs(docs: string): string {
  let string = docs.trim();

  if (string.endsWith(".")) {
    string = string.slice(0, -1);
  }

  return docs.replace(/\n/g, "<br>") + ".";
}
