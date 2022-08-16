import type * as api from "../../api.js";
import { normalizeProperty } from "../../utils.js";
import { Fn } from "../fn/fn.js";
import type { Linkable } from "../interfaces.js";
import { Method } from "./method";
import { Property } from "./property";

export interface InterfaceMembersInfo {
  readonly item: { properties?: api.Properties; methods?: api.Methods };
  readonly parent: Linkable;
}

export class InterfaceMembers implements Linkable {
  static api(
    parent: Linkable,
    api: { properties?: api.Properties; methods?: api.Methods }
  ): InterfaceMembers {
    return new InterfaceMembers({
      item: api,
      parent,
    });
  }

  #info: InterfaceMembersInfo;

  constructor(info: InterfaceMembersInfo) {
    this.#info = info;
  }

  get slug() {
    return `${this.#info.parent.slug}--members`;
  }

  get hasMethods(): boolean {
    return !!this.#info.item.methods;
  }

  get methods(): Method[] {
    return Object.entries(this.#info.item.methods ?? {}).map(
      ([name, e]) =>
        new Method({
          item: Fn.method(name, e),
          placement: e.placement ?? "instance",
          parent: this.#info.parent,
        })
    );
  }

  get hasProperties(): boolean {
    return !!this.#info.item.properties;
  }

  get properties(): Property[] {
    return Object.entries(this.#info.item.properties ?? {}).map(
      ([name, e]) => new Property(normalizeProperty(this.#info.parent, name, e))
    );
  }
}
