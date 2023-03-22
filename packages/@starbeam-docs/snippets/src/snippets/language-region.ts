import type {
  Highlight,
  LanguageRegion,
  Region,
  Snippets,
  Source,
} from "docs-snippet";
import type { HighlightFn, StateEnv } from "../utils.js";

export class RenderLanguageRegion {
  static create({
    filename,
    region,
    parsed,
    kind,
    env,
  }: {
    region: Region;
    parsed: Snippets;
    kind: "ts" | "js";
    filename: string;
    env: StateEnv;
  }) {
    const lang = region[kind];
    const source = parsed[kind];

    return new RenderLanguageRegion({
      kind,
      region: lang,
      parsed,
      source,
      filename,
      env,
    });
  }

  readonly #kind: "ts" | "js";
  readonly #region: LanguageRegion;
  readonly #parsed: Snippets;
  readonly #source: Source;
  readonly #filename: string;
  readonly #env: StateEnv;

  private constructor({
    kind,
    region,
    parsed,
    source,
    filename,
    env,
  }: {
    kind: "ts" | "js";
    region: LanguageRegion;
    parsed: Snippets;
    source: Source;
    filename: string;
    env: StateEnv;
  }) {
    this.#kind = kind;
    this.#region = region;
    this.#parsed = parsed;
    this.#source = source;
    this.#filename = filename;
    this.#env = env;
  }

  get #attr() {
    const attrs: string[] = [];

    const highlights = this.#highlights;
    if (highlights && highlights.length > 0) {
      attrs.push(`{${highlights.map((h) => h.lines).join(",")}}`);
    }

    attrs.push(`filename=${JSON.stringify(this.#filename)} lang=${this.#kind}`);

    return attrs.join(" ");
  }

  highlight(highlight: HighlightFn | null | undefined) {
    const code = this.#region.code;
    const prefix = this.#prefix();
    const postfix = this.#postfix();

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

    return (
      highlight?.(source, "tsx twoslash", this.#attr) ??
      `<pre><code class="language-ts">// @jsxImportSource: preact\n${code}</code></pre>`
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
    return lines.slice(this.#region.offsets.end).join("\n");
  }
}
