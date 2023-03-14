import type { PluginHelper, Render } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import { mapEntries } from "@wycatsjs/utils";
import parseFence from "fenceparser";
import Token from "markdown-it/lib/token.js";
import { El, HTML, If, type LazyChildren } from "./nodes.js";
import {
  MarkdownElement,
  ParagraphElement,
  text,
  type LazyChild,
  CustomBuiltin,
  BasicFragment,
} from "./tokens.js";

type OBJECT = ReturnType<typeof parseFence>;
type VALUE = OBJECT[keyof OBJECT];
export const CUSTOM_EL = "CustomBlock";

interface RenderOptions {
  kind: string;
  /**
   * false means "leave out the title"
   * undefined means "use the default title"
   */
  title: Title;
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

  render(tokens: MarkdownElement): MarkdownElement {
    if (this.#content) {
      return tokens.html(this.#content);
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
  define,
}: {
  title: Title;
  kind: string;
  attrs: Record<string, VALUE>;
  content: UnparsedContent | undefined;
  md: PluginHelper;
  define: CustomBuiltin;
}) => LazyChildren;

type BuiltinConfig =
  | {
      defaultTitle?: string | null | undefined;
      colors?: {
        fg?: string | undefined;
        bg?: string | undefined;
        border?: string | undefined;
      };
    }
  | CustomConfig;

/**
 * A bare string is the default title.
 */
type BasicConfig =
  | {
      defaultTitle?: string | null | undefined;
      colors?: {
        fg?: string | undefined;
        bg?: string | undefined;
        border?: string | undefined;
      };
    }
  | string;

interface CustomConfig {
  render: RenderContainer;
  options?: {} | undefined;
}

class Builtin {
  readonly #config: BuiltinConfig;

  constructor(config: BuiltinConfig) {
    this.#config = config;
  }

  render(options: RenderOptions): Token[] {
    const result = this.#renderFn({
      ...options,
      define: new CustomBuiltin(options.md),
    });

    const fragment = BasicFragment.empty(options.md);

    if (Array.isArray(result)) {
      fragment.push(...result);
    } else {
      fragment.push(result);
    }

    return fragment.done();
  }

  get #renderFn(): RenderContainer {
    if (
      typeof this.#config === "object" &&
      "render" in this.#config
    ) {
      return this.#config.render;
    }

    const defaultBg = "var(--sbdoc-default-block-bg)";
    const defaultFg = "var(--sbdoc-default-block-fg)";
    const bgcolor = this.#config.colors?.bg ?? defaultBg;
    const fgcolor = this.#config.colors?.fg ?? defaultFg;
    const border = this.#config.colors?.border ?? fgcolor;
    console.log({ config: this.#config, bgcolor });

    return ({ md, kind, title: providedTitle, content }) => {
      const title = providedTitle.withDefault(
        this.#defaultTitle ?? undefined
      );

      return ParagraphElement.tag(CUSTOM_EL, md)
        .attrs({
          class: [kind],
          style: `--sbdoc-local-bg: ${bgcolor}; --sbdoc-local-fg: ${fgcolor}; --sbdoc-local-border-color: ${border};`,
        })
        .append(
          If(title, (title) =>
            El("p", { class: "custom-block-title" }, [title])
          )
        )
        .append(content);
    };

    //   { class: [kind] }, [
    //     If(title, (title, tokens) =>
    //       tokens.el("p", { class: "custom-block-title" }, [
    //         title,
    //       ])
    //     ),
    //     content,
    //   ]).tokens;
    // };
  }

  get #defaultTitle(): string | void {
    if (
      typeof this.#config === "object" &&
      "defaultTitle" in this.#config &&
      typeof this.#config.defaultTitle === "string"
    ) {
      return this.#config.defaultTitle;
    }
  }
}

export class Title implements LazyChild {
  static provided(provided: string | false | undefined): Title {
    return new Title(provided, undefined);
  }

  static create(
    provided: string | false | undefined,
    defaultValue: string | undefined
  ): Title {
    return new Title(provided, defaultValue);
  }

  readonly #provided: string | undefined | false;
  readonly #default: string | undefined;

  private constructor(
    provided: string | false | undefined,
    defaultValue: string | undefined
  ) {
    this.#provided = provided;
    this.#default = defaultValue;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Title(${JSON.stringify(String(this))})`;
  }

  withDefault(defaultValue: string | undefined): Title {
    return new Title(this.#provided, defaultValue);
  }

  render(tokens: MarkdownElement): MarkdownElement {
    return tokens.append(text(String(this)));
  }

  isBlank(): boolean {
    return this.#provided === false;
  }

  map<T>(callback: (title: string) => T): T | null {
    const title = String(this);

    if (title === "") {
      return null;
    } else {
      return callback(title);
    }
  }

  exists(): boolean {
    if (this.#provided === false) {
      return false;
    } else if (this.#provided === undefined) {
      return this.#default !== undefined;
    } else {
      return true;
    }
  }

  get provided(): string | undefined | false {
    return this.#provided;
  }

  toString(): string {
    if (this.#provided === false) {
      return "";
    } else if (this.#provided === undefined) {
      return this.#default ?? "";
    } else {
      return this.#provided;
    }
  }
}

export class Builtins<N extends string> {
  static empty(): Builtins<never> {
    return new Builtins({});
  }

  static from<N extends string>(
    config: Record<N, BuiltinConfig>
  ) {
    return new Builtins(
      mapEntries(config, (config, name) => [
        name,
        new Builtin(config),
      ])
    );
  }

  readonly #builtins: Record<N, Builtin>;

  constructor(builtins: Record<N, Builtin>) {
    this.#builtins = builtins;
  }

  custom<NewName extends string>(
    name: NewName,
    render: RenderContainer
  ): Builtins<N | NewName> {
    return new Builtins({
      ...this.#builtins,
      [name]: new Builtin({
        render,
      }),
    } as Record<N | NewName, Builtin>);
  }

  basic<NewName extends string>(
    name: NewName,
    config?: BasicConfig
  ): Builtins<N | NewName> {
    const defaultTitle =
      typeof config === "string"
        ? config
        : config?.defaultTitle ?? name.toLocaleUpperCase();

    return new Builtins({
      ...this.#builtins,
      [name]: new Builtin({
        ...(typeof config === "string" ? {} : config),
        defaultTitle,
      }),
    } as Record<N | NewName, Builtin>);
  }

  tryGet(name: string): Builtin | undefined {
    return (this.#builtins as Record<string, Builtin>)[name];
  }

  get(name: N): Builtin {
    return this.#builtins[name];
  }
}
