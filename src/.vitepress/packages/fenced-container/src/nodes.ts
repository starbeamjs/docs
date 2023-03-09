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

export function Do(then: () => Rendered): LazyChild {
  return {
    render: (tokens) => render(tokens, then),
  };
}

export function Let<T>(
  values: T,
  then: (values: T) => Tokens | Child[]
): LazyChild {
  return {
    render: (tokens) => {
      return render(tokens, () => then(values));
    },
  };
}

export function If<T>(
  condition: T,
  then: (value: Exclude<T, Falsy>, tokens: Tokens) => Tokens | Child[],
  options?: { else: (tokens: Tokens) => Tokens | Child[] }
): LazyChild {
  return {
    render: (tokens) => {
      return render(tokens, (): Rendered | void => {
        if (condition) {
          return then(condition as Exclude<T, Falsy>, tokens);
        } else if (options?.else) {
          return options.else(tokens);
        }
      });
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

type Rendered = Tokens | Child[] | void;

function render(tokens: Tokens, callback: () => Rendered): Tokens {
  const children = callback();
  if (Array.isArray(children)) {
    return tokens.append(...children);
  }
  return tokens;
}
