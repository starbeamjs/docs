import type * as api from "../api.js";
import { exhaustive } from "../utils.js";
import {
  Const,
  ConstructorFn,
  Interface,
  ItemKind,
  UtilFn,
  Variants,
  type ExportItem,
} from "./items.js";

export interface ExportsInfo {
  readonly package: string;
  readonly title: string;
  readonly url: string;
  readonly apis: api.Apis;
}

export class Exports {
  static from(info: ExportsInfo): Exports {
    return new Exports(info);
  }

  readonly #info: ExportsInfo;

  constructor(info: ExportsInfo) {
    this.#info = info;
  }

  get package(): string {
    return this.#info.package;
  }

  get title(): string {
    return this.#info.title;
  }

  get url(): string {
    return this.#info.url;
  }

  get #exports(): Record<string, api.Api> {
    return this.#info.apis.exports;
  }

  *grouped(): IterableIterator<[ItemKind, ExportItem[]]> {
    const groups = new Map<ItemKind, ExportItem[]>();
    for (const e of this) {
      const group = groups.get(e.kind) || [];
      group.push(e);
      groups.set(e.kind, group);
    }
    for (const [kind, group] of groups) {
      yield [kind, group];
    }
  }

  *[Symbol.iterator](): IterableIterator<ExportItem> {
    for (const [name, e] of Object.entries(this.#exports)) {
      switch (e.kind) {
        case "fn:constructor":
          yield ConstructorFn.api(name, e);
          break;
        case "fn:util":
          yield UtilFn.api(name, e);
          break;
        case "interface":
          yield Interface.api(name, e);
          break;
        case "const":
          yield Const.api(name, e);
          break;
        case "variants":
          yield Variants.api(name, e);
          break;
        default:
          exhaustive(e);
      }
    }
  }
}

export interface ExportInfo {
  readonly name: string;
  readonly item: api.Export;
}

export class Export {
  static api(name: string, item: api.Export): Export {
    return new Export({ name, item });
  }

  readonly #info: ExportInfo;

  constructor(info: ExportInfo) {
    this.#info = info;
  }

  get name(): string {
    return this.#info.name;
  }

  get kind(): api.ExportKind {
    return this.#info.item.kind;
  }

  get tags(): api.Tag[] {
    return this.#info.item.tags ?? [];
  }

  get docs(): string | null {
    return this.#info.item.docs ?? null;
  }

  get notes(): string | null {
    return this.#info.item.notes ?? null;
  }
}
