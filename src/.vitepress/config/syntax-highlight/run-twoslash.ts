import type { TwoSlashReturn } from "@typescript/twoslash";
import { runTwoSlash, UserConfigSettings } from "shiki-twoslash";

import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { createRequire } from "node:module";
import { join } from "path";

const require = createRequire(import.meta.url);

const shikiVersion = require("@typescript/twoslash/package.json").version;

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

  const getNmCache = () => {
    if (__dirname.includes("node_modules")) {
      return join(
        __dirname.split("node_modules")[0],
        "node_modules",
        ".cache",
        "twoslash"
      );
    } else {
      return join(__dirname, "..", "..", ".cache", "twoslash");
    }
  };

  const getPnpCache = () => {
    try {
      const pnp = require("pnpapi");
      return join(
        pnp.getPackageInformation(pnp.topLevel).packageLocation,
        "node_modules",
        ".cache",
        "twoslash"
      );
    } catch (error) {
      return getNmCache();
    }
  };

  const cacheRoot = process.versions.pnp ? getPnpCache() : getNmCache();

  const cachePath = join(cacheRoot, `${codeSha}.json`);

  if (existsSync(cachePath)) {
    if (process.env.debug)
      console.log(`Using cached twoslash results from ${cachePath}`);

    return JSON.parse(readFileSync(cachePath, "utf8"));
  } else {
    const results = runTwoSlash(code, lang, settings);
    if (!existsSync(cacheRoot)) mkdirSync(cacheRoot, { recursive: true });
    writeFileSync(cachePath, JSON.stringify(results), "utf8");
    return results;
  }
};
