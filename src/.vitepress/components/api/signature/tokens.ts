export class TokensBuilder {
  #tokens: ParsedToken[] = [];

  done(): ParsedToken[] {
    return this.#tokens;
  }

  add(punct: Punctuation): this;
  add(kind: string, text: string): this;
  add(kind: string, text?: string): this {
    if (text === undefined) {
      this.add("punct", kind);
    } else {
      this.#tokens.push({ kind, text });
    }
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

  if(condition: boolean, ...tokens: Token[]): this {
    if (condition) {
      this.push(...tokens);
    }
    return this;
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
  | " ";
export type Punctuation =
  | `${PunctuationChar}`
  | `${PunctuationChar}${PunctuationChar}`
  | `${PunctuationChar}${PunctuationChar}${PunctuationChar}`;
export type Shorthand = `${string}:${string}` | Punctuation;
export type TokenTuple = [kind: string, text: string, condition?: boolean];
export type Token =
  | Shorthand
  | [shorthand: Shorthand, condition: boolean]
  | Punctuation;

const PUNCT = /^[()\[\]{},;:.? ]+$/;

export interface ParsedToken {
  kind: string;
  text: string;
  condition?: boolean;
}

function normalize(token: Token): ParsedToken {
  if (typeof token === "string") {
    if (PUNCT.test(token)) {
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
