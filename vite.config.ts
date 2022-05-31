import Unocss from "unocss/vite";
import { defineConfig } from "vite";
import { presetAttributify, presetIcons, presetUno } from "unocss";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VitePWA } from "vite-plugin-pwa";
import fg from "fast-glob";
import { resolve } from "path";
import project from "./.vitepress/project.json" assert { type: "json" };

const root = process.env.VITE_ROOT || process.cwd();

const PWA = VitePWA({
  outDir: ".vitepress/dist",
  registerType: "autoUpdate",
  // include all static assets under public/
  includeAssets: fg.sync("**/*.{png,svg,ico,txt}", {
    cwd: resolve(root, "public"),
  }),
  manifest: {
    id: "/",
    name: project.name,
    short_name: project.name,
    description: project.description,
    theme_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "logo.svg",
        sizes: "165x165",
        type: "image/svg",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {
    navigateFallbackDenylist: [/^\/new$/],
    runtimeCaching: [
      {
        urlPattern: new RegExp(`^https://fonts[.]googleapis[.]com/.*`, "i"),
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: new RegExp(`^https://fonts[.]gstatic[.]com/.*`, "i"),
        handler: "CacheFirst",
        options: {
          cacheName: "gstatic-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        child: "./src/components/repl/child/connect.ts",
      },
    },
  },
  plugins: [
    Components({
      include: [/[.]vue$/, /[.]md$/],
      dts: "src/components.d.ts",
    }),
    AutoImport({
      dts: "src/auto-import.d.ts",
      imports: ["vue"],
      include: [/[.]vue$/, /[.]md$/],
      exclude: ["**/dist/**"],
    }),
    Unocss({
      shortcuts: [
        [
          "btn",
          "px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
        ],
      ],
      presets: [
        presetUno({
          dark: "media",
        }),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
    }),
    PWA,
    // {
    //   name: "pwa:post",
    //   enforce: "post",
    //   async buildEnd() {
    //     const pwaPlugin: VitePluginPWAAPI = PWA.find(
    //       (i) => i.name === "vite-plugin-pwa"
    //     )?.api;
    //     const pwa = pwaPlugin && !pwaPlugin.disabled;
    //     await optimizePages(pwa);
    //     if (pwa) await pwaPlugin.generateSW();
    //   },
    // },
  ],
});
