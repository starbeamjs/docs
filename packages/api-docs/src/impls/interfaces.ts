import type { api } from "../index.js";
import type { Fn } from "./fn/fn.js";
import type { InterfaceMembers } from "./interface/members.js";

export type FnKind = "method" | "fn:constructor" | "fn:util";

export interface Documentable {
  readonly docs: string | null;
}

export interface Linkable {
  readonly slug: string;
}

export interface Tagged {
  readonly tags: api.Tag[] | null;
}

export interface FnProtocol {
  readonly kind: FnKind;
  readonly label: string | null;
  readonly fn: Fn;
}

export type HasMembersKind = "fn:constructor" | "interface" | "const";

export interface MembersProtocol {
  readonly kind: HasMembersKind;
  readonly label: string | null;
  readonly members: InterfaceMembers;
}
