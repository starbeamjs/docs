import { formatSlug } from "../../format.js";
import type { api } from "../../index.js";
import { Export } from "../exports.js";
import { Fn } from "../fn/fn.js";
import { InterfaceMembers } from "../interface/members.js";
import type { FnProtocol, MembersProtocol } from "../interfaces.js";
import type { Item } from "../items.js";

export interface ConstructorFnInfo {
  readonly name: string;
  readonly fn: Fn;
  readonly members: InterfaceMembers;
  readonly export: Export;
}

export class ConstructorFn implements Item, FnProtocol, MembersProtocol {
  static api(name: string, api: api.ConstructorFn): ConstructorFn {
    return new ConstructorFn(name, api);
  }

  readonly kind = "fn:constructor";
  readonly label = "function";
  readonly #info: ConstructorFnInfo;

  constructor(name: string, api: api.ConstructorFn) {
    this.#info = {
      name,
      fn: Fn.constructorFn(name, api),
      members: InterfaceMembers.api(this, api),
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

  get members(): InterfaceMembers {
    return this.#info.members;
  }

  get docs(): string | null {
    return this.#info.fn.docs;
  }

  get slug(): string {
    return formatSlug(this.kind, this.name);
  }
}
