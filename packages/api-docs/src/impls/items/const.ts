import { formatSlug } from "../../format.js";
import type { api } from "../../index.js";
import { Export } from "../exports.js";
import { InterfaceMembers } from "../interface/members.js";
import type { MembersProtocol } from "../interfaces.js";
import type { Item } from "../items.js";

export interface ConstInfo {
  readonly name: string;
  readonly item: api.Const;
  readonly members: InterfaceMembers;
  readonly export: Export;
}

export class Const implements Item, MembersProtocol {
  static api(name: string, api: api.Const): Const {
    return new Const(name, api);
  }

  readonly kind = "const";
  readonly label = "const";
  readonly #info: ConstInfo;

  constructor(name: string, api: api.Const) {
    this.#info = {
      name,
      item: api,
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

  get slug(): string {
    return formatSlug(this.kind, this.name);
  }

  get docs(): string | null {
    return this.#info.item.docs ?? null;
  }

  get members(): InterfaceMembers {
    return this.#info.members;
  }
}
