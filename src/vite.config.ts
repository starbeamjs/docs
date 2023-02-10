import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": resolve(__dirname),
      "@tutorial-lib": resolve(__dirname, "tutorial", "$components", "code"),
      "@tutorial-vue": resolve(__dirname, "tutorial", "$components"),
    },
  },
  optimizeDeps: {
    exclude: ["vitepress-plugin-tabs"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
      sass: {
        charset: false,
      },
      css: {
        charset: false,
      },
    },
  },
});
