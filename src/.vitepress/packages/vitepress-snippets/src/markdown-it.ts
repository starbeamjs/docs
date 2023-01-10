import "@mdit-vue/plugin-sfc";
import Snippet, { type Highlight, type Region } from "docs-snippet";
import type MarkdownIt from "markdown-it";
import path from "node:path";
import type { RuleBlock } from "../../../../../node_modules/@types/markdown-it/lib/parser_block.js";
import type { Snippets } from "../../../../../node_modules/docs-snippet/dist/types/src/snippets.js";
import type { VitepressStateBlock } from "../../../plugins/markdown/env.js";
import { RenderLanguageRegion } from "./snippets/language-region.js";
import { MDState } from "./utils.js";

export function snippetPlugin(md: MarkdownIt, srcDir: string) {
  const parser: RuleBlock = (
    state: VitepressStateBlock,
    startLine,
    _endLine,
    silent
  ): boolean => {
    const CH = ";".charCodeAt(0);

    const mdState = new MDState(state);
    const line = mdState.line(startLine);
    const { pos, max } = line.position;

    if (line.isCodeBlock) {
      return false;
    }

    if (line.startsWith("```snippet")) {
      const fenceline = line.string();

      let rawPath = fenceline.match(/```snippet\s+\{(.*)\}/)?.[1] as
        | string
        | undefined;

      if (silent) {
        return true;
      }

      const content = line.next?.until(
        (line) => line.slice()?.trim() === "```"
      );

      if (!content) {
        return false;
      }

      const [filename, regionName] = rawPath?.split("#") ?? [];

      const file = state.env.path;
      const dir = path.dirname(file);

      const token = state.push("html_block", "", 0);

      let snippet: Snippets;

      try {
        snippet = Snippet(content);
      } catch (e) {
        token.content = error(
          `Invalid region name: ${regionName}\n\n${content}`
        );
        return true;
      }

      if (regionName) {
        const region = snippet.regions?.get(regionName);

        if (region === undefined) {
          token.content = error(
            `Invalid region name: ${regionName}\n\n${content}`
          );
          return true;
        }

        token.content = highlightRegion(md, region, snippet);
      } else {
        token.content = highlight(md, snippet);
      }

      return true;
    }

    return false;
  };

  md.block.ruler.before("fence", "snippet", parser);
}

function highlightRegion(
  md: MarkdownIt,
  region: Region,
  complete: Snippets
): string {
  const tsFenced = RenderLanguageRegion.create(
    region,
    complete,
    "ts"
  ).highlight(md);

  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }

  const jsFenced = RenderLanguageRegion.create(
    region,
    complete,
    "js"
  ).highlight(md);

  // const jsFenced = highlightLang(md, {
  //   code: region.js.code,
  //   highlights: region.js.highlights,
  //   prefix: prefix(region.js, complete.js),
  //   postfix: postfix(region.js, complete.js),
  // });

  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}

function highlight(md: MarkdownIt, region: Snippets) {
  const tsFenced = highlightLang(md, {
    code: region.ts.code,
    highlights: [],
    prefix: "",
  });

  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }

  const jsFenced = highlightLang(md, {
    code: region.js.code,
    highlights: [],
    prefix: "",
  });

  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
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

  return (
    md.options.highlight?.(source, "tsx twoslash", attr) ??
    `<pre><code class="language-ts">${code}</code></pre>`
  );
}

class FenceInfo {
  #md: MarkdownIt;
  #original: string;

  constructor(md: MarkdownIt, original: string) {
    this.#md = md;
    this.#original = original;
  }

  // asAttr(highlights: Highlight[]): [string, string][] {
  //   return [[highlights.map((h) => h.lines).join(","), ""]];
  // }

  #shikiAttr(highlights: Highlight[] | undefined): string {
    return highlights && highlights.length > 0
      ? `{${highlights.map((h) => h.lines).join(",")}}`
      : "";
  }

  highlight(region: Region | Snippets) {
    const tsFenced = this.#highlightLang(region.ts);

    if (region.ts.code === region.js.code) {
      return `<section class="both-lang">${tsFenced}</section>`;
    }

    const jsFenced = this.#highlightLang(region.js);

    return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
  }

  #highlightLang(region: { code: string; highlights?: Highlight[] }): string {
    return (
      this.#md.options.highlight?.(
        region.code,
        "ts",
        this.#shikiAttr(region.highlights)
      ) ?? `<pre><code class="language-ts">${region.code}</code></pre>`
    );
  }
}

function error(message: string) {
  return `<div class="language-error ext-error"><pre class="ext-error"><code>${message}</code></pre></div>`;
}

function normalize(data: string) {
  // escape < and >
  return breakable(data).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function breakable(data: string) {
  // add a wbr around `/`
  return data.replace(/\//g, "<wbr>/<wbr>");
}
