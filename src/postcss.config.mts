import extend from "postcss-extend-rule";
import functions from "postcss-functions";
import type { Config } from "postcss-load-config";
import vars from "postcss-simple-vars";
// import values from "postcss-modules-values";
import "postcss";
import postcss, {
  Result,
  list,
  type AcceptedPlugin,
  type Plugin,
  Declaration,
  Node,
} from "postcss";
import cssvars from "postcss-css-variables";
import mixins from "postcss-mixins";
import nested from "postcss-nested";
import preset from "postcss-preset-env";
import property from "postcss-property-lookup";
import prefixSelector from "postcss-prefix-selector";

const PRESET = preset({
  stage: 1,
  features: {
    "lab-function": true,
    "oklab-function": true,
    "color-functional-notation": true,
    "color-function": true,
    "custom-selectors": true,
    "cascade-layers": false,
  },
});

export default {
  plugins: [
    section(),
    using({
      content: [
        nested(),
        prefixSelector({
          prefix: "#app .vp-doc",
          transform: (prefix, selector, prefixedSelector, file) => {
            const topMatch = selector.match(/^:top(?:\((.*)\))?$/);

            if (topMatch) {
              const child = topMatch[1];

              if (child) {
                return `${prefix} > div > ${topMatch[1]}`;
              } else {
                return `${prefix} > div`;
              }
            }

            return prefixedSelector;
          },
        }) as AcceptedPlugin,

        PRESET,
      ],
    }),
    extend(),
    vars({}),
    functions({ color }),
    property(),
    nested(),
    defVars(),
    using({
      vars: [vars()],

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

    pow(),
    PRESET,
  ],
} satisfies Config;

function exportedVar(decl: Declaration): boolean | "computed" {
  if (decl.variable && decl.prop.match(/^[-][-](sb|vp)[-]/)) {
    return "computed";
  } else {
    return false;
  }
}

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
          using: async (rule, h) => {
            const params = rule.params.split(",").map((p) => p.trim());
            let currentNodes: Node[] = rule.nodes;

            for (const param of params) {
              const plugin = plugins[param];
              if (plugin) {
                const toProcess = currentNodes
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
  } satisfies Plugin;
}

function pow(): Plugin {
  return {
    postcssPlugin: "pow",
    prepare: (result) => {
      return {
        Declaration: (decl, h) => {
          const POW_REGEX = /pow\(([^)]+.+?)\)/;

          // Check if decl has a pow function inside it
          const matches = POW_REGEX.exec(decl.value);

          if (!matches) {
            return;
          }

          const [base, power] = (matches[1] as string).split(",") as [string, string];
          const fnArgs = {
            base: base.trim(),
            power: Number(power.trim()),
          };

          // Replace the function with css variable that calculates the power
          decl.value = decl.value.replace(POW_REGEX, () => {
            if (fnArgs.power !== undefined && fnArgs.power > 0) {
              let string = "(" + fnArgs.base;
              for (let i = 0; i < fnArgs.power - 1; i++) {
                string += " * " + fnArgs.base;
              }
              return string + ")";
            } else if (fnArgs.power === 0) {
              return "1";
            } else {
              fnArgs.power = Math.abs(fnArgs.power);
              let string = "(1 / (" + fnArgs.base;
              for (let i = 0; i < fnArgs.power - 1; i++) {
                string += " * " + fnArgs.base;
              }
              return string + "))";
            }
          });
        },
      };
    },
  };
}

function section(): Plugin {
  return {
    postcssPlugin: "section",
    prepare: (result) => {
      return {
        AtRule: {
          section: async (rule, h) => {
            rule.replaceWith(rule.nodes);
          },
        },
      };
    },
  } satisfies Plugin;
}

function defVars(): Plugin {
  return {
    postcssPlugin: "def-vars",
    prepare: (result) => {
      return {
        AtRule: {
          "def-vars": async (rule, h) => {
            const newRule = new h.Rule({ selectors: [":root", "::before", "::after", "::marker"] });
            newRule.append(rule.nodes);
            rule.replaceWith(newRule);
          },
          "def-derived-vars": async (rule, h) => {
            const newRule = new h.Rule({ selectors: ["*", "::before", "::after", "::marker"] });
            newRule.append(rule.nodes);
            rule.replaceWith(newRule);
          },
        },
      };
    },
  } satisfies Plugin;
}
