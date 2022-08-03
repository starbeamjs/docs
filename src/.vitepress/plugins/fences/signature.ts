import { explainSync, type Signature } from "jsdoc-api";
import type { PluginSimple } from "markdown-it";
import type Renderer from "markdown-it/lib/renderer.js";
import type Token from "markdown-it/lib/token.js";
import { FunctionSignature } from "./function.js";
import { MemberSignature } from "./member.js";
import { RenderFence } from "./type.js";

export const signature: PluginSimple = (md) => {
  // Handle ```signature blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (
    tokens: Token[],
    index: number,
    options: markdownit.Options,
    env: any,
    self: Renderer
  ): string => {
    const token = tokens[index]!;
    const { info } = token;
    const [lang, type, ...rest] = info.split(":", 3);

    const render = new RenderFence(
      md,
      () => fence!(tokens, index, options, env, self),
      options,
      env,
      self
    );

    if (lang === "ts" && type === "signature") {
      token.info = "ts";
      const source = token.content.trim();

      let parsed: Signature[];

      try {
        parsed = explainSync({ source });
      } catch (e: any) {
        token.content = `${source}\n\n${e.stack}`;
        return render.renderToken();
      }

      try {
        const explained: Signature = parsed[0]!;

        switch (explained.kind) {
          case "function":
            return FunctionSignature(explained, source, token, render);
          case "member":
            return MemberSignature(explained, source, token, render);
          default:
        }
      } catch (e: any) {
        token.content = `${source}\n\n${JSON.stringify(parsed, null, 2)}\n\n${
          e.stack
        }`;
      }
    }

    return render.renderToken();
  };
};
