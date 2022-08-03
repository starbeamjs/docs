export interface ExplainedFunction extends Explained {
  kind: "function";
  params: Param[];
  returns: Returns[];
}

export interface ExplainedMember extends Explained {
  kind: "member";
  properties: Property[];
  tags: Tag[];
}

interface ExplainedOther extends Explained {
  kind:
    | "class"
    | "constant"
    | "event"
    | "external"
    | "file"
    | "mixin"
    | "module"
    | "namespace"
    | "typedef";
}

export type Signature = ExplainedFunction | ExplainedMember | ExplainedOther;

export interface Explained {
  comment: string;
  meta: {
    range: [start: number, end: number];
    filename: string;
    lineno: string;
    columnno: string;
    code: {
      id: string;
      name: string;
      type: string;
      paramnames: string[];
    };
  };
  name: string;
  longname: string;
  // "function" | "member"
  kind: string;
  // "global"
  scope: string;
}

export function explainSync(options: { source: string }): Signature[];

export interface Type {
  names: string[];
}

export interface Param {
  type: Type;
  description: string;
  name: string;
}

export interface Option {
  type: Type;
  description: string;
  param: string;
  name: string;
}

export interface Returns {
  type: Type;
  description: string;
}

export interface Property {
  type: Type;
  description: string;
  name: string;
}

export interface Tag {
  originalTitle: string;
  title: string;
  text: string;
  value: string;
}
