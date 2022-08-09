import type MarkdownIt from "markdown-it";
import type Renderer from "markdown-it/lib/renderer.js";
import Token from "markdown-it/lib/token.js";
export class RenderFence {
  #md: MarkdownIt;
  #token: Token;
  #options: MarkdownIt.Options;
  #env: any;
  #self: Renderer;

  constructor(
    md: MarkdownIt,
    token: Token,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) {
    this.#md = md;
    this.#token = token;
    this.#options = options;
    this.#env = env;
    this.#self = self;
  }

  get rules(): Renderer.RenderRuleRecord {
    return this.#md.renderer.rules;
  }

  get options(): MarkdownIt.Options {
    return this.#options;
  }

  get md(): MarkdownIt {
    return this.#md;
  }

  get env(): any {
    return this.#env;
  }

  get self(): Renderer {
    return this.#self;
  }

  get token(): Token {
    return this.#token;
  }

  heading(level: number, source: string): Token[] {
    return this.#md.parse(`${"#".repeat(level)} \`${source}\``, this.#env);
  }

  renderToken(): string {
    return this.#self.renderToken([this.#token], 0, this.#options);
  }

  renderTokens(tokens: Token[]): string {
    let out = "";

    for (let i = 0; i < tokens.length; i++) {
      out += this.#self.renderToken(tokens, i, {
        ...this.#options,
        linkify: false,
      });
    }

    return out;
  }

  parseBlock(source?: string): Token[] {
    if (source) {
      return this.#md.parse(source, this.#env);
    } else {
      return [];
    }
  }

  renderInline(source: string): string {
    return source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  paramEntry(param: { name: string; type: Type; description: string }) {
    return `<dt>${this.renderInline(param.name)}</dt><dd><code>${this.typeName(
      param.type
    )}</code><span>${this.renderInline(param.description)}</span></dd>`;
  }

  typeName(type: Type) {
    // convert explicitly quoted types back into strings

    return this.renderInline(type.names.join(" | "));
  }

  dt(name: string, options: { class: string; if?: () => boolean }): string {
    if (options.if && options.if() === false) {
      return "";
    }

    return `<dt class="${options.class}">${this.renderInline(name)}</dt>`;
  }

  typeDD(item: { type: Type; description: string }) {
    return `<dd><code>${this.typeName(
      item.type
    )}</code><span>${this.renderInline(item.description)}</span></dd>`;
  }
}

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

function heading(level: number, source: string): Token[] {
  const token = new Token("heading_open", `h${level}`, 1);
  token.markup = "####";
  token.block = true;
  return [token, code(source), new Token("heading_close", `h${level}`, -1)];
}

function code(source: string): Token {
  const token = new Token("text", "", 0);
  token.content = source;
  return token;
}
