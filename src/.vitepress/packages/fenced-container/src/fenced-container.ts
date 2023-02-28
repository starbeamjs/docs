import { parserPlugin, type PluginHelper } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import { mapEntries, strip } from "@wycatsjs/utils";
import parseFence from "fenceparser";

type OBJECT = ReturnType<typeof parseFence>;
type VALUE = OBJECT[keyof OBJECT];

interface RenderOptions {
  kind: string;
  title: string | null | undefined;
  attrs: Record<string, VALUE>;
  content: string;
  md: PluginHelper;
}

type RenderContainer = ({
  title,
  kind,
  attrs,
  content,
  md,
}: {
  title: string | null | undefined;
  kind: string;
  attrs: Record<string, VALUE>;
  content: string;
  md: PluginHelper;
}) => string;

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

  render(options: RenderOptions): string {
    return this.#renderFn(options);
  }

  get #renderFn(): RenderContainer {
    if ("render" in this.#config) {
      return this.#config.render;
    }

    const renderTitle = (provided: string | null | undefined): string => {
      const title = this.#title(provided);
      return title ? `<p class="custom-block-title">${title}</p>` : "";
    };

    return ({ kind, title: providedTitle, content }) => {
      const title = this.#title(providedTitle);

      return strip`
      <div class="custom-block ${kind}">
        ${renderTitle(title)}
        ${content}
      </div>
      `;
    };
  }

  #title(provided: string | null | undefined): string | undefined {
    if (provided) {
      return provided;
    }

    if ("defaultTitle" in this.#config) {
      return this.#config.defaultTitle ?? undefined;
    }

    return;
  }
}

class Builtins<N extends string> {
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
        render: ({ md }) => {
          return md.error(`Unknown builtin: ${name}`);
        },
      });
    }
  }

  get(name: N): Builtin {
    return this.#builtins[name];
  }
}

const BUILTINS = Builtins.empty()
  .register("info")
  .register("warning")
  .register("error")
  .register("tip")
  .register("lightbulb", {
    defaultTitle: null,
  })
  .register(
    "em",
    ({ title, content, md }) => strip`
      <blockquote class="em">
        ${`<p class="custom-block-title">${title ?? "Key Point"}</p>`}
        ${content}
      </blockquote>
    `
  )
  .register(
    "details",
    ({ title, content, md }) => strip`
      <details>
        <summary>${title ?? "Details"}</summary>
        ${md.render(content)}
      </details>
    `
  );

export const fencedContainerPlugin = parserPlugin({
  name: "fenced-container",
  before: "fence",
}).block((line, md) => {
  if (line.startsWith("```md ")) {
    const fenceline = line.string();
    const info = fenceline.slice("```md ".length);

    // split the fenceline into the part before the first space (kind) and the
    // part after it (params).
    const [kind, params] = split2(info, " ");

    if (kind === undefined) {
      return false;
    }

    const builtin = BUILTINS.tryGet(kind);

    if (builtin === undefined) {
      return false;
    }

    return () => {
      const fenceContent = line.next?.until(
        (line) => line.slice()?.trim() === "```"
      );

      return (render) => {
        const { title, attrs = {} } = parseTitle(params);
        const body = fenceContent ? md.render(fenceContent) : "";

        return render.html(
          builtin.render({ md, kind, title, attrs, content: body })
        );
      };
    };
  } else {
    return false;
  }
});

function parseTitle(params: string | undefined): {
  title?: string | undefined;
  attrs?: Record<string, VALUE> | undefined;
} {
  if (params === undefined) {
    return {};
  }

  const trimmed = params.trim();

  if (trimmed.length === 0) {
    return {};
  }

  const quotedString = trimmed.match(/^\s*"(.*)"\s*$/);

  if (quotedString?.[1]) {
    return { title: quotedString[1] };
  }

  if (trimmed.match(/[{=]/)) {
    const parsed = parseFence(trimmed);

    return { title: String(parsed["title"]) ?? undefined, attrs: parsed };
  }

  return { title: trimmed };
}

function split2(
  string: string,
  delimiter: string
): [string, string | undefined] {
  const index = string.indexOf(delimiter);
  const p0 = index === -1 ? string : string.substring(0, index);
  const p1 = index === -1 ? "" : string.substring(index + 1);

  return [p0, p1];
}
