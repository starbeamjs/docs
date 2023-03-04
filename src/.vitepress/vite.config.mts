import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");
export default defineConfig({
  plugins: [tsconfigPaths({ loose: true })],
  optimizeDeps: {
    exclude: ["@jsergo/mdit"],
  },
  build: {},
  resolve: {
    mainFields: ["browser", "module", "main"],
    alias: {
      "@": resolve(__dirname),
    },
  },
});
