import type { DefaultTheme } from "vitepress";
import type { Sidebar } from "./types.js";

export const SIDEBAR: Sidebar = {
  "/guides/": [
    {
      items: [
        item("Getting Started", "/guides/index.md"),
        item("Our Guiding Principle", "/guides/principle.md"),
      ],
    },
    group("How to Read These Guides", [
      item("Stylistic Conventions", "/guides/legend.md"),
    ]),

    group("Reactive Fundamentals", [
      item("Cells", "/guides/fundamentals/cells.md"),
      item("Functions", "/guides/fundamentals/functions.md"),
      item("Resources", "/guides/fundamentals/resources.md"),
    ]),
    // group("Universal Code", []),
    // group("Universal Building Blocks", [
    //   item("Introduction", "/guides/universal/index.md"),
    //   item("Reactives", "/guides/universal/reactive.md"),
    //   item("Resources", "/guides/universal/resources.md"),
    //   item("DOM Resources", "/guides/universal/dom-resources.md"),
    //   item("Modifiers", "/guides/universal/modifiers.md"),
    //   item("Services", "/guides/universal/services.md"),
    // ]),
    group("Philosophy", [
      item("Universal Reactivity", "/guides/universal-reactivity.md"),
      item("Validation", "/guides/fundamentals/validation.md"),
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
    group("@starbeam/timeline", [
      item("LIFETIME", "/api/timeline/lifetime.md"),
      item("TIMELINE", "/api/timeline/timeline.md"),
      item("ReactiveProtocol", "/api/timeline/protocol.md"),
    ]),
    group("@starbeam/universal", [
      item("Cell", "/api/core/cell.md"),
      item("Formula", "/api/core/formula.md"),
      item("Resource", "/api/core/resource.md"),
      item("ResourceList", "/api/core/resource-list.md"),
    ]),
  ],
  "/frameworks": [
    item("React", "/frameworks/react/index.md"),
    item("Preact", "/frameworks/preact/index.md"),
  ],
  "/frameworks/react/": [
    group("React", [item("Getting Started", "/frameworks/react/index.md")]),
    group("Tutorial", [
      item("Introduction", "/frameworks/react/tutorial/index.md"),
      item(
        "Getting Started",
        "/frameworks/react/tutorial/1-getting-started.md"
      ),
      item("Computed Data", "/frameworks/react/tutorial/2-computed-data.md"),
      item(
        "Reactive Builtins",
        "/frameworks/react/tutorial/3-reactive-builtins.md"
      ),
      item(
        "Reactive Arrays",
        "/frameworks/react/tutorial/4-reactive-arrays.md"
      ),
    ]),
    group("Tutorial Bonus", [
      item(
        "More with Reactive Arrays",
        "/frameworks/react/tutorial/5-reactive-arrays-bonus.md"
      ),
    ]),
  ],
  "/frameworks/preact/": [
    group("Preact", [item("Getting Started", "/frameworks/preact/index.md")]),
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
): DefaultTheme.SidebarItem {
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
): Pick<DefaultTheme.SidebarItem, "collapsed"> {
  switch (collapse) {
    case "expanded":
    case "collapsed":
      return {
        collapsed: collapse === "collapsed",
      };
    case undefined:
      return {};
  }
}
