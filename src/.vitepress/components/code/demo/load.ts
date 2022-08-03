import { Code, CodeDemoOptions, CodeType, PreProcessorType } from "./types.js";

export type ScriptLoadState = Record<string, Promise<void>>;

const state: ScriptLoadState = {};

export const useState = (): ScriptLoadState => state;

export const loadReact = (code: Code): Promise<void[]> =>
  Promise.all([
    loadScript(state, code.babel),
    loadScript(state, code.react),
    loadScript(state, code.reactDOM),
  ]);

export const loadVue = (code: Code): Promise<void[]> => {
  const promises = [loadScript(state, code.vue)];

  if (code.useBabel) promises.push(loadScript(state, code.babel));

  return Promise.all(promises);
};

export const loadNormal = (code: Code): Promise<void> =>
  code.useBabel ? loadScript(state, code.babel) : Promise.resolve();

function loadScript(
  state: Record<string, Promise<void>>,
  link: string
): Promise<void> {
  if (state[link] !== undefined) return state[link];

  const loadEvent = new Promise<void>((resolve) => {
    const script = document.createElement("script");

    script.src = link;
    document.querySelector("body")?.appendChild(script);

    script.onload = (): void => {
      resolve();
    };
  });

  state[link] = loadEvent;

  return loadEvent;
}

export function getCode(code: Record<string, string>): CodeType {
  const languages = Object.keys(code);
  const result: CodeType = {
    html: [],
    js: [],
    css: [],
    isLegal: false,
  };

  (["html", "js", "css"] as PreProcessorType[]).forEach((type) => {
    const match = languages.filter((language) =>
      preProcessorConfig[type].types.includes(language)
    );

    if (match.length) {
      const language = match[0];

      result[type] = [
        code[language].replace(/^\n|\n$/g, ""),
        preProcessorConfig[type].map[language] || language,
      ];
    }
  });

  result.isLegal =
    (!result.html.length || result.html[1] === "none") &&
    (!result.js.length || result.js[1] === "none") &&
    (!result.css.length || result.css[1] === "none");

  return result;
}

export function getNormalCode(
  code: CodeType,
  config: Partial<CodeDemoOptions>
): Code {
  const codeConfig = getConfig(config);
  const js = code.js[0] || "";

  return {
    ...codeConfig,
    html: handleHTML(code.html[0] || ""),
    js,
    css: code.css[0] || "",
    isLegal: code.isLegal,
    getScript: (): string => js,
  };
}

export const preProcessorConfig: Record<
  PreProcessorType,
  {
    types: string[];
    map: Record<string, string | undefined>;
  }
> = {
  html: {
    types: ["html", "slim", "haml", "md", "markdown", "vue"],
    map: {
      html: "none",
      vue: "none",
      md: "markdown",
    },
  },
  js: {
    types: [
      "js",
      "javascript",
      "coffee",
      "coffeescript",
      "ts",
      "typescript",
      "ls",
      "livescript",
    ],
    map: {
      js: "none",
      javascript: "none",
      coffee: "coffeescript",
      ls: "livescript",
      ts: "typescript",
    },
  },
  css: {
    types: ["css", "less", "sass", "scss", "stylus", "styl"],
    map: {
      css: "none",
      styl: "stylus",
    },
  },
};

export function getConfig(config: Partial<CodeDemoOptions>): CodeDemoOptions {
  const jsLib = Array.from(new Set([...(config.jsLib ?? [])]));
  const cssLib = Array.from(new Set([...(config.cssLib ?? [])]));

  return {
    ...config,
    jsLib,
    cssLib,
  } as CodeDemoOptions;
}

function handleHTML(html: string): string {
  return html
    .replace(/<br \/>/g, "<br>")
    .replace(/<((\S+)[^<]*?)\s+\/>/g, "<$1></$2>");
}
