import type { PluginHelper } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import parseFence from "fenceparser";
import Token from "markdown-it/lib/token.js";
import { Tokens, type LazyChild } from "./tokens.js";
type OBJECT = ReturnType<typeof parseFence>;
type VALUE = OBJECT[keyof OBJECT];
interface RenderOptions {
    kind: string;
    /**
     * false means "leave out the title"
     * undefined means "use the default title"
     */
    title: Title;
    attrs: Record<string, VALUE>;
    content: UnparsedContent | undefined;
    md: PluginHelper;
}
export declare class UnparsedContent implements LazyChild {
    #private;
    static of(content: string | undefined): UnparsedContent;
    private constructor();
    get raw(): string | undefined;
    render(tokens: Tokens): Tokens;
}
type RenderContainer = ({ title, kind, attrs, content, md, tokens, }: {
    title: Title;
    kind: string;
    attrs: Record<string, VALUE>;
    content: UnparsedContent | undefined;
    md: PluginHelper;
    tokens: Tokens;
}) => Token[] | Tokens;
type BuiltinConfig = {
    defaultTitle?: string | null | undefined;
} | {
    render?: RenderContainer;
};
declare class Builtin {
    #private;
    constructor(config: BuiltinConfig);
    render(options: RenderOptions): Token[];
}
export declare class Title implements LazyChild {
    #private;
    static provided(provided: string | false | undefined): Title;
    static create(provided: string | false | undefined, defaultValue: string | undefined): Title;
    private constructor();
    withDefault(defaultValue: string | undefined): Title;
    render(tokens: Tokens): Tokens;
    get provided(): string | undefined | false;
    toString(): string;
}
export declare class Builtins<N extends string> {
    #private;
    static empty(): Builtins<never>;
    static from<N extends string>(config: Record<N, BuiltinConfig>): Builtins<N>;
    constructor(builtins: Record<N, Builtin>);
    register<NewName extends string>(name: NewName, config?: BuiltinConfig | string | RenderContainer): Builtins<N | NewName>;
    tryGet(name: string): Builtin | undefined;
    get(name: N): Builtin;
}
export {};
//# sourceMappingURL=define.d.ts.map