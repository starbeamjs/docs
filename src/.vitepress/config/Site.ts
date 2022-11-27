import type { DefaultTheme, UserConfig } from "vitepress";
import { getStarbeamVersions } from "./package-info.js";
import type { ThemeConfig } from "./types.js";

export const SITE: Partial<ThemeConfig> = {
  siteTitle: "Starbeam",
  lastUpdatedText: "Last Updated:",
  footer: {
    message: "Released under the MIT license",
    copyright:
      "Copyright © 2022-present (Yehuda Katz and Starbeam contributors)",
  },
};

export const CONFIG: Partial<UserConfig<DefaultTheme.Config>> = {
  title: "Starbeam",
  description: "Simple and Fun Reactivity",
  titleTemplate: "Simple and Fun Reactivity",
  lastUpdated: true,
};

export const BUILD_HOOKS: Partial<UserConfig<DefaultTheme.Config>> = {
  transformPageData: async (page) => {
    const versions = await getStarbeamVersions();
    page.frontmatter["@starbeam:versions"] = Object.fromEntries(
      Object.values(versions).map((dep) => [dep.from, dep.version])
    );

    if ("STARBEAM_REGISTRY" in process.env) {
      page.frontmatter["@starbeam:registry"] = process.env.STARBEAM_REGISTRY;
    }
  },
};
