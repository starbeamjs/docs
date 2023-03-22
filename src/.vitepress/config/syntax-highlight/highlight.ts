import { customAlphabet } from "nanoid";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  Highlighter,
  HtmlRendererOptions,
  IThemeRegistration,
  Lang,
} from "shiki";
import {
  LineOptions,
  addClass,
  createDiffProcessor,
  createFocusProcessor,
  createHighlightProcessor,
  createRangeProcessor,
  defineProcessor,
  getHighlighter,
  type Processor,
} from "shiki-processor";
import glimmerLang from "./glimmer.tmLanguage.json" assert { type: "json" };
import handlebarsLang from "./handlebars.tmLanguage.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

type ThemeOptions =
  | IThemeRegistration
  | { light: IThemeRegistration; dark: IThemeRegistration };

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);

type HtmlOptions = NonNullable<Parameters<Highlighter["codeToHtml"]>[1]>;

/**
 * 2 steps:
 *
 * 1. convert attrs into line numbers:
 *    {4,7-13,16,23-27,40} -> [4,7,8,9,10,11,12,13,16,23,24,25,26,27,40]
 * 2. convert line numbers into line options:
 *    [{ line: number, classes: string[] }]
 */
const attrsToLines = (attrs: string): HtmlRendererOptions["lineOptions"] => {
  attrs = attrs.replace(/^(?:\[.*?\])?.*?([\d,-]+).*/, "$1").trim();

  if (!attrs) {
    return [];
  }

  return attrs
    .split(",")
    .flatMap((v) => {
      const [start, end] = v.split("-").map((v) => parseInt(v, 10));

      if (start && end) {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      } else if (start) {
        return [start];
      } else {
        return [];
      }
    })
    .map((v) => ({
      line: v,
      classes: ["highlighted"],
    }));
};

const errorLevelProcessor = defineProcessor({
  name: "error-level",
  handler: createRangeProcessor({
    error: ["highlighted", "error"],
    warning: ["highlighted", "warning"],
  }),
});

const customProcessor = defineProcessor({
  name: "react",
  handler: createRangeProcessor({
    types: ["starbeam", "interface"],
    react: ["starbeam", "react-preact", "react"],
    preact: ["starbeam", "react-preact", "preact"],
    "template-tag": ["starbeam", "sfc", "tag", "template"],
    "template-tag-ann": ["starbeam", "sfc", "tag", "template", "annotate"],
    script: ["starbeam", "sfc", "script"],
    "script-ann": ["starbeam", "sfc", "script", "annotate"],
    template: ["starbeam", "sfc", "bare", "template"],
    "template-ann": ["starbeam", "sfc", "bare", "tag", "template", "annotate"],
    ann: ["starbeam", "annotate"],
  }),
  postProcess: ({ code }): string | undefined => {
    const hasStarbeam = code.match(/class="[^"]*starbeam[^"]*"/);
    if (hasStarbeam) {
      return addClass(code, "has-starbeam-lines", "pre");
    } else {
      return;
    }
  },
});

export async function highlight(
  theme: ThemeOptions = "material-palenight",
  defaultLang: string = ""
): Promise<(str: string, specifiedLanguage: string, attrs: string) => string> {
  const hasSingleTheme = typeof theme === "string" || "name" in theme;
  const getThemeName = (themeValue: IThemeRegistration) =>
    typeof themeValue === "string" ? themeValue : themeValue.name;

  const processors: Processor[] = [
    createFocusProcessor(),
    createHighlightProcessor({ hasHighlightClass: "highlighted" }),
    createDiffProcessor(),
    customProcessor,
    errorLevelProcessor,
  ];

  const highlighter = await getHighlighter({
    themes: hasSingleTheme ? [theme] : [theme.dark, theme.light],
    processors,
  });

  await highlighter.loadLanguage({
    ...handlebarsLang,
    path: resolve(__dirname, "handlebars.tmLanguage.json"),
  });

  await highlighter.loadLanguage({
    ...glimmerLang,
    path: resolve(__dirname, "glimmer.tmLanguage.json"),
  });

  const styleRE = /<pre[^>]*(style=".*?")/;
  const preRE = /^<pre(.*?)>/;
  const vueRE = /-vue$/;
  const lineNoRE = /:(no-)?line-numbers$/;
  const mustacheRE = /\{\{.*?\}\}/g;

  return (str: string, specifiedLanguage: string, attrs: string) => {
    const vPre = vueRE.test(specifiedLanguage) ? "" : "v-pre";
    const lang =
      (specifiedLanguage
        .replace(lineNoRE, "")
        .replace(vueRE, "")
        .toLowerCase() as Lang) || (defaultLang as Lang);

    const lineOptions = attrsToLines(attrs);
    const cleanup = (str: string) =>
      str
        .replace(preRE, (_, attributes) => `<pre ${vPre}${attributes}>`)
        .replace(styleRE, (_, style) => _.replace(style, ""));

    const mustaches = new Map<string, string>();

    const removeMustache = (s: string) => {
      if (vPre) return s;
      return s.replace(mustacheRE, (match) => {
        let marker = mustaches.get(match);
        if (!marker) {
          marker = nanoid();
          mustaches.set(match, marker);
        }
        return marker;
      });
    };

    const restoreMustache = (s: string) => {
      mustaches.forEach((marker, match) => {
        s = s.replaceAll(marker, match);
      });
      return s;
    };

    if (hasSingleTheme) {
      const options: HtmlOptions = {
        lang,
        theme: getThemeName(theme),
      };

      if (lineOptions) {
        options.lineOptions = lineOptions;
      }

      // const options: HtmlOptions = { lang, lineOptions, theme: getThemeName(theme) };
      return cleanup(
        restoreMustache(highlighter.codeToHtml(removeMustache(str), options))
      );
    }

    const dark = addClass(
      cleanup(
        highlighter.codeToHtml(
          str,
          renderOptions({ lang, lineOptions, theme: theme.dark })
        )
      ),
      "vp-code-dark",
      "pre"
    );

    const light = addClass(
      cleanup(
        highlighter.codeToHtml(
          str,
          renderOptions({
            lang,
            lineOptions,
            theme: theme.light,
          })
        )
      ),
      "vp-code-light",
      "pre"
    );

    return dark + light;
  };
}

function renderOptions({
  lang,
  lineOptions,
  theme,
}: {
  lang: Lang;
  lineOptions?: LineOptions | undefined;
  theme: IThemeRegistration;
}) {
  const options: HtmlOptions = {
    lang,
    theme: getThemeName(theme),
  };

  if (lineOptions) {
    options.lineOptions = lineOptions;
  }

  return options;
}

function getThemeName(themeValue: IThemeRegistration) {
  return typeof themeValue === "string" ? themeValue : themeValue.name;
}
