import { MarkdownFragment, type Child, type LazyChild } from "./tokens.js";
export type Falsy = null | undefined | false | 0 | "";
export declare function Fragment(...children: Child[]): LazyChild;
export declare function El(...args: Parameters<MarkdownFragment["el"]>): LazyChild;
export declare function HtmlEl(...args: Parameters<MarkdownFragment["el"]>): LazyChild;
export declare function Do(then: () => LazyChild[]): LazyChild;
export declare function Let<T>(values: T, then: (values: T) => LazyChildren): LazyChild;
export declare function If<T>(condition: T, then: (value: Exclude<T, Falsy>) => LazyChildren, options?: {
    else: () => LazyChildren;
}): LazyChild;
export declare function HTML(value: string): LazyChild;
export type LazyChildren = LazyChild | LazyChild[];
//# sourceMappingURL=nodes.d.ts.map