import type MarkdownIt from "markdown-it";
import { setupForFile } from "remark-shiki-twoslash";
import type { UserConfigSettings } from "shiki-twoslash";
import { transformAttributesToHTML } from "./shiki-twoslash.js";

export async function markdownItShikiTwoslashSetup(
  settings: UserConfigSettings
): Promise<MarkdownIt.PluginWithOptions<UserConfigSettings>> {
  const { highlighters } = await setupForFile(settings);

  return (markdownit, options) => {
    const prev = markdownit.options.highlight;

    if (prev === undefined || prev === null) {
      throw Error(
        "markdown-it-shiki-twoslash requires markdown-it to have a highlighter set"
      );
    }

    markdownit.options.highlight = (snippet, lang, attrs) => {
      if (!lang.match(/\btwoslash\b/)) {
        return prev(snippet, lang, attrs);
      }
      snippet = snippet.replace(/\r?\n$/, ""); // strip trailing newline fed during code block parsing
      return transformAttributesToHTML(
        snippet,
        [lang, attrs].join(" "),
        highlighters,
        options!
      );
    };
  };
}
