import { Tokens, type Child, type LazyChild } from "./tokens.js";
export type Falsy = null | undefined | false | 0 | "";
export declare function Fragment(...children: Child[]): LazyChild;
export declare function El(...args: Parameters<Tokens["el"]>): LazyChild;
export declare function Do(then: () => Rendered): LazyChild;
export declare function Let<T>(values: T, then: (values: T) => Tokens | Child[]): LazyChild;
export declare function If<T>(condition: T, then: (value: Exclude<T, Falsy>, tokens: Tokens) => Tokens | Child[], options?: {
    else: (tokens: Tokens) => Tokens | Child[];
}): LazyChild;
export declare function HTML(value: string): LazyChild;
type Rendered = Tokens | Child[] | void;
export {};
//# sourceMappingURL=nodes.d.ts.map