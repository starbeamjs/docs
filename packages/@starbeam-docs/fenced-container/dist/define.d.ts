import type { PluginHelper } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import parseFence from "fenceparser";
import Token from "markdown-it/lib/token.js";
import { type LazyChildren } from "./nodes.js";
import { MarkdownElement, type LazyChild, CustomBuiltin, type Children, type TextLike } from "./tokens.js";
type OBJECT = ReturnType<typeof parseFence>;
type VALUE = OBJECT[keyof OBJECT];
export declare const CUSTOM_EL = "CustomBlock";
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
    render(tokens: MarkdownElement): MarkdownElement;
}
type RenderContainer = ({ title, kind, attrs, content, md, define, }: {
    title: Title;
    kind: string;
    attrs: Record<string, VALUE>;
    content: UnparsedContent | undefined;
    md: PluginHelper;
    define: CustomBuiltin;
}) => LazyChildren;
type BuiltinConfig = {
    defaultTitle?: string | null | undefined;
    color: string;
} | CustomConfig;
/**
 * A bare string is the default title.
 */
type BasicConfig = {
    defaultTitle?: string | null | undefined;
    color?: string;
} | string;
interface CustomConfig {
    render: RenderContainer;
    options?: {} | undefined;
}
declare class Builtin {
    #private;
    constructor(config: BuiltinConfig);
    render(options: RenderOptions): Token[];
}
export declare class Title implements LazyChild, TextLike {
    #private;
    static provided(provided: string | false | undefined): Title;
    static create(provided: string | false | undefined, defaultValue: string | undefined): Title;
    private constructor();
    withDefault(defaultValue: string | undefined): Title;
    render(tokens: MarkdownElement): MarkdownElement;
    isBlank(): boolean;
    map<T>(callback: (title: string) => T): T | null;
    exists(): boolean;
    get provided(): string | undefined | false;
    stringify(): string;
    toString(): string;
}
export declare class Builtins<N extends string> {
    #private;
    static empty(): Builtins<never>;
    static from<N extends string>(config: Record<N, BuiltinConfig>): Builtins<N>;
    constructor(builtins: Record<N, Builtin>);
    custom<NewName extends string>(name: NewName, render: RenderContainer): Builtins<N | NewName>;
    basic<NewName extends string>(name: NewName, config?: BasicConfig): Builtins<N | NewName>;
    tryGet(name: string): Builtin | undefined;
    get(name: N): Builtin;
}
export declare function styles(color: string, otherStyles?: Record<string, string>): string;
export declare function namespaceStyle(styles: Record<string, string>): {
    [k: string]: string;
};
export declare function fg(color: string, style?: string): string;
export declare function bg(color: string, style?: string): string;
export declare function encode(attrs?: Record<string, string | number | boolean | null | undefined>): string;
type BlockBorder = "n" | "s" | "ns" | "";
type InlineBorder = "e" | "w" | "ew" | "";
type Border = `${BlockBorder}${InlineBorder}`;
export declare function CustomEl(kind: string, options: {
    color: string;
    border?: Border;
    style?: Record<string, string>;
}, children?: Children): LazyChild;
export {};
//# sourceMappingURL=define.d.ts.map