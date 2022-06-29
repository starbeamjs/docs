import { PluginSimple } from "markdown-it";
import { FunctionSignature } from "./function";
import {
  RenderFence,
  Param,
  Property,
  Returns,
  Tag,
} from "./type";
import { explainSync } from "jsdoc-api";
import { MemberSignature } from "./member";
import { mergeConfig } from "vite";
import Token from "markdown-it/lib/token";
import Renderer from "markdown-it/lib/renderer";

export interface ExplainedFunction extends Explained {
  kind: "function";
  params: Param[];
  returns: Returns[];
}

export interface ExplainedMember extends Explained {
  kind: "member";
  properties: Property[];
  tags: Tag[];
}

interface ExplainedOther extends Explained {
  kind:
    | "class"
    | "constant"
    | "event"
    | "external"
    | "file"
    | "mixin"
    | "module"
    | "namespace"
    | "typedef";
}

export type Signature =
  | ExplainedFunction
  | ExplainedMember
  | ExplainedOther;

interface Explained {
  comment: string;
  meta: {
    range: [start: number, end: number];
    filename: string;
    lineno: string;
    columnno: string;
    code: {
      id: string;
      name: string;
      type: string;
      paramnames: string[];
    };
  };
  name: string;
  longname: string;
  // "function" | "member"
  kind: string;
  // "global"
  scope: string;
}

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
    const token = tokens[index];
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
      token.info = "ts:no-line-numbers";
      const source = token.content.trim();

      let parsed: Signature[];

      try {
        parsed = explainSync({ source });
      } catch (e) {
        token.content = `${source}\n\n${e.stack}`;
        return render.renderToken();
      }

      try {
        const explained: Signature = parsed[0];

        switch (explained.kind) {
          case "function":
            return FunctionSignature(
              explained,
              source,
              token,
              render
            );
          case "member":
            return MemberSignature(
              explained,
              source,
              token,
              render
            );
          default:
        }
      } catch (e) {
        token.content = `${source}\n\n${JSON.stringify(
          parsed,
          null,
          2
        )}\n\n${e.stack}`;
      }
    }

    return render.renderToken();
  };
};
