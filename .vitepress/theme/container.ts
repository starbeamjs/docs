import * as MarkdownIt from "markdown-it";
import * as Token from "markdown-it/lib/token.js";
import ContainerPlugin from "markdown-it-container";

export function container(name: string, defaultTitle?: string) {
  return (md: MarkdownIt) => {
    md.use(...createContainer(name, defaultTitle));
  };
}

type ContainerArgs = [
  typeof ContainerPlugin,
  string,
  {
    render(tokens: Token[], idx: number): string;
  }
];

function createContainer(klass: string, defaultTitle?: string): ContainerArgs {
  return [
    ContainerPlugin,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];

        const info = token.info.trim().slice(klass.length).trim();
        if (token.nesting === 1) {
          if (info === "" && defaultTitle === undefined) {
            return `<div class="${klass} custom-block">\n`;
          } else {
            return `<div class="${klass} custom-block"><p class="custom-block-title">${
              info || defaultTitle
            }</p>\n`;
          }
        } else {
          return `</div>\n`;
        }
      },
    },
  ];
}
