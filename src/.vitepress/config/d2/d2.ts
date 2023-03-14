import type { ExecaError } from "execa";
import { execaSync } from "execa";
import parseFence from "fenceparser";
import { existsSync } from "fs";
import type MarkdownIt from "markdown-it";
import type { PluginWithOptions } from "markdown-it";
import Renderer from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
import encodeSVG from "mini-svg-data-uri";
import { resolve } from "path";
import { root } from "../paths.js";
import { preprocess } from "./styles.js";

type OBJECT = ReturnType<typeof parseFence>;

function default_render(result: string, attrs: OBJECT): string {
  const width = attrs["width"] ?? "100%";
  return `<div class="d2" style="width: ${width};">${result}</div>`;
}

export enum LightTheme {
  Default = 0,
  NeutralGrey = 1,
  FlagshipTerrastruct = 3,
  CoolClassics = 4,
  MixedBerryBlue = 5,
  GrapeSoda = 6,
  Aubergine = 7,
  ColorblindClear = 8,
  VanillaNitroCola = 100,
  OrangeCreamsicle = 101,
  ShirleyTemple = 102,
  EarthTones = 103,
  EvergladeGreen = 104,
  ButteredToast = 105,
}

export enum DarkTheme {
  DarkMauve = 200,
}

export type Theme = LightTheme | DarkTheme;

export interface D2Options {
  layout: "dagre" | "elk" | "tala" | ElkOptions;
  theme?: Theme | undefined;
  darkTheme?: DarkTheme | undefined;
  sketch?: true | undefined;
  pad?: number | undefined;
}

function optionsToFlags(options?: D2Options | undefined): string[] {
  const out: string[] = [];

  if (options === undefined) {
    return out;
  }

  if (options.layout === "dagre" || options.layout === "tala") {
    out.push("--layout", options.layout);
  } else {
    out.push(...elkOptionsToFlags(options.layout));
  }

  if (options.theme !== undefined) {
    out.push("--theme", `${options.theme}`);
  }

  if (options.darkTheme !== undefined) {
    out.push("--dark-theme", `${options.darkTheme}`);
  }

  if (options.sketch !== undefined) {
    out.push("--sketch");
  }

  if (options.pad !== undefined) {
    out.push(`--pad`, `${options.pad}`);
  }

  return out;
}

interface ElkOptions {
  type: "elk";
  algorithm?: "layered";
  nodeNodeBetweenLayers?: number;
  nodeSelfLoop?: number;
  padding?:
    | number
    | {
        top: number;
        right: number;
        bottom: number;
        left: number;
      }
    | {
        inline: number;
        block: number;
      };
}

function elkOptionsToFlags(options: "elk" | ElkOptions): string[] {
  const out: string[] = ["--layout", "elk"];

  if (options === "elk") {
    return out;
  }

  if (options.algorithm) {
    out.push("--elk-algorithm", options.algorithm);
  }

  if (options.nodeNodeBetweenLayers) {
    out.push(
      "--elk-nodeNodeBetweenLayers",
      String(options.nodeNodeBetweenLayers)
    );
  }

  if (options.nodeSelfLoop) {
    out.push("--elk-nodeSelfLoop", String(options.nodeSelfLoop));
  }

  if (options.padding) {
    const { padding } = options;
    if (typeof padding === "number") {
      out.push(
        "--elk-padding",
        `[top=${padding}],[left=${padding}],[bottom=${padding}],[right=${padding}]`
      );
    } else {
      if ("top" in padding) {
        const { top, right, bottom, left } = padding;
        out.push(
          "--elk-padding",
          `[top=${top}],[left=${left}],[bottom=${bottom}],[right=${right}]`
        );
      } else {
        const { inline, block } = padding;
        out.push(
          "--elk-padding",
          `[top=${block}],[left=${inline}],[bottom=${block}],[right=${inline}]`
        );
      }
    }
  }

  return out;
}

const D2Plugin: PluginWithOptions<D2Options> = (
  md: MarkdownIt,
  opts?: D2Options
) => {
  const tempFence = md.renderer.rules.fence!.bind(md.renderer.rules)!;
  md.renderer.rules.fence = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    slf: Renderer
  ) => {
    const token = tokens[idx]!;
    const chunks = (token!.info || ``).match(/^(\S+)(\s+(.+))?/);
    if (!chunks || !chunks.length) {
      return tempFence(tokens, idx, options, env, slf);
    }
    const lang = chunks[1];
    const rest = chunks.slice(1).join(" ");
    const parsed = parseFence(rest);

    const isD2 = lang === "d2";

    if (isD2) {
      const cmd = resolve(root, "bin", "d2");

      if (!existsSync(cmd)) {
        return `<pre class='error'>d2 binary was not found</pre>`;
      }

      const original = token.content.trim();
      const code = preprocess(original);

      try {
        const result = execaSync(cmd, [...optionsToFlags(opts), "-"], {
          cwd: resolve(root, "bin"),
          input: code,
        });

        if (result.exitCode === 0) {
          const output = encodeSVG(result.stdout);

          return default_render(`<img src="${output}">`, parsed);
        } else {
          console.group("code");
          console.debug(code);
          console.groupEnd();

          console.group("original");
          console.debug(original);
          console.groupEnd();
          return `<pre class='error'>${result.stderr}</pre>`;
        }
      } catch (e) {
        console.group("code");
        console.debug(code);
        console.groupEnd();

        console.group("original");
        console.debug(original);
        console.groupEnd();
        console.error(e);
        return `<pre class='error'>${String(e as ExecaError)}</pre>`;
      }
      // const render_f = opts
      //   ? opts.render_f || default_render
      //   : default_render;
      // const result = pikchr.render(code);
      // return render_f(result);
    }
    return tempFence(tokens, idx, options, env, slf);
  };
};
export default D2Plugin;

function escapeHTML(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
