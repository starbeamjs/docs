import extend from "postcss-extend-rule";
import functions from "postcss-functions";
import type { Config } from "postcss-load-config";
import vars from "postcss-simple-vars";
// import values from "postcss-modules-values";
import "postcss";
import postcss, { Result, list, type AcceptedPlugin, type Plugin } from "postcss";
import cssvars from "postcss-css-variables";
import mixins from "postcss-mixins";
import nested from "postcss-nested";
import preset from "postcss-preset-env";
import property from "postcss-property-lookup";
import purge from "@fullhuman/postcss-purgecss";

const PRESET = preset({
  stage: 1,
  features: {
    "lab-function": true,
    "oklab-function": true,
    "color-functional-notation": true,
    "color-function": true,
  },
});

export default {
  plugins: [
    extend(),
    vars({}),
    functions({ color }),
    property(),
    nested(),
    using({
      vars: [vars({})],
      mixins: [mixins({})],
      brand: [
        mixins(),
        vars(),
        cssvars({
          preserve: (decl) => {
            if (decl.variable) {
              if (decl.prop.match(/^[-][-](sb|vp)[-]/)) {
                return "computed";
              } else {
                return false;
              }
            }
            return false;
          },
        }),
        PRESET,
      ],
    }),

    PRESET,
  ],
} satisfies Config;

const LIGHT = {
  dimmest: "95%",
  dimmer: "90%",
  dim: "80%",
  normal: "70%",
  strong: "60%",
  stronger: "50%",
  strongest: "40%",
};

const DARK = {
  dimmest: "5%",
  dimmer: "10%",
  dim: "20%",
  normal: "30%",
  strong: "60%",
  stronger: "50%",
  strongest: "40%",
};

export function color(
  h: string | number,
  s: string | number,
  l: "light" | "normal" | "dark"
): string {
  const sat = typeof s === "string" ? s : `${s}%`;

  return `hsl(${h}, ${sat}, var(--color-lightness-${l}))`;
}

var comma = list.comma;

function using(plugins: Record<string, AcceptedPlugin[]>): Plugin {
  return {
    postcssPlugin: "using",
    prepare: (result) => {
      return {
        AtRule: {
          using: async (rule) => {
            const params = rule.params.split(",").map((p) => p.trim());

            for (const ctx of params) {
              const plugin = plugins[ctx];
              if (plugin) {
                const toProcess = rule.nodes
                  .map((n) => (n.type === "decl" ? `${String(n)};` : String(n)))
                  .join("\n");

                let next = { css: toProcess } as { css: string } & Partial<Result>;
                for (const p of plugin) {
                  next = await postcss(p).process(next.css, result.opts);
                }
                if (next.root) {
                  rule.replaceWith(next.root.nodes);
                }
              }
            }
          },
        },
      };
    },
  };
}
