import { strip } from "@wycatsjs/utils";

export const STYLES = {
  valid: {
    fill: "#a2c9a4",
    "font-color": "#234526",
    stroke: "#4f7351",
  },
  invalid: {
    "font-color": "#4c222f",
    fill: "#e3acba",
    stroke: "#9b6977",
  },
  na: {
    "font-color": "#698b6a",
    fill: "#e8ebea",
    stroke: "#c1c1c1",
  },
  "output-color": {
    "font-color": "#14485f",
    fill: "#92C6E1",
    stroke: "#043d53",
  },
  "output-style": {
    "double-border": true,
    bold: true,
  },
};

export function preprocess(body: string) {
  for (const [style, value] of Object.entries(STYLES)) {
    body = body
      .replaceAll(
        new RegExp(`style:\\s*%${style}`, "g"),
        strip`
      style: {
        ${format(value)}
      }
      `
      )
      .replace(new RegExp(`%${style}`, "g"), format(value));
  }
  return body;
}

function format(style: object) {
  return Object.entries(style)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
}
