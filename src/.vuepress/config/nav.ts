import {
  AutoLink,
  HopeThemeNavbarConfig,
  HopeThemeNavbarGroup,
  HopeThemeNavbarItem,
} from "vuepress-theme-hope";

type NavItem = string | NavEntryJSON;

type NavJSON = NavChildJSON[];

interface NavEntryJSON {
  text: string;
  link: string;
  activeWhen?: string;
  icon?: string;
}

interface NavGroupJSON {
  text: string;
  icon?: string;
  link?: string;
  prefix?: string;
  children: NavChildJSON[];
}

type NavChildJSON = string | NavEntryJSON | NavGroupJSON;
type NavChild = NavLink | NavAutoLink | NavGroup;

interface ProjectJSON {
  nav: NavItem[];
}

export class Nav {
  static fromJSON(json: NavJSON) {
    return new Nav(
      json.map((entry) => NavEntry.fromJSON(entry))
    );
  }

  constructor(readonly entries: NavChild[]) {}

  toConfig(): HopeThemeNavbarConfig {
    return this.entries.map((entry) => entry.toConfig());
  }
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
          prefix: json.prefix,
        }
      );
    } else {
      return new NavLink(json.text, json.link);
    }
  }

  readonly text: string;
  readonly icon?: string;
  readonly ariaLabel?: string;

  constructor(
    text: string,
    options: {
      activeWhen?: string;
      ariaLabel?: string;
      icon?: string;
    } = {}
  ) {
    this.text = text;
    this.ariaLabel = options.ariaLabel;
    this.icon = options.icon;
  }

  abstract toConfig():
    | HopeThemeNavbarGroup
    | HopeThemeNavbarItem
    | string;
}

export class NavAutoLink extends NavEntry {
  readonly url: string;

  toConfig(): string {
    return this.text;
  }
}

export class NavLink extends NavEntry {
  readonly link: string;
  readonly activeWhen?: string;

  constructor(
    text: string,
    link: string,
    options: {
      activeWhen?: string;
      icon?: string;
    } = {}
  ) {
    super(text, options);
    this.link = link;
    this.activeWhen = options.activeWhen;
  }

  toConfig(): AutoLink {
    return {
      text: this.text,
      link: urlFor(this.link),
      icon: this.icon,
      ariaLabel: this.ariaLabel,
      activeMatch: this.activeWhen,
    };
  }
}

export class NavGroup extends NavEntry {
  readonly prefix?: string;
  readonly link?: string;
  readonly ariaLabel?: string;
  readonly children: NavChild[];

  constructor(
    text: string,
    children: NavChild[],
    options: {
      icon?: string;
      link?: string;
      ariaLabel?: string;
      prefix?: string;
    } = {}
  ) {
    super(text, options);
    this.children = children;
    this.prefix = options.prefix;
    this.link = options.link;
    this.ariaLabel = options.ariaLabel;
  }

  toConfig(): HopeThemeNavbarGroup {
    return {
      text: this.text,
      icon: this.icon,
      link: this.prefix,
      ariaLabel: this.ariaLabel,
      children: this.children.map((child) =>
        child.toConfig()
      ),
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
