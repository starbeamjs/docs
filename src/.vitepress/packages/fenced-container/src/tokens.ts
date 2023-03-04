import type { PluginHelper } from "@jsergo/mdit";
import Token from "markdown-it/lib/token.js";

export class Tokens {
  static empty(md: PluginHelper): Tokens {
    return new Tokens(md);
  }

  readonly #md: PluginHelper;
  readonly #tokens: Token[] = [];

  constructor(md: PluginHelper) {
    this.#md = md;
  }

  open(
    tag: string,
    attrs: Record<string, string | string[]> | undefined = {}
  ): this {
    const token = new Token("paragraph_open", tag, 1);

    for (const [key, value] of Object.entries(attrs)) {
      if (Array.isArray(value)) {
        for (const v of value) {
          token.attrJoin(key, v);
        }
      } else {
        token.attrSet(key, value);
      }
    }

    this.#tokens.push(token);
    return this;
  }

  el(
    tag: string,
    attrs?: Record<string, string | string[]> | Children | undefined,
    children?: Children
  ): this {
    function normalize(): {
      attrs: Record<string, string | string[]>;
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
      if (Array.isArray(value)) {
        for (const v of value) {
          token.attrJoin(key, v);
        }
      } else {
        token.attrSet(key, value);
      }
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
    if (child === undefined) {
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

export type Child = LazyChild | Token | string | undefined;
export type Children = Child[] | ((tokens: Tokens) => Tokens);

export interface LazyChild {
  render(tokens: Tokens): Tokens;
}

function text(string: string): Token {
  const token = new Token("text", "", 0);
  token.content = string;
  return token;
}
