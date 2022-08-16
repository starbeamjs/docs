import { formatSlug } from "../../format.js";
import type { api } from "../../index.js";
import { Export } from "../exports.js";
import { InterfaceMembers } from "../interface/members.js";
import type { MembersProtocol } from "../interfaces.js";
import type { Item } from "../items.js";

export interface InterfaceInfo {
  readonly name: string;
  readonly item: api.Interface;
  readonly members: InterfaceMembers;
  readonly export: Export;
}

export class Interface implements Item, MembersProtocol {
  static api(name: string, api: api.Interface): Interface {
    return new Interface(name, api);
  }

  readonly kind = "interface";
  readonly label = "interface";
  readonly #info: InterfaceInfo;

  constructor(name: string, api: api.Interface) {
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
