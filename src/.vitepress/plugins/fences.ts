import hash from "hash-sum";
import type MarkdownIt from "markdown-it";
import type { PluginSimple } from "markdown-it";
import type { default as Token } from "markdown-it/lib/token";

// declare const __dirname: string;
const dir = __dirname;
// const dir = dirname(fileURLToPath(import.meta.url));

const npmRender = (md: MarkdownIt, tokens: Token[], idx: number): string => {
  const token = tokens[idx]!;
  const key = `npm-${hash(idx)}`;
  const { content: raw, info } = token;
  const content = raw.trim();

  const body = [
    "::: code-tabs#npm",
    "@tab pnpm\n",
    "```shell",
    `pnpm install ${content}`,
    "```\n",
    "@tab npm\n",
    "```shell",
    `npm install ${content}`,
    "```\n",
    "@tab yarn",
    "```shell",
    `yarn add ${content}`,
    "```\n",
    ":::",
  ].join("\n");

  return md.render(body);
};

export const npm: PluginSimple = (md) => {
  // Handle ```npm blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { info } = tokens[index]!;
    const realInfo = info.split(":", 2)[0];

    if (realInfo === "npm") return npmRender(md, tokens, index);

    return fence!(...args);
  };
};

const stackblitzRender = (
  md: MarkdownIt,
  id: string,
  content: string
): string => {
  // parse the content lines. Each line is a pair of `key\s*=\s*value`
  const lines = content.split("\n");
  const options = Object.fromEntries(
    lines.map((line) => {
      const [key, value] = line.split("=");
      return [key!.trim(), value!.trim()];
    })
  ) as Record<string, string>;

  const attrs = [`id=${JSON.stringify(id)}`];

  for (const [key, value] of Object.entries(options)) {
    attrs.push(`${key}=${JSON.stringify(value)}`);
  }

  const title = options.title ?? "Play with it on StackBlitz";
  delete options.title;

  const props = attrs.join(" ");

  const body = `::: details ${title}\n\n<StackBlitz ${props} />\n\n:::`;

  return md.render(body);
};

export const stackblitz: PluginSimple = (md) => {
  // Handle ```stackblitz blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const token = tokens[index]!;
    // parse `stackblitz[id]` using regex groups
    const info = token.info.match(/^stackblitz\[(.*?)\]$/);

    if (info !== null) {
      return stackblitzRender(md, info[1]!, token.content.trim());
    }

    return fence!(...args);
  };
};

export const fences = (md: MarkdownIt) => {
  md.use(npm);
  md.use(stackblitz);
};
