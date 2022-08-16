import { formatSlug } from "../../format.js";
import type { Fn } from "../fn/fn.js";
import type { Documentable, FnProtocol, Linkable } from "../interfaces.js";

export interface MethodInfo {
  readonly item: Fn;
  readonly placement: "static" | "instance";
  readonly parent: Linkable;
}

export class Method implements Linkable, Documentable, FnProtocol {
  readonly kind = "method";
  #info: MethodInfo;

  constructor(info: MethodInfo) {
    this.#info = info;
  }

  get name() {
    return this.#info.item.name;
  }

  get label(): string | null {
    if (this.#info.placement === "static") {
      return "static";
    } else {
      return null;
    }
  }

  get slug() {
    return `${this.#info.parent.slug}-${formatSlug(this.kind, this.fn.name)}`;
  }

  get fn(): Fn {
    return this.#info.item;
  }

  get docs(): string | null {
    return this.#info.item.docs;
  }
}
