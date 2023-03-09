import type { PluginHelper } from "@jsergo/mdit";
import Token from "markdown-it/lib/token.js";

export type SingleAttrValue = AttrPart | boolean;
export type AttrPart = string | number | null | undefined;
export type AttrValue = SingleAttrValue | AttrPart[];

export class Tokens {
  static empty(md: PluginHelper): Tokens {
    return new Tokens(md);
  }

  readonly #md: PluginHelper;
  readonly #tokens: Token[] = [];

  constructor(md: PluginHelper) {
    this.#md = md;
  }

  open(tag: string, attrs: Record<string, AttrValue> | undefined = {}): this {
    const token = new Token("paragraph_open", tag, 1);

    for (const [key, value] of Object.entries(attrs)) {
      applyValue(token, key, value);
    }

    this.#tokens.push(token);
    return this;
  }

  el(
    tag: string,
    attrs?: Record<string, AttrValue> | Children | undefined,
    children?: Children
  ): this {
    function normalize(): {
      attrs: Record<string, AttrValue>;
      children: Children | undefined;
    } {
      if (
        attrs === undefined ||
        Array.isArray(attrs) ||
        typeof attrs === "function"
      ) {
        return { attrs: {}, children: attrs };
      } else {
        return { attrs, children };
      }
    }

    const { attrs: actualAttrs, children: actualChildren = [] } = normalize();

    const token = new Token("paragraph_open", tag, 1);

    for (const [key, value] of Object.entries(actualAttrs)) {
      applyValue(token, key, value);
    }

    if (actualChildren === undefined) {
      return this;
    }

    if (Array.isArray(actualChildren)) {
      this.#tokens.push(token);
      for (const child of actualChildren) {
        this.#append(child);
      }
    } else if (typeof actualChildren === "function") {
      this.#tokens.push(token);
      actualChildren(this);
    }

    this.close(tag);
    return this;
  }

  close(tag: string): this {
    this.#tokens.push(new Token("paragraph_close", tag, -1));
    return this;
  }

  append(...content: Child[]): this {
    for (const child of content) {
      this.#append(child);
    }
    return this;
  }

  parse(content: string): this {
    this.#tokens.push(...this.#md.parse(content));
    return this;
  }

  if<T>(
    predicate: T,
    content: (
      tokens: Tokens,
      value: Exclude<T, null | undefined | false | "" | 0>
    ) => Tokens
  ): this {
    if (predicate) {
      content(this, predicate as Exclude<T, null | undefined | false | "" | 0>);
    }
    return this;
  }

  #append(child: Child): void {
    if (child === undefined || child === null) {
      return;
    } else if (typeof child === "string") {
      this.#tokens.push(text(child));
    } else if ("render" in child) {
      child.render(this);
    } else {
      this.#tokens.push(child);
    }
  }

  get tokens(): Token[] {
    return this.#tokens;
  }
}

export type Child = LazyChild | Token | string | null | undefined;
export type Children = Child[] | ((tokens: Tokens) => Tokens);

export interface LazyChild {
  render(tokens: Tokens): Tokens;
}

export function text(string: string): Token {
  const token = new Token("text", "", 0);
  token.content = string;
  return token;
}

function applyValue(token: Token, name: string, value: AttrValue): void {
  if (value === undefined || value === false) {
    return;
  } else if (Array.isArray(value)) {
    for (const val of attrListValue(value)) {
      token.attrJoin(name, val);
    }
  } else if (value === true) {
    token.attrSet(name, "");
  } else {
    const val = attrPart(value);
    if (val) {
      token.attrSet(name, val);
    }
  }
}

function attrListValue(value: AttrPart[]) {
  return value.map(attrPart).filter(isPresent);
}

function attrPart(value: AttrPart): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  } else if (typeof value === "number") {
    return String(value);
  } else if (typeof value === "string") {
    return value;
  } else {
    throw unreachable(value);
  }
}

function isPresent<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function unreachable(_value: never, message = "unreachable") {
  throw new Error(message);
}
