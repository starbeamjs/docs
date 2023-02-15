import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import postcss from "./postcss.config.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": resolve(__dirname),
      "@tutorial-lib": resolve(
        __dirname,
        "tutorial",
        "-components",
        "lib"
      ),
      "@tutorial-vue": resolve(
        __dirname,
        "tutorial",
        "-components"
      ),
    },
  },
  optimizeDeps: {
    exclude: ["vitepress-plugin-tabs"],
  },
  css: {
    postcss,
  },
});
