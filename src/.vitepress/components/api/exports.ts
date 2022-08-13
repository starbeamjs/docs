import type * as api from "@starbeam/api-docs";
import {
  hasNotes,
  isOptionsType,
  normalizeProperty,
  tagList,
  type NormalizedPropertyType,
} from "./utils.js";

export class PublicApi {
  #api: api.Apis;

  constructor(exports: api.Apis) {
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
        case "const":
          yield new ConstExport(name, e);
          break;
        case "variants":
          yield new VariantsExport(name, e);
          break;
        default:
          assertNever(e);
      }
    }
  }
}

export type Export =
  | UtilFnExport
  | ConstructorFnExport
  | InterfaceExport
  | ConstExport
  | VariantsExport;

export abstract class AbstractExport {
  constructor(readonly kind: string, readonly name: string) {}

  get slug() {
    return formatSlug(`${this.kind}-${this.name}`);
  }

  isInterface(): this is InterfaceExport | ConstExport | ConstructorFnExport {
    return (
      this instanceof InterfaceExport ||
      this instanceof ConstructorFnExport ||
      this instanceof ConstExport
    );
  }
}

export type FunctionKind = "util-fn" | "constructor-fn" | "method";

export abstract class Fn extends AbstractExport {
  #fn: api.Fn;
  abstract readonly prefix: string;

  constructor(
    readonly kind: FunctionKind,
    name: string,
    fn: api.FnExport | api.Method
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
    return hasNotes(this.#fn) ? this.#fn.notes : undefined;
  }

  get params(): Parameter[] {
    if (this.#fn.params === undefined) {
      return [];
    }

    return [...params(this.#fn.params, undefined)];
  }

  get ret() {
    if (this.#fn.returns) {
      return new Type(this.#fn.returns);
    }

    return new Type(["void"]);
  }

  get tags(): api.Tag[] | void {
    return tagList(this.#fn);
  }
}

function* params<T extends Type | OptionsType = Type | OptionsType>(
  apiParams: api.Params,
  parent: Parameter | undefined
): IterableIterator<Parameter<T>> {
  const entries = Object.entries(apiParams);
  const last = entries[entries.length - 1];

  for (const entry of entries) {
    const [name, type] = entry;

    if (isOptionsType(type)) {
      yield new Parameter<T>(
        name,
        new OptionsType(type) as T,
        entry === last,
        parent
      );
    } else {
      yield new Parameter<T>(name, new Type(type) as T, entry === last, parent);
    }
  }
}

export class UtilFnExport extends Fn {
  declare readonly kind = "util-fn";
  readonly prefix = "function ";

  #export: api.UtilFn;

  constructor(name: string, e: api.UtilFn) {
    super("util-fn", name, e);
    this.#export = e;
  }
}

export interface AbstractInterfaceMembers {
  readonly hasMethods: boolean;
  readonly methods: Method[];
  readonly hasProperties: boolean;
  readonly properties: Property[];
  readonly slug: string;
}

export class InterfaceMembers
  extends AbstractExport
  implements AbstractInterfaceMembers
{
  #export: api.InterfaceMembers;

  constructor(kind: string, name: string, e: api.InterfaceMembers) {
    super(kind, name);
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

export class ConstExport extends InterfaceMembers {
  declare readonly kind: "const";

  constructor(name: string, e: api.Const) {
    super("const", name, e);
  }
}

export class InterfaceExport extends InterfaceMembers {
  declare readonly kind: "interface";

  constructor(name: string, e: api.Interface) {
    super("interface", name, e);
  }
}

export class ConstructorFnExport
  extends Fn
  implements AbstractInterfaceMembers
{
  declare readonly kind = "constructor-fn";
  readonly prefix = "function ";

  #export: api.ConstructorFn;

  constructor(name: string, e: api.ConstructorFn) {
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
  #parent: ConstructorFnExport | InterfaceMembers | Variant;
  #property: NormalizedPropertyType;

  constructor(
    parent: ConstructorFnExport | InterfaceMembers | Variant,
    readonly name: string,
    property: NormalizedPropertyType
  ) {
    this.#parent = parent;
    this.#property = property;
  }

  get type(): PropertyType {
    return new PropertyType(this.#property);
  }

  get docs(): string | undefined {
    return this.#property.docs ? formatDocs(this.#property.docs) : undefined;
  }

  get tags(): api.Tag[] | undefined {
    return this.#property.tags;
  }

  get slug(): string {
    return `${this.#parent.slug}-${formatSlug(this.name)}`;
  }

  get modifiers(): api.PropertyModifier[] | void {
    return this.#property.modifiers;
  }

  get prefix(): string {
    return this.#property.modifiers
      ? `${this.#property.modifiers.join(" ")} `
      : "";
  }
}

type ParentExport = InterfaceMembers | ConstructorFnExport;

export class Method extends Fn {
  declare readonly kind: "method";

  #parent: ParentExport;
  #method: api.Method;

  constructor(parent: ParentExport, name: string, e: api.Method) {
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

export class VariantsExport extends AbstractExport {
  declare readonly kind: "variants";
  #export: api.Variants;

  constructor(name: string, e: api.Variants) {
    super("variants", name);
    this.#export = e;
  }

  get variants(): Variant[] {
    return Object.entries(this.#export.variants ?? {}).map(
      ([name, e]) => new Variant(this, name, e)
    );
  }
}

export class Variant {
  #parent: VariantsExport;
  #name: string;
  #variant: api.Variant;

  constructor(parent: VariantsExport, name: string, variant: api.Variant) {
    this.#parent = parent;
    this.#name = name;
    this.#variant = variant;
  }

  get name(): string {
    return this.#name;
  }

  get docs(): string | undefined {
    if (Array.isArray(this.#variant)) {
      return this.#variant[0];
    }
  }

  get #fields(): api.Properties | undefined {
    if (this.#variant === "empty") {
      return;
    } else if (Array.isArray(this.#variant)) {
      if (this.#variant[1] === "empty") {
        return;
      } else {
        return this.#variant[1];
      }
    } else {
      return this.#variant;
    }
  }

  get slug(): string {
    return `${this.#parent.slug}-${formatSlug(this.name)}`;
  }

  get properties(): Record<string, Property> | undefined {
    const fields = this.#fields;
    if (fields === undefined) {
      return;
    }

    return Object.fromEntries(
      Object.entries(fields).map(([name, prop]) => [
        name,
        new Property(this, name, normalizeProperty(prop)),
      ])
    );
  }
}

export abstract class AbstractType {
  #type: api.Param;
  abstract readonly docs: string | void;
  abstract readonly name: string;

  constructor(type: api.Param) {
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
  #type: api.TypeWithDocs;

  constructor(type: api.TypeWithDocs) {
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

  #type: api.Options;
  readonly docs = undefined;
  readonly name = "object";

  constructor(type: api.Options) {
    super(type);
    this.#type = type;
  }

  *options(parent: Parameter): IterableIterator<Parameter<Type>> {
    const options = this.#type[1];

    yield* params<Type>(options, parent);
  }
}

export class PropertyType extends Type {
  #type: NormalizedPropertyType;

  constructor(type: NormalizedPropertyType) {
    super(type.docs ? [type.name, type.docs] : [type.name]);
    this.#type = type;
  }

  get modifiers(): api.PropertyModifier[] | undefined {
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

  return string.replaceAll("\n\n", "<br>") + ".";
}

function assertNever(_e: never): never {
  throw new Error(
    "Expected type to be never (this should have resulted in a type error)."
  );
}
