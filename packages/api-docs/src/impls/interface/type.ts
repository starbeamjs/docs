import type * as api from "../../api.js";
import { Parameter, params } from "../fn/parameter.js";

export interface TypeInfo {
  readonly type: api.Type;
  readonly extends: string | null;
  readonly modifiers: api.PropertyModifier[] | null;
}

export interface Type {
  readonly name: string;
  readonly docs: string | null;
  readonly optional: boolean;
  readonly extends: string | null;
  readonly modifiers: api.PropertyModifier[] | null;
}

export const Type = {
  void(): Type {
    return Type.api(["void"]);
  },

  api(type: api.Type): Type {
    return new RegularType({
      type,
      extends: null,
      modifiers: null,
    });
  },

  generic(type: api.Type): Type {
    const name = type[0].split(" extends ", 2);
    type[0] = name[0];

    return new RegularType({
      type,
      extends: name[1],
      modifiers: null,
    });
  },

  property(type: api.Type, modifiers?: api.PropertyModifier[]): Type {
    return new RegularType({
      type,
      extends: null,
      modifiers: modifiers ?? null,
    });
  },

  options(options: api.Options): OptionsType {
    const type = Type.api(options);
    return new OptionsType({
      item: options,
      type,
    });
  },
};

export class RegularType implements Type {
  #info: TypeInfo;

  constructor(info: TypeInfo) {
    this.#info = info;
  }

  get name(): string {
    return this.#info.type[0];
  }

  get extends(): string | null {
    return this.#info.extends ?? null;
  }

  get modifiers(): api.PropertyModifier[] | null {
    return this.#info.modifiers;
  }

  get docs(): string | null {
    const type = this.#info.type;

    if (type.length === 2 && typeof type[1] === "string") {
      return type[1] ?? null;
    }

    return null;
  }

  get optional(): boolean {
    return this.#info.type[0].endsWith("?");
  }
}

export interface OptionsTypeInfo {
  readonly item: api.Options;
  readonly type: Type;
}

export class OptionsType {
  readonly name = "object";

  #info: OptionsTypeInfo;

  constructor(info: OptionsTypeInfo) {
    this.#info = info;
  }

  get optional() {
    return this.#info.type.optional;
  }

  *options(parent: Parameter): IterableIterator<Parameter> {
    const options = this.#info.item[1];

    yield* params(options, parent);
  }
}
