import {
  HopeThemeSidebarConfig,
  HopeThemeSidebarItem,
} from "vuepress-theme-hope";

type SidebarItem = string | SidebarGroup;

interface SidebarGroup {
  [key: string]: SidebarItem[];
}

type SidebarConfig = Record<string, SidebarConfigValue>;

type SidebarConfigValue =
  | HopeThemeSidebarItem[]
  | "structure";

export function sidebarFrom(
  items: SidebarItem[]
): SidebarConfig {
  return Object.fromEntries(
    items
      .flatMap((item) => flattenItem(item))
      .map((item) => [`${item}/`, "structure"])
  );
}

/**
 * Flatten a nested structure like this:
 *
 * ```json
 * [
 *    "/guides",
 *    "/api",
 *    {
 *      "/frameworks": ["react", "svelte", "vue", "ember"]
 *    },
 *    "/demos",
 *    "/details"
 *  ]
 * ```
 *
 * into this:
 *
 * ```json
 * [
 *   "/guides",
 *   "/api",
 *   "/frameworks/react",
 *   "/frameworks/svelte",
 *   "/frameworks/vue",
 *   "/frameworks/ember",
 *   "/demos",
 *   "/details"
 * ]
 * ```
 */
function flattenNests(
  nests: SidebarGroup,
  current?: string
): string[] {
  return Object.entries(nests).flatMap(([key, value]) => {
    if (typeof value === "string") {
      return current ? [`${current}/${value}`] : [value];
    } else {
      return value.flatMap((item) =>
        flattenItem(
          item,
          current ? `${current}/${key}` : key
        )
      );
    }
  });
}

function flattenItem(
  item: SidebarItem,
  current?: string
): string[] {
  if (typeof item === "string") {
    return current ? [`${current}/${item}`] : [item];
  } else {
    return flattenNests(item, current);
  }
}
