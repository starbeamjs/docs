import { parserPlugin } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import parseFence from "fenceparser";
import { Builtins, UnparsedContent } from "./define.js";
import { El, If } from "./nodes.js";

type OBJECT = ReturnType<typeof parseFence>;
type VALUE = OBJECT[keyof OBJECT];

const BUILTINS = Builtins.empty()
  .register("info")
  .register("warning")
  .register("error")
  .register("tip")
  .register("lightbulb", {
    defaultTitle: null,
  })
  .register("em", ({ tokens, title, content }) =>
    tokens.el("blockquote", { class: "em" }, [title ?? "Key Point", content])
  )
  .register("details", ({ title, content, tokens }) =>
    tokens.el(
      "details",
      {
        class: ["custom-block", "container"],
      },
      [
        If(title, ($) => [El("summary", { class: "custom-block-title" }, [$])]),
        content,
      ]
    )
  );

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
        title,
        attrs,
        content: UnparsedContent.of(fenceContent),
      });

      return render.tokens(rendered);
    };
  };
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
