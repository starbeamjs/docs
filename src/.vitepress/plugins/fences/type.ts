import type MarkdownIt from "markdown-it";
import type Renderer from "markdown-it/lib/renderer.js";

export class RenderFence {
  #md: MarkdownIt;
  #render: () => string;
  #options: MarkdownIt.Options;
  #env: any;
  #self: Renderer;

  constructor(
    md: MarkdownIt,
    render: () => string,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) {
    this.#md = md;
    this.#render = render;
    this.#options = options;
    this.#env = env;
    this.#self = self;
  }

  renderToken(): string {
    return this.#render();
  }

  renderBlock(source: string): string {
    return this.#md.render(source, this.#env);
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

    return this.renderInline(type.names.map((n) => JSON.parse(n)).join(" | "));
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
