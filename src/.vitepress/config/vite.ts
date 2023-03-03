import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import postcss from "../../postcss.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(__dirname, "../../..");

// export const CSS: CSSOptions = {
//   postcss: {
//     plugins: [
//       vars(),
//       functions({ color }),
//       values(),
//       property(),
//       nested(),
//     ],
//   },
//   devSourcemap: true,
// };

export const VITE: UserConfig = {
  css: { postcss },
  logLevel: "info",

  plugins: [
    tsconfigPaths({
      loose: true,
    }),
  ],
  resolve: {
    alias: {},
  },

  optimizeDeps: {
    exclude: ["vitepress-plugin-tabs"],
  },
  envDir: resolve(root, ".config", ".env"),
  envPrefix: "STARBEAM_",
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          emitFile: true,
          filename: "stats.html",
        }),
      ],
    },
  },
};
