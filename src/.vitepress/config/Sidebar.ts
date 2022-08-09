import type { DefaultTheme } from "vitepress";
import type { ThemeConfig } from "./types.js";

export const SIDEBAR: ThemeConfig["sidebar"] = {
  "/guides/": [
    {
      items: [
        item("Getting Started", "/guides/index.md"),
        item("Our Guiding Principle", "/guides/principle.md"),
      ],
    },
    group("Fundamentals", [
      item("Cells", "/guides/fundamentals/cells.md"),
      item("Functions", "/guides/fundamentals/functions.md"),
      item("Validation", "/guides/fundamentals/validation.md"),
      item("Resources", "/guides/fundamentals/resources.md"),
    ]),
    group(
      "Digging Deeper",
      [
        item("Reactive Collections", "/guides/collections.md"),
        item("Developer Tools", "/guides/devtools.md"),
        item("Equivalence", "/guides/advanced/equivalence.md"),
      ],
      "expanded"
    ),
    group("Optimization", [
      item("Formulas", "/guides/optimization/formulas.md"),
    ]),
  ],
  "/api/": [
    group("@starbeam/timeline", [item("index", "/api/timeline.md")]),
    group("@starbeam/core", [
      item("Cell", "/api/core/cell.md"),
      item("Formula", "/api/core/formula.md"),
      item("Resource", "/api/core/resource.md"),
    ]),
  ],
  "/frameworks/react/": [
    group("React", [item("Getting Started", "/frameworks/react/index.md")]),
  ],
  "/demos/": [],
};

type AnonymousGroupArgs = [
  items: DefaultTheme.SidebarItem[],
  collapse?: "expanded" | "collapsed"
];

type NamedGroupArgs = [
  text: string,
  items: DefaultTheme.SidebarItem[],
  collapse?: "expanded" | "collapsed"
];

function item(text: string, link: string): DefaultTheme.SidebarItem {
  return {
    text,
    link,
  };
}

function group(
  ...args: AnonymousGroupArgs | NamedGroupArgs
): DefaultTheme.SidebarGroup {
  if (Array.isArray(args[0])) {
    const [items, collapse] = args as AnonymousGroupArgs;

    return {
      items,
      ...groupOptions(collapse),
    };
  } else {
    const [text, items, collapse] = args as NamedGroupArgs;

    return {
      text,
      items,
      ...groupOptions(collapse),
    };
  }
}

function groupOptions(
  collapse: "expanded" | "collapsed" | undefined
): Pick<DefaultTheme.SidebarGroup, "collapsed" | "collapsible"> {
  switch (collapse) {
    case "expanded":
      return {
        collapsible: true,
      };
    case "collapsed":
      return {
        collapsible: true,
        collapsed: true,
      };
    case undefined:
      return {};
  }
}
