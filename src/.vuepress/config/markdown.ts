import { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";

type Feature =
  | "gfm"
  | "container"
  | "vpre"
  | "tabs"
  | "codetabs"
  | "align"
  | "sup"
  | "sub"
  | "footnote"
  | "imageMark"
  | "lazyLoad"
  | "mark"
  | "chart"
  | "echarts"
  | "flowchart"
  | "mermaid";

type LinkCheck = "always" | "dev" | "build" | "never";

function checkLinkCheck(linkCheck: string): LinkCheck {
  switch (linkCheck) {
    case "always":
    case "dev":
    case "build":
    case "never":
      return linkCheck;
    default:
      throw new Error(
        `Invalid linkCheck: ${linkCheck} (expected one of ["always", "dev", "build", "never"])`
      );
  }
}

interface MdEnhanceJSONOptions {
  features: string[];
  linkCheck?: string;
  attrs?:
    | boolean
    | {
        left?: string;
        right?: string;
        allowed?: string[];
      };
  taskList?: boolean | ("disabled" | "label")[];
}

export function buildMdEnhance(
  options: MdEnhanceJSONOptions,
  extra: Partial<MarkdownEnhanceOptions> = {}
): MarkdownEnhanceOptions {
  const features = Object.fromEntries(
    options.features.map((f) => [f, true])
  );

  const linkCheck =
    options.linkCheck === undefined
      ? {}
      : { linkCheck: checkLinkCheck(options.linkCheck) };

  return {
    ...features,
    ...linkCheck,
    attrs: options.attrs,
    tasklist:
      typeof options.taskList === "boolean"
        ? options.taskList
        : {
            disabled:
              options.taskList?.includes("disabled") ??
              true,
            label:
              options.taskList?.includes("label") ?? true,
          },
    ...extra,
  };
}
