import parseFence from "fenceparser";
import type MarkdownIt from "markdown-it";
import { dirname, resolve } from "node:path";
import { pkgUpSync } from "pkg-up";
import { setupForFile } from "remark-shiki-twoslash";
import type { UserConfigSettings } from "shiki-twoslash";
import { ShikiPackage } from "../shiki/shiki.js";
import { root } from "../vite.js";
import { transformAttributesToHTML } from "./shiki-twoslash.js";

const IS_DEV = process.env["NODE_ENV"] === "development";

const stub = resolve(root, "packages/twoslash");

export async function markdownItShikiTwoslashSetup(
  settings: UserConfigSettings
): Promise<MarkdownIt.PluginWithOptions<UserConfigSettings>> {
  const { highlighters } = await setupForFile(settings);

  return (markdownit, options) => {
    const prev = markdownit.options.highlight;

    if (prev === undefined || prev === null) {
      throw Error("markdown-it-shiki-twoslash requires markdown-it to have a highlighter set");
    }

    markdownit.options.highlight = (snippet, lang, rawAttrs) => {
      const attrs = parseFence(rawAttrs);

      if (!lang.match(/\btwoslash\b/)) {
        return prev(snippet, lang, rawAttrs);
      }

      const filename = attrs["filename"];

      if (!filename) {
        throw Error(
          "```twoslash fences must specify a filename (e.g. ```twoslash filename=index.ts"
        );
      }

      if (typeof filename !== "string") {
        throw Error(
          `the filename specified in \`\`\`twoslash fences must be a string (you specified ${filename})`
        );
      }

      const pkgJSON = pkgUpSync({
        cwd: dirname(filename),
      });

      if (pkgJSON === undefined) {
        throw Error(`no package.json found for ${filename}`);
      }

      const vfsRoot = { vfsRoot: dirname(pkgJSON) };

      console.log({ filename, ...vfsRoot, options });

      const pkg = ShikiPackage.at({
        path: filename,
        workspaceRoot: root,
      });

      console.log({ pkg });

      // const defaultOptions: Partial<ExampleOptions> = IS_DEV
      //   ? {
      //       // noErrorValidation: true,
      //     }
      //   : {};

      snippet = snippet.replace(/\r?\n$/, ""); // strip trailing newline fed during code block parsing
      return transformAttributesToHTML(snippet, [lang, rawAttrs].join(" "), highlighters, {
        ...options,

        defaultCompilerOptions: pkg.compilerOptions,
        // ...vfsRoot,
        // ...vfsRoot,
        // defaultOptions: {
        // ...options.defaultOptions,
        // ...defaultOptions,
        // },
      });
    };
  };
}
