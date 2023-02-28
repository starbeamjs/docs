import type { RuleBlock } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import Snippet, { Snippets, type Highlight, type Region } from "docs-snippet";
import { existsSync, readFileSync } from "fs";
import type MarkdownIt from "markdown-it";
import stripAnsi from "strip-ansi";
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
    const mdState = new MDState(md, state);
    const line = mdState.line(startLine);

    if (line.isCodeBlock) {
      return false;
    }

    // The syntax is `![#cell](./-snippets/cell.ts)
    if (line.startsWith("![#")) {
      const snippet = line.string();

      // use named captures
      const match = snippet.match(/^!\[#(?<region>(.*))\]\((?<file>(.*))\)$/);

      if (match) {
        const { region, file } = match.groups as {
          region: string;
          file: string;
        };

        mdState.consumeLine();
        pushSnippetToken(mdState, mdState.env.resolve(file), region);
        return true;
      }
    }

    if (line.startsWith("```snippet")) {
      const fenceline = line.string();

      let rawPath = fenceline.match(/```snippet\s+\{(.*)\}/)?.[1] as
        | string
        | undefined;

      if (silent) {
        return true;
      }

      const fenceContent = line.next?.until(
        (line) => line.slice()?.trim() === "```"
      );

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
            `Invalid region name: ${regionName}\n\n${codeForError(
              fenceContent
            )}`
          );
          return true;
        }

        token.content = highlightRegion({
          state: mdState,
          filename,
          region,
          complete: snippet,
        });
      } else {
        token.content = highlight(mdState, filename, snippet);
      }

      return true;
    }

    return false;
  };

  md.block.ruler.before("fence", "snippet", parser);
}

function pushSnippetToken(
  state: MDState,
  filename: string,
  regionName: string
) {
  const token = state.open();

  if (!existsSync(filename)) {
    token.content = state.error(`File "${filename}" does not exist`);
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
        `Invalid region name: ${regionName}\n\n${codeForError(filename)}`
      );
      return true;
    }

    token.content = highlightRegion({
      state,
      filename,
      region,
      complete: snippet,
    });
  } else {
    token.content = highlight(state, filename, snippet);
  }

  return token;
}

function highlightRegion({
  state,
  filename,
  region,
  complete,
}: {
  state: MDState;
  filename: string;
  region: Region;
  complete: Snippets;
}): string {
  const tsFenced = RenderLanguageRegion.create({
    filename,
    region,
    parsed: complete,
    kind: "ts",
    env: state.env,
  }).highlight(state.highlight);

  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }

  const jsFenced = RenderLanguageRegion.create({
    filename,
    region,
    parsed: complete,
    kind: "js",
    env: state.env,
  }).highlight(state.highlight);

  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}

function highlight(state: MDState, filename: string, region: Snippets) {
  const tsFenced = highlightLang(state, {
    filename,
    code: region.ts.code,
    highlights: [],
    prefix: "",
  });

  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }

  const jsFenced = highlightLang(state, {
    filename,
    code: region.js.code,
    highlights: [],
    prefix: "",
  });

  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}

function highlightLang(
  state: MDState,
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
      ? `{${highlights
          .map((h) => h.lines)
          .join(",")}} {filename=${JSON.stringify(filename)}}`
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
    state.highlight?.(source, "tsx twoslash", attr) ??
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
