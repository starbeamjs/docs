import { exec } from "node:child_process";
import { defineConfig } from "vite";

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * @param {ImportMeta} meta
 */
export function vite(meta) {
  const __dirname = new URL("./", meta.url).pathname;

  const manifest = JSON.parse(readFileSync(resolve(__dirname, "./package.json"), "utf-8"));

  return defineConfig({
    plugins: [
      {
        name: "dts",
        writeBundle: async (options, bundle) => {
          await exec("tsc -d -p ./tsconfig.build.json", {
            cwd: __dirname,
          });
        },
        renderError: (err) => {
          console.error(err);
        },
      },
    ],
    build: {
      lib: {
        entry: "./index.ts",

        fileName: () => "index.js",
        formats: ["es"],
      },
      rollupOptions: {
        external: Object.keys(manifest.dependencies ?? {}),
      },
    },
  });
}
