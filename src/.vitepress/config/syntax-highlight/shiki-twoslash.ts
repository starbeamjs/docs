import type { TwoSlashReturn } from "@typescript/twoslash";
import { lex, parse } from "fenceparser";
import type { Highlighter } from "shiki";
import type { UserConfigSettings } from "shiki-twoslash";
import { renderCodeToHTML } from "shiki-twoslash";
import { addIncludes } from "./includes.js";
import { cachedTwoslashCall } from "./run-twoslash.js";

export function transformAttributesToHTML(
  code: string,
  fenceString: string,
  highlighters: Highlighter[],
  settings: UserConfigSettings
) {
  const fence = parseFence(fenceString);

  const twoslash = runTwoSlashOnNode(code, fence, settings);
  const newCode = (twoslash && twoslash.code) || code;
  return getHTML(newCode, fence, highlighters, twoslash, settings);
}

const parseFence = (fence: string): Fence => {
  const [lang, ...tokens] = lex(fence);

  // if the language is twoslash and include key is found
  // insert an `=` after include to make it `include=[name]`
  // which yields better meta
  if (lang === "twoslash") {
    // Search for `include` in tokens
    const index = tokens.indexOf("include");
    if (index !== -1) {
      tokens.splice(index + 1, 0, "=");
    }
  }

  const meta = parse(tokens) ?? {};

  return {
    lang: (lang || "").toString(),
    meta,
  };
};

/**
 * Runs twoslash across an AST node, switching out the text content, and lang
 * and adding a `twoslash` property to the node.
 */
export function runTwoSlashOnNode(
  code: string,
  { lang, meta }: Fence,
  settings: UserConfigSettings = {}
): TwoSlashReturn | undefined {
  // Offer a way to do high-perf iterations, this is less useful
  // given that we cache the results of twoslash in the file-system
  const shouldDisableTwoslash =
    typeof process !== "undefined" && process.env && !!process.env["TWOSLASH_DISABLE"];
  if (shouldDisableTwoslash) return undefined;

  // Only run twoslash when the meta has the attribute twoslash
  if (meta["twoslash"]) {
    return cachedTwoslashCall(code, lang, settings);
  }

  return undefined;
}

const includes = new Map<string, string>();

function getHTML(
  code: string,
  fence: Fence,
  highlighters: Highlighter[],
  twoslash: TwoSlashReturn | undefined,
  twoslashSettings: UserConfigSettings
): string {
  // Shiki doesn't respect json5 as an input, so switch it
  // to json, which can handle comments in the syntax highlight
  const replacer: Record<string, string> = {
    json5: "json",
  };

  const replacement = replacer[fence.lang];
  if (replacement) fence.lang = replacement;

  let results: string;
  // Support 'twoslash' includes
  if (fence.lang === "twoslash") {
    if (!fence.meta["include"] || typeof fence.meta["include"] !== "string") {
      throw new Error("A twoslash code block needs a pragma like 'twoslash include [name]'");
    }

    addIncludes(includes, fence.meta["include"] as string, code);
    results = twoslashSettings.wrapFragments ? `<div class="shiki-twoslash-fragment"></div>` : "";
  } else {
    // All good, get each highlighter and render the shiki output for it
    const output = highlighters.map((highlighter) => {
      // @ts-ignore
      const themeName: string = highlighter.customName.split("/").pop().replace(".json", "");
      return renderCodeToHTML(
        code,
        fence.lang,
        fence.meta,
        { themeName, ...twoslashSettings },
        highlighter,
        twoslash
      );
    });
    results = output.join("\n");
    if (highlighters.length > 1 && twoslashSettings.wrapFragments) {
      results = `<div class="shiki-twoslash-fragment">${results}</div>`;
    }
  }
  return results;
}

type Fence = {
  lang: string;
  meta: NonNullable<ReturnType<typeof parse>>;
};
