import type { TwoSlashReturn } from "@typescript/twoslash";
import { runTwoSlash, UserConfigSettings } from "shiki-twoslash";

import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);

const shikiVersion = require("@typescript/twoslash/package.json").version;

interface Pnp {}

class NodeModules {
  static at(path: string, pnp = !!process.versions["pnp"]) {
    const [root] = path.split("node_modules");
    const cache = cacheFor(pnp, root, path);

    return new NodeModules(path, root, cache);
  }

  readonly #dirname: string;
  readonly #root: string | undefined;
  readonly #cache: string;

  private constructor(dirname: string, root: string | undefined, cache: string) {
    this.#dirname = dirname;
    this.#root = root;
    this.#cache = cache;
  }

  /**
   * The root of the npm cache directory (possibly pnp)
   */
  get cacheRoot() {
    return this.#cache;
  }

  /**
   * The directory that contains the node_modules directory.
   */
  get root(): string | undefined {
    const [before] = this.#dirname.split("node_modules");

    return before;
  }
}

function cacheFor(pnp: boolean, nmRoot: string | undefined, dirname: string): string {
  if (pnp === false) {
    return nmCache(nmRoot, dirname);
  }

  try {
    const pnp = require("pnpapi");
    return join(
      pnp.getPackageInformation(pnp.topLevel).packageLocation,
      "node_modules",
      ".cache",
      "twoslash"
    );
  } catch (error) {
    return nmCache(nmRoot, dirname);
  }
}

function nmCache(nmRoot: string | undefined, dirname: string): string {
  if (nmRoot) {
    return join(nmRoot, "node_modules", ".cache", "twoslash");
  } else {
    return join(dirname, "..", "..", ".cache", "twoslash");
  }
}

const NODE_MODULES = NodeModules.at(dirname(fileURLToPath(import.meta.url)));

/**
 * Keeps a cache of the JSON responses to a twoslash call in node_modules/.cache/twoslash
 * which should keep CI times down (e.g. the epub vs the handbook etc) - but also during
 * dev time, where it can be super useful.
 */
export const cachedTwoslashCall = (
  code: string,
  lang: string,
  settings: UserConfigSettings
): TwoSlashReturn | undefined => {
  const isWebWorker =
    typeof self !== "undefined" &&
    // @ts-expect-error
    typeof self.WorkerGlobalScope !== "undefined";
  const isBrowser =
    isWebWorker ||
    (typeof window !== "undefined" &&
      typeof window.document !== "undefined" &&
      typeof fetch !== "undefined");

  if (isBrowser) {
    // Not in Node, run un-cached
    return runTwoSlash(code, lang, settings);
  }

  const shasum = createHash("sha1");
  const codeSha = shasum.update(`${code}-${shikiVersion}`).digest("hex");

  const cacheRoot = NODE_MODULES.cacheRoot;

  const cachePath = join(cacheRoot, `${codeSha}.json`);

  if (false && existsSync(cachePath)) {
    if (process.env["debug"]) console.log(`Using cached twoslash results from ${cachePath}`);

    return JSON.parse(readFileSync(cachePath, "utf8"));
  } else {
    const results = runTwoSlash(code, lang, settings);
    if (!existsSync(cacheRoot)) mkdirSync(cacheRoot, { recursive: true });
    writeFileSync(cachePath, JSON.stringify(results), "utf8");
    return results;
  }
};
