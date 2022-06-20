import Snippet, { type Highlight } from "docs-snippet";
import { Snippets } from "docs-snippet/dist/types/src/snippets.js";
import fs from "fs";
import MarkdownIt from "markdown-it";
import { RuleBlock } from "markdown-it/lib/parser_block";
import path from "path";
import { App } from "vuepress";

function dedent(text: string) {
  const wRegexp = /^([ \t]*)(.*)\n/gm;
  let match;
  let minIndentLength = null;

  while ((match = wRegexp.exec(text)) !== null) {
    const [indentation, content] = match.slice(1);
    if (!content) continue;

    const indentLength = indentation.length;
    if (indentLength > 0) {
      minIndentLength =
        minIndentLength !== null
          ? Math.min(minIndentLength, indentLength)
          : indentLength;
    } else break;
  }

  if (minIndentLength) {
    text = text.replace(
      new RegExp(`^[ \t]{${minIndentLength}}(.*)`, "gm"),
      "$1"
    );
  }

  return text;
}

function testLine(
  line: string,
  regexp: RegExp,
  regionName: string,
  end: boolean = false
) {
  const [full, tag, name] = regexp.exec(line.trim()) || [];

  return (
    full &&
    tag &&
    name === regionName &&
    tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/)
  );
}

function findRegion(
  lines: Array<string>,
  regionName: string
) {
  const regionRegexps = [
    /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/, // javascript, typescript, java
    /^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/, // css, less, scss
    /^#pragma ((?:end)?region) ([\w*-]+)$/, // C, C++
    /^<!-- #?((?:end)?region) ([\w*-]+) -->$/, // HTML, markdown
    /^#((?:End )Region) ([\w*-]+)$/, // Visual Basic
    /^::#((?:end)region) ([\w*-]+)$/, // Bat
    /^# ?((?:end)?region) ([\w*-]+)$/, // C#, PHP, Powershell, Python, perl & misc
  ];

  let regexp = null;
  let start = -1;

  for (const [lineId, line] of lines.entries()) {
    if (regexp === null) {
      for (const reg of regionRegexps) {
        if (testLine(line, reg, regionName)) {
          start = lineId + 1;
          regexp = reg;
          break;
        }
      }
    } else if (testLine(line, regexp, regionName, true)) {
      return { start, end: lineId, regexp };
    }
  }

  return null;
}

export function snippetPlugin(app: App) {
  return (md: MarkdownIt, srcDir: string) => {
    const parser: RuleBlock = (
      state,
      startLine,
      endLine,
      silent
    ) => {
      const CH = ";".charCodeAt(0);
      const pos =
        state.bMarks[startLine] + state.tShift[startLine];
      const max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) {
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

      /**
       * raw path format: "/path/to/file.extension#region {meta}"
       *    where #region and {meta} are optional
       *
       * captures: ['/path/to/file.extension', 'extension', '#region', '{meta}']
       */
      const rawPathRegexp =
        /^(.+(?:\.([a-z]+)))(?:(#[\w-]+))?(?: ?({\d+(?:[,-]\d+)*}))?$/;

      const file = state.env.filePath;
      const dir = path.dirname(file);

      let rawPath = state.src.slice(start, end).trim();

      if (rawPath.startsWith("@")) {
        rawPath = rawPath.replace(/^@/, srcDir);
      } else {
        rawPath = path.resolve(dir, rawPath);
      }

      rawPath = rawPath.trim();

      const [
        filename = "",
        extension = "",
        region = "",
        meta = "",
      ] = (rawPathRegexp.exec(rawPath) || []).slice(1);

      state.line = startLine + 1;

      const token = state.push("fence", "code", 0);
      token.info = "tsx" + meta;

      // @ts-ignore
      token.src = path.resolve(filename) + region;
      token.markup = "```";
      token.map = [startLine, startLine + 1];

      return true;
    };

    const fence = md.renderer.rules.fence!;

    md.renderer.rules.fence = (...args) => {
      const [tokens, idx, options, env] = args;
      const token = tokens[idx];
      const fenceInfo = new FenceInfo(token.info);

      // @ts-ignore
      const tokenSrc = token.src;
      const [src, regionName] = tokenSrc
        ? tokenSrc.split("#")
        : [""];

      if (src) {
        let content;

        try {
          content = fs.readFileSync(src, "utf-8");
        } catch (e) {
          return error(e.message);
        }

        const importedFiles =
          env.importedFiles || (env.importedFiles = []);
        importedFiles.push(src);

        let snippet: Snippets;
        try {
          snippet = Snippet(content);
        } catch (e) {
          return error(e.message);
        }

        if (regionName) {
          const region = snippet.regions?.get(regionName);

          if (region === undefined) {
            return error(
              `Invalid region name: ${regionName} in ${src}`
            );
          }

          token.content = region.ts.code;
          token.info = fenceInfo.highlights(
            region.ts.highlights
          );

          if (region.ts.code === region.js.code) {
            return `<section class="both-lang">${fence(
              ...args
            )}</section>`;
          }

          const tsFenced = fence(...args);

          token.content = region.js.code;
          token.info = fenceInfo.highlights(
            region.js.highlights
          );
          const jsFenced = fence(...args);

          return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
        }

        content = removeIgnores(content);

        if (snippet.ts.code === snippet.js.code) {
          token.content = snippet.ts.code;
          return `<section class="both-lang">${fence(
            ...args
          )}</section>`;
        }

        token.content = snippet.ts.code;

        const tsFenced = fence(...args);

        token.content = snippet.js.code;
        token.info = `ts${token.info.slice(3)}`;
        const jsFenced = fence(...args);

        return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
      }

      // fallback to original renderer
      return fence(...args);
    };

    md.block.ruler.before("fence", "snippet", parser);
  };
}

/**
 * Remove any line that is whitespace followed by the comment `// @ignore:next`, as well as the next line
 */
function removeIgnores(data: string) {
  const lines = data.split(/\r?\n/);
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "// @ignore:next") {
      i++;
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

class FenceInfo {
  #original: string;

  constructor(original: string) {
    this.#original = original;
  }

  highlights(highlights: Highlight[]) {
    return `ts{${highlights
      .map((h) => h.lines)
      .join(",")}}${this.#original.slice(3)}`;
  }
}

function error(message: string) {
  return `<div class="language-error ext-error"><pre class="ext-error"><code>${normalize(
    message
  )}</code></pre></div>`;
}

function normalize(data: string) {
  // escape < and >
  return breakable(data)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function breakable(data: string) {
  // add a wbr around `/`
  return data.replace(/\//g, "<wbr>/<wbr>");
}
