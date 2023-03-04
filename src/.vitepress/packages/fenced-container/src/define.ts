import type { PluginHelper } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import { mapEntries } from "@wycatsjs/utils";
import parseFence from "fenceparser";
import Token from "markdown-it/lib/token.js";
import { HTML, If } from "./nodes.js";
import { Tokens, type LazyChild } from "./tokens.js";

type OBJECT = ReturnType<typeof parseFence>;
type VALUE = OBJECT[keyof OBJECT];

interface RenderOptions {
  kind: string;
  title: string | null | undefined;
  attrs: Record<string, VALUE>;
  content: UnparsedContent | undefined;
  md: PluginHelper;
}

export class UnparsedContent implements LazyChild {
  static of(content: string | undefined): UnparsedContent {
    return new UnparsedContent(content);
  }

  readonly #content: string | undefined;

  private constructor(content: string | undefined) {
    this.#content = content;
  }

  get raw(): string | undefined {
    return this.#content;
  }

  render(tokens: Tokens): Tokens {
    if (this.#content) {
      return tokens.parse(this.#content);
    }
    return tokens;
  }
}

type RenderContainer = ({
  title,
  kind,
  attrs,
  content,
  md,
  tokens,
}: {
  title: string | null | undefined;
  kind: string;
  attrs: Record<string, VALUE>;
  content: UnparsedContent | undefined;
  md: PluginHelper;
  tokens: Tokens;
}) => Token[] | Tokens;

type BuiltinConfig =
  | {
      defaultTitle?: string | null | undefined;
    }
  | {
      render?: RenderContainer;
    };

class Builtin {
  readonly #config: BuiltinConfig;

  constructor(config: BuiltinConfig) {
    this.#config = config;
  }

  render(options: RenderOptions): Token[] {
    const tokens = this.#renderFn({
      ...options,
      tokens: Tokens.empty(options.md),
    });

    if (Array.isArray(tokens)) {
      return tokens;
    } else {
      return tokens.tokens;
    }
  }

  get #renderFn(): RenderContainer {
    if ("render" in this.#config) {
      return this.#config.render;
    }

    return ({ md, kind, title: providedTitle, content }) => {
      const title = this.#title(providedTitle);

      return Tokens.empty(md).el("div", { class: ["custom-block", kind] }, [
        If(title, (title, tokens) =>
          tokens.el("p", { class: "custom-block-title" }, [title])
        ),
        content,
      ]).tokens;
    };
  }

  #title(provided: string | null | undefined): string | undefined {
    if (provided) {
      return provided;
    }

    if (
      "defaultTitle" in this.#config &&
      typeof this.#config.defaultTitle === "string"
    ) {
      return this.#config.defaultTitle;
    }

    return;
  }
}

export class Builtins<N extends string> {
  static empty(): Builtins<never> {
    return new Builtins({});
  }

  static from<N extends string>(config: Record<N, BuiltinConfig>) {
    return new Builtins(
      mapEntries(config, (config, name) => [name, new Builtin(config)])
    );
  }

  readonly #builtins: Record<N, Builtin>;

  constructor(builtins: Record<N, Builtin>) {
    this.#builtins = builtins;
  }

  register<NewName extends string>(
    name: NewName,
    config?: BuiltinConfig | string | RenderContainer
  ): Builtins<N | NewName> {
    function normalize(): BuiltinConfig {
      if (typeof config === "string") {
        return { defaultTitle: config };
      } else if (typeof config === "function") {
        return { render: config };
      } else if (config === undefined) {
        return { defaultTitle: name.toUpperCase() };
      } else {
        return config;
      }
    }

    return new Builtins({
      ...this.#builtins,
      [name]: new Builtin(normalize()),
    } as Record<N | NewName, Builtin>);
  }

  tryGet(name: string): Builtin | undefined {
    if (name in this.#builtins) {
      return this.#builtins[name as N];
    } else {
      return new Builtin({
        render: ({ tokens, md }) =>
          tokens.append(HTML(md.error(`Unknown builtin: ${name}`))),
      });
    }
  }

  get(name: N): Builtin {
    return this.#builtins[name];
  }
}
