export class TokensBuilder {
  #tokens: ParsedToken[] = [];
  #dimming = false;
  #indent = 0;

  done(): ParsedToken[] {
    return this.#tokens;
  }

  string(text: string): this {
    return this.add('"').add("string", text).add('"');
  }

  add(punct: Punctuation | "\n"): this;
  add(block: (tokens: this) => void): this;
  add(kind: string, text: string): this;
  add(kind: string | ((tokens: this) => void), text?: string): this {
    if (text === undefined) {
      if (typeof kind === "function") {
        kind(this);
      } else if (kind === "\n") {
        this.#newline();
      } else {
        this.#push("punct", kind);
      }
    } else {
      this.#push(kind as string, text);
    }
    return this;
  }

  dim(block: (token: this) => void): this {
    this.#dimming = true;
    block(this);
    this.#dimming = false;
    return this;
  }

  indent(block: (builder: this) => void): this {
    this.#indent++;
    block(this);
    this.#indent--;
    return this;
  }

  #newline(): void {
    this.#tokens.push({
      kind: "newline",
      text: "\n",
    });
    if (this.#indent) {
      this.#tokens.push({
        kind: "indent",
        text: "  ".repeat(this.#indent),
      });
    }
  }

  #push(kind: string, text: string) {
    const token = {
      ...parseKind(kind),
      text,
    };

    if (this.#dimming) {
      addClass(token, "dim");
    }

    this.#tokens.push(token);
    return this;
  }

  push(...tokens: Token[]): this {
    this.#tokens.push(...tokens.map(normalize));
    return this;
  }

  map<T>(input: T[], mapper: (input: T, builder: this) => this): this {
    for (const item of input) {
      mapper(item, this);
    }
    return this;
  }

  if(condition: unknown, ...tokens: Token[]): this;
  if(condition: unknown, tokens: (builder: this) => this): this;
  if(
    condition: unknown,
    token: Token | ((builder: this) => this),
    ...tokens: Token[]
  ): this {
    if (condition) {
      if (typeof token === "function") {
        token(this);
      } else {
        this.push(token, ...tokens);
      }
    }
    return this;
  }
}

function addClass(token: ParsedToken, className: string): ParsedToken {
  if (token.class) {
    const classes = new Set(token.class.split(" "));
    classes.add(className);
    token.class = [...classes].join(" ");
  } else {
    token.class = className;
  }
  return token;
}

function parseKind(kind: string): { kind: string; class?: string } {
  const [name, ...rest] = kind.split(" ");

  if (rest.length === 0) {
    return {
      kind: name,
    };
  } else {
    return {
      kind: name,
      class: rest.join(" "),
    };
  }
}

export function tokens(): TokensBuilder {
  return new TokensBuilder();
}

export type PunctuationChar =
  | "("
  | ")"
  | "["
  | "]"
  | "{"
  | "}"
  | ","
  | ";"
  | ":"
  | "."
  | "?"
  | " "
  | "`"
  | `"`
  | `'`;
export type Punctuation =
  | `${PunctuationChar}`
  | `${PunctuationChar}${PunctuationChar}`
  | `${PunctuationChar}${PunctuationChar}${PunctuationChar}`;
export type Shorthand = `${string}:${string}` | Punctuation | "\n";
export type TokenTuple = [kind: string, text: string, condition?: boolean];
export type Token =
  | Shorthand
  | [shorthand: Shorthand, condition: boolean]
  | Punctuation;

const PUNCT = /^[()\[\]{},;:.?"'` ]+$/;

export interface ParsedToken {
  kind: string;
  text: string;
  class?: string;
  condition?: boolean;
}

function normalize(token: Token): ParsedToken {
  if (typeof token === "string") {
    if (token === "\n") {
      return { kind: "newline", text: token };
    } else if (PUNCT.test(token)) {
      return { kind: "punct", text: token };
    } else {
      const [kind, text] = token.split(":");
      return { kind, text };
    }
  } else {
    return {
      ...normalize(token[0]),
      condition: token[1],
    };
  }
  // return text.replace(/\s+/g, ' ').trim();
}
