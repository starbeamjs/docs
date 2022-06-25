import { viteBundler } from "vuepress";

export const vite = viteBundler({
  viteOptions: {
    build: {
      target: "esnext",
    },
    esbuild: {
      target: "node18",
    },
  },
});
