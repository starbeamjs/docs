import type { DefaultTheme, UserConfig } from "vitepress";
import type { ThemeConfig } from "./types.js";

export const SITE: Partial<ThemeConfig> = {
  siteTitle: "Starbeam",
  footer: {
    message: "Released under the MIT license",
    copyright:
      "Copyright © 2022-present (Yehuda Katz and Starbeam contributors)",
  },
};

export const CONFIG: Partial<UserConfig<DefaultTheme.Config>> = {
  title: "Starbeam",
  titleTemplate: "Simple and Fun Reactivity",
};
