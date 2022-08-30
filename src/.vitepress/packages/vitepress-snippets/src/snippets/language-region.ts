import type { Highlight, LanguageRegion, Region, Source } from "docs-snippet";
import type MarkdownIt from "markdown-it";
import type { Snippets } from "../../../../../../node_modules/docs-snippet/dist/types/src/snippets.js";

export class RenderLanguageRegion {
  static create(region: Region, parsed: Snippets, kind: "ts" | "js") {
    const lang = region[kind];
    const source = parsed[kind];

    return new RenderLanguageRegion(kind, lang, parsed, source);
  }

  #kind: "ts" | "js";
  #region: LanguageRegion;
  #parsed: Snippets;
  #source: Source;

  private constructor(
    kind: "ts" | "js",
    region: LanguageRegion,
    parsed: Snippets,
    source: Source
  ) {
    this.#kind = kind;
    this.#region = region;
    this.#parsed = parsed;
    this.#source = source;
  }

  highlight(md: MarkdownIt) {
    const highlights = this.#highlights;
    const code = this.#region.code;
    const prefix = this.#prefix();
    const postfix = this.#postfix();

    const attr =
      highlights && highlights.length > 0
        ? `{${highlights.map((h) => h.lines).join(",")}}`
        : "";

    const output = [];

    if (this.#kind === "js") {
      output.push("// @noErrors");
    }

    if (prefix) {
      output.push(prefix);
    }

    if (this.#kind === "js") {
      const dts = this.#dts;

      if (dts) {
        // console.log({ dts });
        output.push(dts.code);
      }
    }

    if (prefix || this.#kind === "js") {
      output.push("// ---cut---");
    }

    output.push(code);

    if (postfix) {
      output.push("// ---cut-after---", postfix);
    }

    const source = output.join("\n").trimEnd();

    console.group("code");
    console.log(source);
    console.groupEnd();

    return (
      md.options.highlight?.(
        source,
        "tsx twoslash",
        attr
        // region.highlights ? this.#shikiAttr(region.highlights) : ""
      ) ?? `<pre><code class="language-ts">${code}</code></pre>`
    );
  }

  get #highlights(): Highlight[] | undefined {
    return this.#region.highlights;
  }

  get #dts(): LanguageRegion | void {
    const regions = this.#parsed.ts.regions;

    if (regions) {
      return regions["dts"];
    }
  }

  #prefix() {
    const lines = this.#source.code.split("\n");
    return lines.slice(0, this.#region.offsets.start).join("\n");
  }

  #postfix() {
    const lines = this.#source.code.split("\n");
    return lines.slice(this.#region.offsets.end + 1).join("\n");
  }
}

function prefix(region: LanguageRegion, complete: Source): string {
  const lines = complete.code.split("\n");
  return lines.slice(0, region.offsets.start).join("\n");
}

function postfix(region: LanguageRegion, complete: Source): string {
  const lines = complete.code.split("\n");
  return lines.slice(region.offsets.end + 1).join("\n");
}

function highlightLang(
  md: MarkdownIt,
  {
    code,
    highlights,
    prefix,
    postfix,
  }: {
    code: string;
    highlights?: Highlight[];
    prefix?: string;
    postfix?: string;
  }
): string {
  const attr =
    highlights && highlights.length > 0
      ? `{${highlights.map((h) => h.lines).join(",")}}`
      : "";

  const output = [];

  if (prefix) {
    output.push(prefix, "// ---cut---");
  }

  output.push(code);

  if (postfix) {
    output.push("// ---cut-after---", postfix);
  }

  const source = output.join("\n").trimEnd();

  // console.group("code");
  // console.log(source);
  // console.groupEnd();

  return (
    md.options.highlight?.(
      source,
      "ts twoslash",
      attr
      // region.highlights ? this.#shikiAttr(region.highlights) : ""
    ) ?? `<pre><code class="language-ts">${code}</code></pre>`
  );
}
