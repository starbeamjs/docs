/// <reference path="../env.d.ts" />

import {
  AutoLink,
  HopeThemeNavbarConfig,
  HopeThemeNavbarGroup,
  HopeThemeNavbarItem,
} from "vuepress-theme-hope";
import { Flags } from "../config";
import { inspect } from "util";
import { isDev, isProd } from "./env";

type NavJSON = NavChildJSON[];

interface NavEntryJSON {
  text?: string;
  link: string;
  flag?: string;
  activeWhen?: string;
  icon?: string;
}

interface NavGroupJSON {
  text: string;
  flag?: string;
  icon?: string;
  link?: string;
  prefix?: string;
  children: NavChildJSON[];
}

type NavChildJSON = string | NavEntryJSON | NavGroupJSON;
type NavChild = NavLink | NavAutoLink | NavGroup;

export class Nav {
  static fromJSON(json: NavJSON) {
    return new Nav(
      json.map((entry) => NavEntry.fromJSON(entry))
    );
  }

  constructor(readonly entries: NavChild[]) {}

  toConfig(flags: Flags): HopeThemeNavbarConfig {
    return navList(this.entries, flags);
  }
}

function navList(
  children: NavChild[],
  flags: Flags
): HopeThemeNavbarConfig {
  return children.flatMap((entry) => {
    if (
      entry.flag &&
      flags[entry.flag] !== "enabled" &&
      isProd()
    ) {
      return [];
    } else {
      return [entry.toConfig(flags)];
    }
  });
}

export abstract class NavEntry {
  static fromJSON(json: NavChildJSON): NavChild {
    if (typeof json === "string") {
      return new NavAutoLink(urlFor(json));
    } else if ("children" in json) {
      return new NavGroup(
        json.text,
        json.children.map(NavEntry.fromJSON),
        {
          icon: json.icon,
          link: json.link,
          flag: json.flag,
          prefix: json.prefix,
        }
      );
    } else {
      return new NavLink(json.link, {
        text: json.text,
        flag: json.flag,
        activeWhen: json.activeWhen,
        icon: json.icon,
      });
    }
  }

  readonly text?: string;
  readonly icon?: string;
  readonly ariaLabel?: string;
  readonly flag?: string;

  constructor(
    options: {
      text?: string;
      activeWhen?: string;
      flag?: string;
      ariaLabel?: string;
      icon?: string;
    } = {}
  ) {
    this.text = options.text;
    this.ariaLabel = options.ariaLabel;
    this.icon = options.icon;
    this.flag = options.flag;
  }

  /**
   * Convert to config object.
   *
   * @param flags A list of enabled flags
   */
  abstract toConfig(
    flags: Flags
  ):
    | HopeThemeNavbarGroup
    | HopeThemeNavbarItem
    | string
    | undefined;
}

export class NavAutoLink {
  readonly flag = undefined;

  constructor(readonly url: string) {}

  toConfig(flags: Flags): string {
    return this.url;
  }
}

export class NavLink extends NavEntry {
  readonly activeWhen?: string;
  readonly flag?: string;

  constructor(
    readonly link: string,
    options: {
      text?: string;
      activeWhen?: string;
      icon?: string;
      flag?: string;
    } = {}
  ) {
    super(options);
    this.activeWhen = options.activeWhen;
    this.flag = options.flag;
  }

  toConfig(flags: Flags): AutoLink | string {
    if (
      !this.text &&
      !this.activeWhen &&
      !this.icon &&
      !this.ariaLabel
    ) {
      if (isDevPreview(flags, this.flag)) {
        return {
          icon: "preview",
          text: `${this.text} (🧪)`,
          link: this.link,
        };
      }
      return this.link;
    }

    if (this.text === undefined) {
      throw Error(
        `NavLink with link ${
          this.link
        } has no text (${inspect(this)})`
      );
    }

    if (isDevPreview(flags, this.flag)) {
      return {
        text: this.text,
        link: urlFor(this.link),
        icon: "preview",
        ariaLabel: this.ariaLabel,
        activeMatch: this.activeWhen,
      };
    } else {
      return {
        text: this.text,
        link: urlFor(this.link),
        icon: this.icon,
        ariaLabel: this.ariaLabel,
        activeMatch: this.activeWhen,
      };
    }
  }
}

export class NavGroup extends NavEntry {
  readonly prefix?: string;
  readonly link?: string;
  readonly ariaLabel?: string;

  constructor(
    readonly text: string,
    readonly children: NavChild[],
    options: {
      icon?: string;
      flag?: string;
      link?: string;
      ariaLabel?: string;
      prefix?: string;
    } = {}
  ) {
    super(options);
    this.children = children;
    this.prefix = options.prefix;
    this.link = options.link;
    this.ariaLabel = options.ariaLabel;
  }

  toConfig(flags: Flags): HopeThemeNavbarGroup {
    return {
      text: this.text,
      icon: this.icon,
      link: this.prefix,
      ariaLabel: this.ariaLabel,
      children: navList(this.children, flags),
    };
  }
}

export class Project {
  static fromJSON() {}
}

function urlFor(link: string) {
  if (link.endsWith("/")) {
    return `${link}README.md`;
  } else {
    return `${link}.md`;
  }
}

function isDevPreview(
  flags: Flags,
  flag: string | undefined
) {
  return flag && flags[flag] !== "enabled" && isDev();
}
