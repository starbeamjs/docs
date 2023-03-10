import { parserPlugin } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import parseFence from "fenceparser";
import { Builtins, Title, UnparsedContent } from "./define.js";
import { Do, El } from "./nodes.js";
import type { AttrPart, AttrValue } from "./tokens.js";

type OBJECT = ReturnType<typeof parseFence>;
type VALUE = OBJECT[keyof OBJECT];

const BUILTINS = Builtins.empty()
  .register("info")
  .register("warning")
  .register("error")
  .register("tip", { defaultTitle: null })
  .register("callout", { defaultTitle: null })
  .register("💡", ({ tokens, title, content }) =>
    tokens.el("div", { class: ["custom-block", "lightbulb"] }, [title, content])
  )
  .register("lang-ts", ({ tokens, content }) =>
    tokens.el("div", { class: ["lang-ts"] }, [content])
  )
  .register("em", ({ tokens, title, content }) =>
    tokens.el("blockquote", { class: "em" }, [title ?? "Key Point", content])
  )
  .register("persona", ({ tokens, title, content }) =>
    tokens.el("aside", { class: ["persona", String(title)] }, [content])
  )
  .register("details", ({ title, content, attrs, tokens }) => {
    return tokens.el(
      "details",
      {
        class: ["custom-block", "container", ...normalizePart(attrs["type"])],
      },
      [
        Do(() => {
          function titleChild() {
            switch (attrs["type"]) {
              case "deep-dive":
                // TODO:: Generalize
                return [El("span", ["Deep Dive"]), title];
              default:
                return [title.withDefault("Details")];
            }
          }

          console.log(titleChild());
          return [El("summary", { class: "custom-block-title" }, titleChild())];
        }),
        content,
      ]
    );
  });

export const fencedContainerPlugin = parserPlugin({
  name: "fenced-container",
  before: "fence",
}).block((line, md) => {
  const matched = line.matchStart(/^(?<ticks>````*)md /);

  if (matched.type === "error") {
    return () => (render) => render.html(md.error(matched.error));
  } else if (matched.type === "unmatched") {
    return false;
  }

  const ticks = matched.raw.groups?.["ticks"] as string;
  const fenceline = line.string();
  const info = fenceline.slice(matched.fragment.length);

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
      (line) => line.slice()?.trim() === ticks
    );

    return (render) => {
      const { title, attrs = {} } = parseTitle(params);

      const rendered = builtin.render({
        md,
        kind,
        title: Title.provided(title),
        attrs,
        content: UnparsedContent.of(fenceContent),
      });

      return render.tokens(rendered);
    };
  };
});

function parseTitle(params: string | undefined): {
  /**
   * false means "no title"
   * undefined means "default title"
   *
   * if no title is provided, the value will be undefined
   */
  title?: string | false | undefined;
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

    const title = getTitle(parsed["title"]);

    return { title, attrs: parsed };
  }

  return { title: trimmed };
}

function getTitle(title: VALUE): string | false | undefined {
  if (title === undefined) {
    return undefined;
  } else if (title === false || title === null) {
    return false;
  } else {
    return String(title);
  }
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

function normalize(value: VALUE): AttrValue {
  if (value === null || value === undefined) {
    return undefined;
  } else if (Array.isArray(value)) {
    return value.flatMap(normalizePart);
  } else if (typeof value === "object") {
    throw Error(`Objects are not currently supported as attr values.`);
  } else {
    return normalizePart(value);
  }
}

function normalizePart(value: VALUE): AttrPart[] {
  if (value === null || value === undefined) {
    return [];
  } else if (Array.isArray(value)) {
    return value.flatMap(normalizePart).filter(isPresent);
  } else if (typeof value === "string") {
    return [value];
  } else if (typeof value === "number") {
    return [String(value)];
  } else if (typeof value === "boolean") {
    throw Error(`Booleans are not supported as part of an attr array.`);
  } else {
    throw Error(
      `Object are not supported as part of an attr array. You passed ${JSON.stringify(
        value
      )}`
    );
  }
}

function isPresent<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}
