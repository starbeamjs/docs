import type { ExecaError } from "execa";
import { execaSync } from "execa";
import type { MarkdownEnv } from "vitepress";
import parseFence from "fenceparser";
import { existsSync } from "fs";
import type MarkdownIt from "markdown-it";
import type { PluginWithOptions } from "markdown-it";
import Renderer from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
import { resolve } from "path";
import { root } from "../paths.js";
import { preprocess } from "./styles.js";

type OBJECT = ReturnType<typeof parseFence>;

function default_render(result: string, attrs: OBJECT): string {
  const width = attrs["width"] ?? "100%";
  const expr = `decode('${btoa(result)}')`;

  const injection = `<div class="d2" style="width:${width};" v-html="${expr}" />\n`;
  return injection;
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
  bundle?: boolean;
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

  if ("bundle" in options) {
    if (options.bundle) {
      out.push("--bundle");
    } else {
      out.push("--no-bundle");
    }
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
    env: MarkdownEnv,
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
      const d2 = resolve(root, "bin", "d2");

      if (!existsSync(d2)) {
        return `<pre class='error'>d2 binary was not found</pre>`;
      }

      const original = token.content.trim();
      const code = preprocess(original);

      const cmd = `node`;

      try {
        const result = execaSync(cmd, [`${d2}.mjs`, ...optionsToFlags(opts)], {
          cwd: resolve(root, "bin"),
          input: code,
          extendEnv: true,
          env: {
            NODE_DEBUG: "d2",
          },
        });

        if (result.exitCode === 0) {
          const output = postprocess(result.stdout);
          // console.log("stderr", result.stderr);
          // console.log("stdout", result.stdout);
          // console.log("output", output);
          // let content = /*js*/ `
          //   if (globalThis.document) {
          //     const content = ${JSON.stringify(output)};
          //     const template = document.createElement("template");
          //     template.innerHTML = content;
          //     console.log(template.cloneNode(true));
          //     document.body.appendChild(template.content);
          //     debugger;
          //   }
          // `;

          // const sfcBlocks = env.sfcBlocks!;
          // let setup = sfcBlocks!.scriptSetup;

          // if (setup) {
          //   setup.contentStripped += `\n${content}`;
          //   const newContent = setup.contentStripped;

          //   setup.content = setup.content.replace(
          //     /(<script[^>]*>)(.*)(<\/script>)/g,
          //     (_, open, _content, close) => open + newContent + close
          //   );
          // } else {
          //   setup = sfcBlocks.scriptSetup = {
          //     type: "script",
          //     content: `<script setup>${content}</script>`,
          //     contentStripped: content,
          //     tagOpen: "<script setup>",
          //     tagClose: "</script>",
          //   };
          //   sfcBlocks.scripts.push(setup);
          // }

          return default_render(output, parsed);
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

/**
 * Postprocess the output and encode it as a data URI.
 */
function postprocess(output: string): string {
  return output.replaceAll(/<[?].*?[?]>/gm, "");
}

function escapeHTML(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
