import type { PluginHelper } from "@jsergo/mdit";
import Token from "markdown-it/lib/token.js";
export type SingleAttrValue = AttrPart | boolean;
export type AttrPart = string | number | null | undefined;
export type AttrValue = SingleAttrValue | AttrPart[];
export declare class CustomBuiltin {
    #private;
    constructor(md: PluginHelper);
    el(tag: string, attrs: Record<string, AttrValue>, children: Child[]): MarkdownElement;
}
export declare abstract class MarkdownFragment implements LazyChild {
    #private;
    abstract done(): Token[];
    protected abstract appendToken(token: Token): void;
    constructor(md: PluginHelper);
    render(tokens: MarkdownFragment): MarkdownFragment;
    protected get md(): PluginHelper;
    blockHtml(markdown: ToString): this;
    inlineHtml(markdown: ToString): this;
    append(child: Child): this;
    push(...children: Child[]): this;
    element({ tag, attrs, children, }: {
        tag: string;
        attrs: Record<string, AttrValue>;
        children: Children | undefined;
    }, { create, }: {
        create: {
            tag: (tag: string, md: PluginHelper) => MarkdownElement;
        };
    }): this;
    htmlEl(...elArgs: ElArgs): this;
    el(...elArgs: ElArgs): this;
}
export declare abstract class MarkdownElement extends MarkdownFragment {
    abstract attr(key: string, value: AttrValue): this;
    constructor(_tag: string, md: PluginHelper);
    attrs(attrs: Record<string, AttrValue>): this;
    renderInline(text: string): string;
}
export declare class BasicFragment extends MarkdownFragment {
    #private;
    static empty(md: PluginHelper): MarkdownFragment;
    protected appendToken(token: Token): void;
    done(): Token[];
}
export declare class HtmlElement extends MarkdownElement {
    #private;
    static tag(tag: string, md: PluginHelper): MarkdownElement;
    private constructor();
    attr(key: string, value: AttrValue): this;
    done(): Token[];
    protected appendToken(token: Token): void;
}
export declare class ParagraphElement extends MarkdownElement {
    #private;
    static tag(tag: string, md: PluginHelper): ParagraphElement;
    private constructor();
    protected appendToken(token: Token): void;
    done(): Token[];
    attr(name: string, value: AttrValue): this;
}
export type Child = LazyChild | Token | string | null | undefined;
export type Children = Child[] | ((el: MarkdownFragment) => MarkdownFragment);
export interface LazyChild {
    render(tokens: MarkdownFragment): MarkdownFragment;
}
export interface TextLike {
    stringify(): string;
}
export type ToString = TextLike | string | number | boolean;
export declare function text(string: ToString): Token;
type ElArgs = [
    tag: string,
    attrs?: Record<string, AttrValue> | Children | undefined,
    children?: Children
];
export {};
//# sourceMappingURL=tokens.d.ts.map