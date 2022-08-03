// @ts-check

import { defineConfig } from "vite";

export default defineConfig({
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
