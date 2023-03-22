import type { DefaultTheme, UserConfig } from "vitepress";

// export type ThemeConfig = DefaultTheme.Config;
export type Config = UserConfig<DefaultTheme.Config>;
export type ThemeConfig = NonNullable<Config["themeConfig"]>;

export type Head = NonNullable<Config["head"]>;
export type MarkdownOptions = NonNullable<Config["markdown"]>;

export type NavItem = NonNullable<ThemeConfig["nav"]>[number];
export type Sidebar = NonNullable<ThemeConfig["sidebar"]>;
export type SocialLink = NonNullable<ThemeConfig["socialLinks"]>[number];
