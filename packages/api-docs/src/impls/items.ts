import type { Export } from "./exports.js";
import type { Documentable, Linkable, MembersProtocol } from "./interfaces.js";
import { Const } from "./items/const.js";
import { ConstructorFn } from "./items/constructor-fn.js";
import { Interface } from "./items/interface.js";
import { UtilFn } from "./items/util-fn.js";
import { Variants } from "./items/variants.js";

export type ItemKind =
  | "fn:constructor"
  | "fn:util"
  | "interface"
  | "const"
  | "variants";

/**
 * An item is an export that is accessible as a public API.
 */
export interface Item extends Linkable, Documentable {
  readonly export: Export;
}

export const ExportItem = {
  hasMembers(item: ExportItem | MembersProtocol): item is MembersProtocol {
    switch (item.kind) {
      case "fn:constructor":
      case "interface":
      case "const":
        return true;
      default:
        return false;
    }
  },
};

export type ExportItem = ConstructorFn | UtilFn | Interface | Const | Variants;
export { ConstructorFn, UtilFn, Interface, Const, Variants };
