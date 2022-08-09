import {
  NormalizedPropertyType,
  normalizeProperty,
  PropertyModifier,
  YamlConstructorFnExport,
  YamlExports,
  YamlFnExport,
  YamlInterface,
  YamlMethod,
  YamlTypeWithDocs,
  YamlUtilFnExport,
} from "./interface.js";

export class Exports {
  #exports: YamlExports;

  constructor(exports: YamlExports) {
    this.#exports = exports;
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
    for (const [name, e] of Object.entries(this.#exports)) {
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
    return `${this.kind}-${this.name}`;
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

  get docs(): string | undefined {
    return this.#fn.docs;
  }

  get notes(): string | undefined {
    return this.#fn.notes;
  }

  get params(): Param[] {
    if (this.#fn.params === undefined) {
      return [];
    }

    const entries = Object.entries(this.#fn.params);
    const last = entries[entries.length - 1];
    const params = [];

    for (const entry of entries) {
      const [name, type] = entry;
      params.push(new Param(name, new Type(type), entry === last));
    }

    return params;
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
      ([name, e]) => new Method(name, e)
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
      ([name, e]) => new Method(name, e)
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
    return new PropertyType(this.#property);
  }

  get docs() {
    return this.#property.docs ? formatDocs(this.#property.docs) : undefined;
  }

  get slug() {
    return `${this.#parent.slug}-${this.name}`;
  }

  get modifiers(): PropertyModifier[] | void {
    return this.#property.modifiers;
  }

  get prefix(): string {
    return this.#property.modifiers ? "readonly " : "";
  }
}

export class Method extends Fn {
  declare readonly kind = "method";

  #method: YamlMethod;

  constructor(name: string, e: YamlMethod) {
    super("method", name, e);
    this.#method = e;
  }

  get prefix() {
    return this.#method.placement === "static" ? "static " : "";
  }
}

export class Param {
  constructor(
    readonly name: string,
    readonly type: Type,
    readonly isLast: boolean
  ) {}
}

export class Type {
  #type: YamlTypeWithDocs;

  constructor(type: YamlTypeWithDocs) {
    this.#type = type;
  }

  get isOptional() {
    return this.#type[0].endsWith("?");
  }

  get name() {
    return this.#type[0].replace(/\?$/, "");
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

export class PropertyType extends Type {
  #type: NormalizedPropertyType;

  constructor(type: NormalizedPropertyType) {
    super([type.name, type.docs]);
    this.#type = type;
  }

  get modifiers(): PropertyModifier[] | undefined {
    return this.#type.modifiers;
  }
}

function formatDocs(docs: string): string {
  let string = docs.trim();

  if (string.endsWith(".")) {
    string = string.slice(0, -1);
  }

  return docs.replace(/\n/g, "<br>") + ".";
}
