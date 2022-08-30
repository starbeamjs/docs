import Snippet, {
  type Highlight,
  type LanguageRegion,
  type Region,
  type Source,
} from "docs-snippet";
import fs from "fs";
import type MarkdownIt from "markdown-it";
import path from "path";
import type { RuleBlock } from "../../../../../node_modules/@types/markdown-it/lib/parser_block.js";
import type { Snippets } from "../../../../../node_modules/docs-snippet/dist/types/src/snippets.js";
import type { VitepressStateBlock } from "./env.js";
import { RenderLanguageRegion } from "./snippets/language-region.js";

export function snippetPlugin(md: MarkdownIt, srcDir: string) {
  const parser: RuleBlock = (
    state: VitepressStateBlock,
    startLine,
    _endLine,
    silent
  ): boolean => {
    const CH = ";".charCodeAt(0);
    const pos = (state.bMarks[startLine] ?? 0) + (state.tShift[startLine] ?? 0);
    const max = state.eMarks[startLine] ?? 0;

    // if it's indented more than 3 spaces, it should be a code block
    if ((state.sCount[startLine] ?? 0) - state.blkIndent >= 4) {
      return false;
    }

    for (let i = 0; i < 3; ++i) {
      const ch = state.src.charCodeAt(pos + i);
      if (ch !== CH || pos + i >= max) return false;
    }

    if (silent) {
      return true;
    }

    const start = pos + 3;
    const end = state.skipSpacesBack(max, pos);

    const file = state.env.path;
    const dir = path.dirname(file);

    let rawPath = state.src.slice(start, end).trim();

    if (rawPath.startsWith("@")) {
      rawPath = rawPath.replace(/^@/, srcDir);
    } else {
      rawPath = path.resolve(dir, rawPath);
    }

    rawPath = rawPath.trim();

    const [filename, regionName] = rawPath.split("#");

    state.line = startLine + 1;

    let content;

    try {
      content = fs.readFileSync(filename, "utf-8");
    } catch (e: any) {
      const token = state.push("html_block", "", 0);
      token.content = error(e.message);
      return true;
    }

    // TODO: Add the import file as a dependency.
    // Waiting on https://github.com/vuejs/vitepress/issues/117

    let snippet: Snippets;
    try {
      snippet = Snippet(content);
    } catch (e: any) {
      const token = state.push("html_block", "", 0);
      token.content = error(e.message);
      return true;
    }

    const token = state.push("html_block", "", 0);

    if (regionName) {
      const region = snippet.regions?.get(regionName);

      if (region === undefined) {
        token.content = error(
          `Invalid region name: ${regionName} in ${filename}`
        );
        return true;
      }

      token.content = highlightRegion(md, region, snippet);
    } else {
      token.content = highlight(md, snippet);
    }

    return true;
  };

  const fence = md.renderer.rules.fence!;

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, env] = args;
    const token = tokens[idx]!;
    const fenceInfo = new FenceInfo(md, token.info);

    // @ts-ignore
    const tokenSrc = token.src;
    // @ts-ignore
    delete token.src;
    const [src, regionName] = tokenSrc ? tokenSrc.split("#") : [""];

    if (src) {
      let content;

      try {
        content = fs.readFileSync(src, "utf-8");
      } catch (e: any) {
        return error(e.message);
      }

      const importedFiles = env.importedFiles || (env.importedFiles = []);
      importedFiles.push(src);

      let snippet: Snippets;
      try {
        snippet = Snippet(content);
      } catch (e: any) {
        return error(e.message);
      }

      if (regionName) {
        const region = snippet.regions?.get(regionName);

        if (region === undefined) {
          return error(`Invalid region name: ${regionName} in ${src}`);
        }

        return fenceInfo.highlight(region);
      } else {
        return fenceInfo.highlight(snippet);
      }
    }

    // fallback to original renderer
    return fence(...args);
  };

  md.block.ruler.before("fence", "snippet", parser);
}

/**
 * Remove any line that is whitespace followed by the comment `// @ignore:next`, as well as the next line
 */
function removeIgnores(data: string) {
  const lines = data.split(/\r?\n/);
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (line.trim() === "// @ignore:next") {
      i++;
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
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
    console.log({ attr: this.#shikiAttr(region.highlights) });

    return (
      this.#md.options.highlight?.(
        region.code,
        "ts",
        this.#shikiAttr(region.highlights)
        // region.highlights ? this.#shikiAttr(region.highlights) : ""
      ) ?? `<pre><code class="language-ts">${region.code}</code></pre>`
    );
  }
}

function error(message: string) {
  return `<div class="language-error ext-error"><pre class="ext-error"><code>${normalize(
    message
  )}</code></pre></div>`;
}

function normalize(data: string) {
  // escape < and >
  return breakable(data).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function breakable(data: string) {
  // add a wbr around `/`
  return data.replace(/\//g, "<wbr>/<wbr>");
}
