import Token from "markdown-it/lib/token.js";
import { Tokens, type Child, type LazyChild } from "./tokens.js";

export type Falsy = null | undefined | false | 0 | "";

export function Fragment(...children: Child[]): LazyChild {
  return {
    render: (tokens: Tokens) => tokens.append(...children),
  };
}

export function El(...args: Parameters<Tokens["el"]>): LazyChild {
  return {
    render: (tokens) => tokens.el(...args),
  };
}

export function If<T>(
  condition: T,
  then: (value: Exclude<T, Falsy>, tokens: Tokens) => Tokens | Child[]
): LazyChild {
  return {
    render: (tokens) => {
      if (condition) {
        const result = then(condition as Exclude<T, Falsy>, tokens);

        if (Array.isArray(result)) {
          tokens.append(...result);
        }
      }

      return tokens;
    },
  } satisfies LazyChild;
}

export function HTML(value: string): LazyChild {
  const html = new Token("html_block", value, 0);
  html.content = value;
  return {
    render: (tokens) => tokens.append(html),
  };
}
