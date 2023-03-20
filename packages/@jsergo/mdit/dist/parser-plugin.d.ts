import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.js";
import { MDState, type LineState } from "./state.js";
type RenderedContent = {
    readonly type: "html";
    readonly content: string;
} | {
    readonly type: "tokens";
    readonly content: Token[];
} | {
    readonly type: "empty";
} | {
    readonly type: "reconsume";
};
export declare class ReturnRendered {
    html(content: string): RenderedContent;
    tokens(tokens: Token[]): RenderedContent;
    empty(): RenderedContent;
    reconsume(): RenderedContent;
}
export declare class PluginHelper<Env = unknown> {
    #private;
    constructor(state: MDState<Env>);
    get md(): MarkdownIt;
    get env(): unknown;
    renderHTML(content: string): string;
    renderInline(content: string): string;
    parseBlock(content: string): Token[];
    parseInline(content: string): Token[];
    error(message: string): string;
}
export type BlockPlugin<Env> = (line: LineState, helper: PluginHelper<Env>) => Consume | false | undefined;
export type Consume = () => Render | false | undefined;
export type Render = (render: ReturnRendered) => RenderedContent;
export type PluginInsertion = {
    readonly name: string;
    readonly before: string;
} | {
    readonly name: string;
    readonly after: string;
} | {
    readonly replace: string;
} | {
    readonly append: string;
};
export type PluginOptions<Env, WrapperEnv> = {
    readonly env?: (env: Env) => WrapperEnv;
} & PluginInsertion;
export declare function parserPlugin<Env, T = Env>(pluginOptions: PluginOptions<T, Env>): {
    block: <Options>(plugin: BlockPlugin<Env>) => MarkdownIt.PluginWithOptions<Options>;
};
export {};
//# sourceMappingURL=parser-plugin.d.ts.map