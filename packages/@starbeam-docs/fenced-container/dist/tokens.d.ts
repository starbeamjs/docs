import type { PluginHelper } from "@jsergo/mdit";
import Token from "markdown-it/lib/token.js";
export type SingleAttrValue = AttrPart | boolean;
export type AttrPart = string | number | null | undefined;
export type AttrValue = SingleAttrValue | AttrPart[];
export declare class Tokens {
    #private;
    static empty(md: PluginHelper): Tokens;
    constructor(md: PluginHelper);
    open(tag: string, attrs?: Record<string, AttrValue> | undefined): this;
    el(tag: string, attrs?: Record<string, AttrValue> | Children | undefined, children?: Children): this;
    close(tag: string): this;
    append(...content: Child[]): this;
    parse(content: string): this;
    if<T>(predicate: T, content: (tokens: Tokens, value: Exclude<T, null | undefined | false | "" | 0>) => Tokens): this;
    get tokens(): Token[];
}
export type Child = LazyChild | Token | string | null | undefined;
export type Children = Child[] | ((tokens: Tokens) => Tokens);
export interface LazyChild {
    render(tokens: Tokens): Tokens;
}
export declare function text(string: string): Token;
//# sourceMappingURL=tokens.d.ts.map