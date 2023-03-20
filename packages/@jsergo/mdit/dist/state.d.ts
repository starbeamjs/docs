import MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.js";
import type { StateBlock, TypedBlockState } from "./types.js";
export declare class MDStateCreator<Env, WrapperEnv> {
    #private;
    constructor(md: MarkdownIt, createEnv: (env: Env) => WrapperEnv);
    create(state: TypedBlockState<Env>): MDState<WrapperEnv>;
}
export declare class MDState<Env = unknown> {
    #private;
    constructor(md: MarkdownIt, state: StateBlock, env: Env);
    line(lineno: number): LineState;
    consumeLine(): void;
    get highlight(): HighlightFn | null | undefined;
    get md(): MarkdownIt;
    get env(): Env;
    open(): Token;
    renderHTML(content: string): string;
    renderInline(content: string): string;
    parse(content: string): Token[];
    parseInline(content: string): Token[];
    error(message: string): string;
}
export type HighlightFn = (str: string, lang: string, attrs: string) => string;
export declare class LineState {
    #private;
    constructor(state: StateBlock, startLine: number);
    get state(): StateBlock;
    get next(): LineState | undefined;
    get position(): {
        pos: number;
        max: number;
    };
    get rest(): string;
    consume(): LineState;
    until(predicate: (line: LineState) => boolean): string;
    string({ ws }?: {
        ws?: boolean;
    }): string;
    startsWith(chars: string): boolean;
    matchStart(regex: RegExp): {
        type: "unmatched";
    } | {
        type: "match";
        raw: RegExpExecArray;
        fragment: string;
    } | {
        type: "error";
        error: string;
    };
    slice(n?: number): string | undefined;
    /**
     * The indent of the line, excluding the required indent.
     */
    get indent(): number;
    /**
     * if it's indented more than 3 spaces, it's a code block
     */
    get isCodeBlock(): boolean;
    get start(): number;
    get wsChars(): number;
    get contentStart(): number;
    get end(): number;
}
export declare function position(state: StateBlock, startLine: number): {
    pos: number;
    max: number;
};
//# sourceMappingURL=state.d.ts.map