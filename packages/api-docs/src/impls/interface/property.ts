import type * as api from "../../api.js";
import { formatSlug } from "../../format.js";
import type { Documentable, Linkable, Tagged } from "../interfaces.js";
import { Type } from "./type.js";

export interface PropertyInfo {
  readonly parent: Linkable;
  readonly name: string;
  readonly type: api.TypeWithDocs;
  readonly modifiers?: api.PropertyModifier[];
  readonly tags?: api.Tag[] | null;
}

export class Property implements Linkable, Documentable, Tagged {
  readonly #info: PropertyInfo;

  constructor(info: PropertyInfo) {
    this.#info = info;
  }

  get name(): string {
    return this.#info.name;
  }

  get modifiers(): api.PropertyModifier[] | null {
    return this.#info.modifiers ?? null;
  }

  get type(): Type {
    return Type.property(this.#info.type, this.#info.modifiers);
  }

  get slug() {
    return `${this.#info.parent.slug}-${formatSlug("property", this.name)}`;
  }

  get docs(): string | null {
    return this.#info.type[1] ?? null;
  }

  get tags(): api.Tag[] | null {
    return this.#info.tags ?? null;
  }
}
