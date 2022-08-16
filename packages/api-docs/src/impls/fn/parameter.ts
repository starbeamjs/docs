import type * as api from "../../api.js";
import { Type } from "../interface/type.js";

export interface ParameterInfo {
  readonly name: string;
  readonly item: api.Type;

  // If the parameter is a part of an options hash, the parent is the `Parameter` that represents
  // the `options` parameter. This can be nested any number of times.
  readonly parent: Parameter | null;
}

export class Parameter {
  static api(
    name: string,
    item: api.Type,
    options?: { parent: Parameter }
  ): Parameter {
    return new Parameter({
      name,
      item,
      parent: options?.parent ?? null,
    });
  }

  #param: ParameterInfo;

  constructor(param: ParameterInfo) {
    this.#param = param;
  }

  get name(): string {
    return this.#param.name;
  }

  get type(): Type {
    return Type.api(this.#param.item);
  }

  get fullName(): string {
    return this.#param.parent
      ? `${this.#param.parent.fullName}.${this.name}`
      : this.name;
  }

  get #options(): api.Params | null {
    if (this.#param.parent) {
      return this.#param.item[1] as api.Params;
    } else {
      return null;
    }
  }

  get hasOptions(): boolean {
    return !!this.#param.parent;
  }

  *options() {
    const options = this.#options;

    if (options) {
      yield* params(options, this);
    }
  }
}

export function* params(
  params: api.Params,
  parent?: Parameter
): IterableIterator<Parameter> {
  for (const param of Object.entries(params)) {
    yield new Parameter({
      name: param[0],
      item: param[1],
      parent: parent ?? null,
    });
  }
}
