import "@mdit-vue/plugin-sfc";
import Snippet, { type Highlight, type Region } from "docs-snippet";
import { existsSync, readFileSync } from "fs";
import type MarkdownIt from "markdown-it";
import stripAnsi from "strip-ansi";
import type { RuleBlock } from "../../../../../node_modules/@types/markdown-it/lib/parser_block.js";
import type { Snippets } from "../../../../../node_modules/docs-snippet/dist/types/src/snippets.js";
import type { VitepressStateBlock } from "../../../plugins/markdown/env.js";
import { RenderLanguageRegion } from "./snippets/language-region.js";
import { MDState, StateEnv } from "./utils.js";

export function snippetPlugin(md: MarkdownIt, srcDir: string) {
  const parser: RuleBlock = (state: VitepressStateBlock, startLine, _endLine, silent): boolean => {
    const mdState = new MDState(state);
    const line = mdState.line(startLine);

    if (line.isCodeBlock) {
      return false;
    }

    if (line.startsWith("```snippet")) {
      const fenceline = line.string();

      let rawPath = fenceline.match(/```snippet\s+\{(.*)\}/)?.[1] as string | undefined;

      if (silent) {
        return true;
      }

      const fenceContent = line.next?.until((line) => line.slice()?.trim() === "```");

      if (!fenceContent) {
        return false;
      }

      const token = state.push("html_block", "", 0);

      if (!rawPath?.startsWith("#")) {
        token.content = error(`Invalid region attribute "${rawPath}"`);
        return true;
      }

      const regionName = rawPath.slice(1);

      const filename = mdState.env.resolve(fenceContent.trim());

      if (!existsSync(filename)) {
        token.content = mdState.error(`File "${filename}" does not exist`);
        return true;
      }

      const content = readFileSync(filename, "utf8");

      let snippet: Snippets;

      try {
        snippet = Snippet(content);
      } catch (e) {
        token.content = error(
          `Invalid source file: ${codeForError(
            (e as Error).stack ?? "missing stack trace"
          )}\n\nCode:\n\n${codeForError(content)}`
        );
        return true;
      }

      if (regionName) {
        const region = snippet.regions?.get(regionName);

        if (region === undefined) {
          token.content = error(
            `Invalid region name: ${regionName}\n\n${codeForError(fenceContent)}`
          );
          return true;
        }

        token.content = highlightRegion({
          md,
          env: mdState.env,
          filename,
          region,
          complete: snippet,
        });
      } else {
        token.content = highlight(md, filename, snippet);
      }

      return true;
    }

    return false;
  };

  md.block.ruler.before("fence", "snippet", parser);
}

function highlightRegion({
  md,
  env,
  filename,
  region,
  complete,
}: {
  md: MarkdownIt;
  env: StateEnv;
  filename: string;
  region: Region;
  complete: Snippets;
}): string {
  const tsFenced = RenderLanguageRegion.create({
    filename,
    region,
    parsed: complete,
    kind: "ts",
    env,
  }).highlight(md);

  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }

  const jsFenced = RenderLanguageRegion.create({
    filename,
    region,
    parsed: complete,
    kind: "js",
    env,
  }).highlight(md);

  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}

function highlight(md: MarkdownIt, filename: string, region: Snippets) {
  const tsFenced = highlightLang(md, {
    filename,
    code: region.ts.code,
    highlights: [],
    prefix: "",
  });

  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }

  const jsFenced = highlightLang(md, {
    filename,
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
    filename,
    highlights,
    prefix,
    postfix,
  }: {
    code: string;
    filename: string;
    highlights?: Highlight[];
    prefix?: string;
    postfix?: string;
  }
): string {
  const attr =
    highlights && highlights.length > 0
      ? `{${highlights.map((h) => h.lines).join(",")}} {filename=${JSON.stringify(filename)}}`
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

function codeForError(code: string) {
  // escape the code
  return stripAnsi(code).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
