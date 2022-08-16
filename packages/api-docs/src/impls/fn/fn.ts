import type * as api from "../../api.js";
import { Type } from "../interface/type.js";
import { Parameter } from "./parameter.js";

export interface FnInfo {
  readonly item: api.Fn;
  readonly kind: FnKind;
  readonly name: string;
}

export class Fn {
  static method(name: string, item: api.Fn): Fn {
    return new Fn({
      item,
      kind: "method",
      name,
    });
  }

  static constructorFn(name: string, item: api.ConstructorFn): Fn {
    return new Fn({
      item,
      kind: "fn:constructor",
      name,
    });
  }

  static util(name: string, item: api.UtilFn): Fn {
    return new Fn({
      item,
      kind: "fn:util",
      name,
    });
  }

  readonly generics: Type[] | null;

  #info: FnInfo;
  constructor(info: FnInfo) {
    this.#info = info;

    const generics = info.item.generics;

    if (generics) {
      this.generics = Object.entries(generics).map(([type, docs]) =>
        Type.generic([type, docs])
      );
    } else {
      this.generics = null;
    }
  }

  get name(): string {
    return this.#info.name;
  }

  get kind(): FnKind {
    return this.#info.kind;
  }

  get tags(): api.Tag[] | null {
    return this.#info.item.tags ?? null;
  }

  get params(): Parameter[] {
    const params = this.#info.item.params;

    if (params) {
      return Object.entries(params).map(([name, param]) =>
        Parameter.api(name, param)
      );
    } else {
      return [];
    }
  }

  get ret(): Type {
    const ret = this.#info.item.returns;
    return ret ? Type.api(ret) : Type.void();
  }

  get docs(): string | null {
    return this.#info.item.docs ?? null;
  }
}

export type FnKind = "fn:util" | "fn:constructor" | "method";
