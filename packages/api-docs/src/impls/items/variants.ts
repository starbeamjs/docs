import type * as api from "../../api.js";
import { formatSlug } from "../../format.js";
import { Export } from "../exports.js";
import { InterfaceMembers } from "../interface/members.js";
import type { Property } from "../interface/property.js";
import type { Documentable, Linkable } from "../interfaces.js";
import type { Item } from "../items.js";

export interface VariantsInfo {
  readonly name: string;
  readonly item: api.Variants;
  readonly export: Export;
}

export class Variants implements Item {
  static api(name: string, api: api.Variants): Variants {
    return new Variants(name, api);
  }

  readonly kind = "variants";
  readonly #info: VariantsInfo;

  constructor(name: string, api: api.Variants) {
    this.#info = {
      name,
      item: api,
      export: Export.api(name, api),
    };
  }

  get export(): Export {
    return this.#info.export;
  }

  get name(): string {
    return this.#info.name;
  }

  get slug(): string {
    return formatSlug(this.kind, this.name);
  }

  get docs(): string | null {
    return this.#info.item.docs ?? null;
  }

  get variants(): Variant[] {
    return Object.entries(this.#info.item.variants ?? {}).map(
      ([name, e]) => new Variant(this, name, e)
    );
  }
}

export interface VariantInfo {
  readonly parent: Variants;
  readonly name: string;
  readonly item: api.Variant;
}

export class Variant implements Linkable, Documentable {
  static api(parent: Variants, name: string, api: api.Variant): Variant {
    return new Variant(parent, name, api);
  }

  readonly kind = "variant";
  readonly #info: VariantInfo;

  constructor(parent: Variants, name: string, api: api.Variant) {
    this.#info = {
      parent,
      name,
      item: api,
    };
  }

  get name(): string {
    return this.#info.name;
  }

  get properties(): Property[] {
    return this.#members?.properties ?? [];
  }

  get #members(): InterfaceMembers | null {
    const variant = this.#variant;
    let fields: api.VariantFields;

    if (Array.isArray(variant)) {
      fields = variant[1];
    } else {
      fields = variant;
    }

    if (fields === "empty") {
      return null;
    }

    return InterfaceMembers.api(this, { properties: fields });
  }

  get slug(): string {
    return `${this.#info.parent.slug}-${formatSlug(this.name)}`;
  }

  get docs(): string | null {
    if (Array.isArray(this.#variant)) {
      return this.#variant[0];
    } else {
      return null;
    }
  }

  get #variant(): api.Variant {
    return this.#info.item;
  }
}
