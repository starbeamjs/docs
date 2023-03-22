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
  Rule,
} from "postcss";
import cssvars from "postcss-css-variables";
import mixins from "postcss-mixins";
import nested from "postcss-nested";
import preset from "postcss-preset-env";
import property from "postcss-property-lookup";
import prefixSelector from "postcss-prefix-selector";
// import { parse, walk, generate, fromPlainObject, } from "css-tree";
import * as csstree from "css-tree";

const PRESET = preset({
  stage: 1,
  browsers: "supports css-matches-pseudo",
  autoprefixer: {
    overrideBrowserslist: ["last 2 versions"],
    add: true,
    remove: true,
  },
  features: {
    "lab-function": true,
    "oklab-function": true,
    "color-functional-notation": true,
    "color-function": true,
    "custom-selectors": true,
    "cascade-layers": false,
    "is-pseudo-class": false,
    "logical-properties-and-values": false,
    "logical-viewport-units": false,
  },
});

const USING_CONTENT = using({
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
});

export default {
  plugins: [
    customBlocks(),
    USING_CONTENT,
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

    PRESET,
  ],
} satisfies Config;

export function color(
  h: string | number,
  s: string | number,
  l: "light" | "normal" | "dark"
): string {
  const sat = typeof s === "string" ? s : `${s}%`;

  return `hsl(${h}, ${sat}, var(--color-lightness-${l}))`;
}

function customBlocks(): Plugin {
  return {
    postcssPlugin: "custom-blocks",
    prepare: () => {
      return {
        AtRule: {
          layer: async (rule, h) => {
            if (rule.params.includes("content")) {
              const match = rule.params.match(/^content\((.*)\)$/);
              const param = match?.[1];

              let next;

              if (!param || param.trim() === "default") {
                next = await postcss([USING_CONTENT]).process(
                  `@using content {\n${rule.nodes.join("")}\n}`
                );
              } else {
                next = await postcss([USING_CONTENT]).process(
                  `@layer ${param} {\n@using content {\n${rule.nodes.join("")}\n}\n}`
                );
              }

              rule.replaceWith(next.root.nodes);
            }
          },

          "custom-blocks": async (rule, h) => {
            const colors = rule.params.split(",").map((p) => p.trim());

            if (colors === undefined) {
              throw Error(
                "@custom-block: color must be a list of names, e.g. `@custom-block: red where red is a style defined as sb-fg-$(color)-* and sb-bg-$(color)-*"
              );
            }

            const newRules: Rule[] = [];

            for (const color of colors) {
              const decl = (
                name: `bg` | `bg-${string}` | `fg` | `fg-${string}`,
                style?: string
              ) => {
                const type = name.startsWith("bg") ? "bg" : "fg";
                const subcolor = style ? `${color}-${style}` : color;

                return new h.Declaration({
                  prop: `--sbdoc-block-${name}`,
                  value: `var(--sb-${type}-${subcolor})`,
                });
              };

              const newRule = new h.Rule({
                selectors: [`.sbdoc-custom-block-${color}`],
              });

              newRule.append(
                decl("fg"),
                decl("bg", "maxmuted"),
                decl("bg-accent", "ultramuted"),
                decl("fg-accent", "strong"),
                decl("fg-accent-hover", "stronger"),
                decl("fg-accent-border", "muted"),
                decl("fg-code"),
                decl("bg-code", "muted"),
                decl("fg-code-border", "muted"),
                decl("bg-code-bg", "dim")
              );

              newRules.push(newRule);
            }

            rule.replaceWith(newRules);
          },
        },
      };
    },
  };
}

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
    prepare: () => {
      return {
        Declaration: (decl) => {
          const val = csstree.parse(decl.value, { context: "value" });

          let modified = false;

          csstree.walk(val, {
            visit: "Function",
            enter(node, item, list) {
              if (node.name === "pow") {
                const count = node.children.pop()?.data;
                const expr = node.children.shift()?.data;
                if (count?.type !== "Number" || !expr) {
                  // @ts-expect-error 2339
                  return csstree.walk.break;
                }

                const countVal = Number(count.value);
                const items = new csstree.List<csstree.CssNode>();
                items.push(cssNode("Operator", { value: "(" }));

                for (let i = 0; i < countVal - 1; i++) {
                  items.push(csstree.clone(expr));
                  items.push(cssNode("Operator", { value: "*" }));
                }
                items.push(csstree.clone(expr));
                items.push(cssNode("Operator", { value: ")" }));

                modified = true;
                list.replace(item, items);
              }
            },
          });

          if (modified) {
            decl.value = csstree.generate(val);
          }
        },
      };
    },
  };
}

function defVars(): Plugin {
  return {
    postcssPlugin: "def-vars",
    prepare: () => {
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

type CssNodeName = csstree.CssNode["type"];
type TypedCssNode<T extends CssNodeName = CssNodeName> = Extract<csstree.CssNode, { type: T }>;
type CssNodeData<T extends CssNodeName> = Omit<TypedCssNode<T>, "type">;

function cssNode<T extends CssNodeName>(type: T, data: CssNodeData<T>): TypedCssNode<T> {
  return {
    type,
    ...data,
  } as TypedCssNode<T>;
}
