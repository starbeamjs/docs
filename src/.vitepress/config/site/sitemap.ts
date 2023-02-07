import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import { defineConfig } from "vitepress";

interface Link {
  url: string;
  lastmod?: number;
}

const links: Link[] = [];

export default defineConfig({
  // ...

  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },

  buildEnd: ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: "https://starbeamjs.com/",
    });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
  },
});
