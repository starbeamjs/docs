import { formatSlug } from "../../format.js";
import type { api } from "../../index.js";
import { Export } from "../exports.js";
import { Fn } from "../fn/fn.js";
import type { FnProtocol } from "../interfaces.js";
import type { Item } from "../items.js";

export interface UtilFnInfo {
  readonly name: string;
  readonly fn: Fn;
  readonly export: Export;
}

export class UtilFn implements Item, FnProtocol {
  static api(name: string, api: api.UtilFn): UtilFn {
    return new UtilFn(name, api);
  }

  readonly kind = "fn:util";
  readonly label = "function";
  readonly #info: UtilFnInfo;

  constructor(name: string, api: api.UtilFn) {
    this.#info = {
      name,
      fn: Fn.util(name, api),
      export: Export.api(name, api),
    };
  }

  get name(): string {
    return this.#info.name;
  }

  get export(): Export {
    return this.#info.export;
  }

  get fn(): Fn {
    return this.#info.fn;
  }

  get docs(): string | null {
    return this.#info.fn.docs;
  }

  get slug(): string {
    return formatSlug(this.kind, this.name);
  }
}
